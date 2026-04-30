import { useDispatch, useSelector } from "react-redux";
import "./items-list.css";
import useDataBaseService from "../../../services/DataBaseService";

import TreeView from '@mui/lab/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StyledTreeItem from './styled-tree-item';

import { setSelectedItem, setShowAddItemWindow, setItemMenuCoords, setData, setEditState } from "../../../redux/actions";
import ItemsListSkeleton from "./items-list-skeleton";
import { useState } from "react";




export default function () {


    const {getServerAddress, getData} = useDataBaseService();

    const {items, itemsListWidth} = useSelector(state=>state);

    const [expandedItems, setExpandedItems] = useState([]);

    const dispatch = useDispatch();

    function findParentIds(data, targetId, parentIds = []) {
        for (const item of data) {
          if (item.id === targetId) {
            return [...parentIds, `${targetId}` ]; // Возвращаем массив id родителей, если нашли целевой элемент
          }
          if (item.childs && item.childs.length > 0) {
            const result = findParentIds(item.childs, targetId, [...parentIds, `${item.id}`]);
            if (result) {
              return result; // Если нашли вложенный элемент в поддереве, возвращаем массив id родителей
            }
          }
        }
        return null; // Возвращаем null, если элемент не найден
      }


    const onClickHandle = (item) => {

        // разворачиваем только те элементы которые родители текущего item
        const parentIds = findParentIds(items, item.id);
        setExpandedItems(parentIds);

        dispatch(setSelectedItem(null));
        dispatch(setData(null))

        getData(item.id).then(response => {
            setTimeout(() => {

                dispatch(setSelectedItem(item));

                dispatch(setData(response.data))

                if (response.data.length === 0) 
                    dispatch(setEditState(true));
                else 
                    dispatch(setEditState(false));

            }, 100)
            
        })

    }


    const buildCodeList = (childs) => {

        if (childs)
           return childs.map((child, i) => {

               return (
                   <StyledTreeItem 


                       key={child.id}
                       nodeId={`${child.id}`} labelText={child.title} 
                       children={child.childs?buildCodeList(child.childs):null}
                       labelIcon={child.icon!==""?`${getServerAddress()}/static/${child.icon}`:''} 
                       itemId={child.id}
                       
                       onClick={e=>onClickHandle(child)}

                     
                   />
               )


           })

       return <></>

   }

    const itemsList = buildCodeList(items)


    return (

        <div className='items-list'  >

            

            {items?
            <TreeView
                expanded={expandedItems}
                aria-label="gmail"
            //   defaultExpanded={['1']}
              defaultCollapseIcon={<ArrowDropDownIcon />}
              defaultExpandIcon={<ArrowRightIcon />}
              defaultEndIcon={<div style={{ width: 24 }} />}
              sx={{ height: "auto", flexGrow: 1, maxWidth: itemsListWidth, marginTop: "12px"  }}
            >

                {itemsList}
                    {/* {codeList !== null?items: <CodeListSkeleton />} */}
               

            </TreeView>
            
            :

            <ItemsListSkeleton /> }


        </div>

    )

}

