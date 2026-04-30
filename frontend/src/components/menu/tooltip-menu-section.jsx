import "./tooltip-menu-section.css";
import ConfirmWindow from "../modal-windows/confirm-window/confirm-window";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDataBaseService from "../../services/DataBaseService";
import { setSectionMenuCoords, setUser, setSections, showToast, setData, setItemsList } from "../../redux/actions";

export default function (props) {

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const {selectedSection, sectionMenuCoords, user} = useSelector(state=>state);

    const dispatch = useDispatch();

    const {deleteSection, getSections} = useDataBaseService();

    const onClickDeleteHandle = (e) => {
        setDeleteConfirm(true);
        dispatch(setSectionMenuCoords(undefined))
        props.onClickCallback();

    }

    const onConfirmDelete = () => {
        setDeleteConfirm(false);
        deleteSection(selectedSection.id).then(resp => {

            dispatch(showToast(true, "negative", "Данные удалены"))
            dispatch(setData([]))
            dispatch(setItemsList([]))
            getSections(user.username).then(response => {

                if (response.registration === "logout")
                  dispatch(setUser(null));
          
                if (response.sections)
                  dispatch(setSections(response.sections));

              })
        });
    }

    const onCloseConfirm = () => {
        setDeleteConfirm(false);
    }


    return (
        <div>

            <ConfirmWindow 
            show={deleteConfirm} 
            close={onCloseConfirm} 
            positive={onConfirmDelete}
            query={`Вы уверены, что желаете удалить секцию "${selectedSection.title}"?`} />


            {sectionMenuCoords? (
                <div className="tooltip-menu" style={{left: sectionMenuCoords.x, top: sectionMenuCoords.y}}>
                  {selectedSection?  <div className="tooltip-item" onClick={onClickDeleteHandle}>
                        Удалить
                    </div>
                    : <></>}
                    
                </div>

            ):(<></>)}



        </div>
    )
}