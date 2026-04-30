import "react-reflex/styles.css"

import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import "./content.css";
import ItemsList from "./items/items-list";
import { useDispatch, useSelector } from "react-redux";

import { setItemsListWidth, setItemMenuCoords, setSelectedItem} from "../../redux/actions";
import DataMenu from "./data-content/data-menu/data-menu";
import DataList from "./data-content/data-list";
import Toast from "../modal-windows/toast/toast";

export default function () {

    const dispatch = useDispatch();

    const {selectedItemId} = useSelector(state=>state);

    const onResizeHandle = (e) => {
        const width = e.domElement.clientWidth - 50;
        dispatch(setItemsListWidth(width));
    }

    const contextMenuHandle = (e) => {

        if (e.target.className.includes("left-pane")) {
            e.preventDefault();
            dispatch(setSelectedItem(null));
            dispatch(setItemMenuCoords({x:e.clientX, y:e.clientY}));
        }

        
      }

    return (

        <div className="content" onContextMenu={contextMenuHandle}>

            <ReflexContainer orientation="vertical" style={{height: "100%"}}>

                <ReflexElement className="left-pane section" 
                minSize={200} maxSize={400} onResize={onResizeHandle}>
                    {/* <div style={{height: "100%"}}  > */}
                        <ItemsList />
                    {/* </div> */}
                    
                    

                </ReflexElement>

                <ReflexSplitter />

                <ReflexElement className="right-pane section notebook-cage" style={{position: "unset"}}>
                    
                    {selectedItemId?<DataMenu />:<></>}
                    <DataList />

                </ReflexElement>



            </ReflexContainer>

            


        </div>

    )


}