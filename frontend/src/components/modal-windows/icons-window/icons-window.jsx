import "./icons-window.css";

import { Transition } from "react-transition-group";
import { Form } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import useDataBaseService from "../../../services/DataBaseService";
import { useDispatch, useSelector } from "react-redux";

import { addIcon, deleteThisIcon, filterIcons, setItemsList, setNewIconName, setShowIconsWindow } from "../../../redux/actions";
import Search from "./search/search";

import iconAddIcon from "../../../images/icon-add-icon.png";
import iconDeleteIcon from "../../../images/icon-delete-icon.png";
import iconClose from "../../../images/icon-close.png";
import { useState } from "react";
import { useEffect } from "react";



export default function () {

    const { selectedSection, selectedItemId, showIconsWindow, icons, user, theme} = useSelector(state => state)
    const isLightTheme = theme==="light";

    const { uploadUserIcon, getServerAddress, setIconName, deleteIcon, setItemIcon, getItems } = useDataBaseService()

    const dispatch = useDispatch();

    const duration = 300;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden',
        background: '#969ba1c2'
    }

    const transitionStyles = {
        entering: {opacity: 1, visibility: 'visible'},
        entered: {opacity: 1, visibility: 'visible'},
        exiting: {opacity: 0, visibility: 'hidden'},
        exited: {opacity: 0, visibility: 'hidden'} 
    }

    const onCloseModalwindow = () => {
        // const inputData = document.querySelector('input[aria-describedby="inputDataGroupLink"]')
        // inputData.value = ''
        dispatch(setShowIconsWindow(false))

    }


    const buildIconsList = () => {

        const onMouseEnterHandle = (e, i) => {
            const imgDel = document.querySelector(`.icon-del-icon.i${i}`);
            if (imgDel)
                imgDel.style.visibility = "visible";

        }

        const onMouseLeave = (e, i) => {
            const imgDel = document.querySelector(`.icon-del-icon.i${i}`);
            if (imgDel)
                imgDel.style.visibility = "hidden";
        }


        const onBlurHandle = (e, iconId) => {
            setIconName(iconId, e.target.value).then(response => { })
        }


        const onChangeHandle = (e, iconId) => {
            dispatch(setNewIconName(iconId, e.target.value))
        }


        const onClickDeleteHandle = (iconId) => {

            dispatch(deleteThisIcon(iconId));
            deleteIcon(iconId).then(response => {
                
            })
        }

        const onClickImageIcon = (attachId) => {

            dispatch(setItemsList([]))
            setItemIcon(selectedItemId.id, attachId).then(resp => {

                onCloseModalwindow();
                getItems(selectedSection.id).then(response => {
                    dispatch(setItemsList(response.items));
                })

            })

        }


        return icons.map((icon, i) => {

            return (
                <div key={i} className="icon-item icon"
                onMouseEnter={(e) => onMouseEnterHandle(e, i)}
                onMouseLeave={(e) => onMouseLeave(e, i)}
                >
                    <img src={iconDeleteIcon} title="Удалить иконку из коллекции" 
                        className={`icon-del-icon i${i}`}
                        onClick={(e) => onClickDeleteHandle(icon.id)}
                     />

                    <img src={`${getServerAddress()}/static/avatars_items/${icon.attach_id}`}
                        onClick={(e) => onClickImageIcon(icon.attach_id)}
                    />

                    <input type="text" value={icon.name} className={`${!isLightTheme?"icon-name-dark":""}`}
                        onChange={(e) => onChangeHandle(e, icon.id)}
                     onBlur={(e) => onBlurHandle(e, icon.id)} />

                </div>
           
            )


        })

    }

    const onClickAddIconHandle = (e) => {

        const element = document.querySelector("#inputFileUploader")

        const clickElement = new MouseEvent("click", {});

        element.onchange = e => {
            const [file] = element.files;

            if (file) {
                const data = new FormData();

                data.append("file", file)
                

                uploadUserIcon(user.username, data).then(response => {

                    dispatch(addIcon(response.icon))


                  
                //   dispatch(setItemsList([]));
                  
                //   getItems(selectedSection.id).then(response => {
                //     dispatch(setItemsList(response.items));
                //   })

                  //// setItemIcon(itemId, response.icon)
                  //// setTimeout(() => {
                  ////   setImgSrc(`${getServerAddress()}/static/${response.icon}?v=${Math.random()}`);
                  //// }, 1000)
                  
                })

                element.value = null;                
            }

        }

        element.dispatchEvent(clickElement);

    }




    return (
        <Transition in={showIconsWindow} timeout={duration}>
           {
                state => (
                    <div className="modal d-block" style={{
                        ...defaultStyle, ...transitionStyles[state]
                    }}>
                        <div className="modal-dialog ic-list" style={{display: !showIconsWindow?'none':'block'}}>
                            <div className={`modal-content ${!isLightTheme?"dark-theme":""} ic-list`}  >
                                <div className="modal-header">
                                    <h5 className="modal-title">Иконки</h5>
                                    <img src={iconClose} onClick={onCloseModalwindow } className="icon-close" />

                                </div>
                                <div className="modal-body ic-list">
                                    <Search />
                                    
                                    <div className="icons-list section">

                                        {buildIconsList()}

                                        <img src={iconAddIcon} className="icon-add-icon" title="Добавить иконку" onClick={onClickAddIconHandle} />

                                    </div>
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    
                )

           }

        </Transition>

    )


}

