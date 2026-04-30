import "./tooltip-menu-item.css"
import { useDispatch, useSelector } from "react-redux";

import { setItemMenuCoords, setShowAddItemWindow, setItemsList, showToast, setData, setShowEditItemWindow } from "../../redux/actions";
import useDataBaseService from "../../services/DataBaseService";
import ConfirmWindow from "../modal-windows/confirm-window/confirm-window";
import { useState } from "react";


export default function () {

    const {itemMenuCoords, selectedItemId, selectedSection } = useSelector(state=>state);

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const {deleteItem, getItems} = useDataBaseService();

    const dispatch = useDispatch();

    const onClickHandle = (e) => {

        dispatch(setItemMenuCoords(undefined));
        dispatch(setShowAddItemWindow(true));
    }

    const onClickDeleteHandle = (e) => {
        setDeleteConfirm(true);

    }

    const onConfirmDelete = () => {
        setDeleteConfirm(false);
        deleteItem(selectedItemId.id).then(response => {
            getItems(selectedSection.id).then(res => {
                dispatch(setItemsList(res.items));
                dispatch(showToast(true, "negative", "Данные удалены"));
                dispatch(setData([]));
            })
        });
    }

    const onCloseConfirm = () => {
        setDeleteConfirm(false);
    }


    const onClickEditHandle = () => {
        dispatch(setItemMenuCoords(undefined));
        dispatch(setShowEditItemWindow(true));
    }


    return (
        <div>

            <ConfirmWindow 
            show={deleteConfirm} 
            close={onCloseConfirm} 
            positive={onConfirmDelete}
            query={"Вы уверены, что желаете удалить элемент?"} />


            {itemMenuCoords? (
                <div className="tooltip-menu" style={{left: itemMenuCoords.x, top: itemMenuCoords.y}}>
                    <div className="tooltip-item" onClick={onClickHandle}>
                        Добавить
                    </div>

                    {selectedItemId?<div className="tooltip-item" onClick={onClickEditHandle}>
                        Изменить
                    </div>
                    :<></> }

                  {selectedItemId?  <div className="tooltip-item" onClick={onClickDeleteHandle}>
                        Удалить
                    </div>
                    : <></>}
                    
                </div>

            ):(<></>)}



        </div>
    )


}