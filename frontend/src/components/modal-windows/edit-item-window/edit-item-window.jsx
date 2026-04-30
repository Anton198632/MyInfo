import "./edit-item-window.css";

import { Transition } from "react-transition-group";
import { Form } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import useDataBaseService from "../../../services/DataBaseService";
import { useDispatch, useSelector } from "react-redux";

import { setShowEditItemWindow, setItemsList, showToast, setItemTitle } from "../../../redux/actions";

import { useEffect, useRef, useState } from "react";
import { Button, InputBase, ThemeProvider } from "@mui/material";
import { darkTheme, defaultTheme } from "../../styles/modal-window-theme";

import iconClose from "../../../images/icon-close.png";

export default function () {

    const { selectedItemId, showEditItemWindow, theme} = useSelector(state => state)
    const isLightTheme = theme==="light";

    const refName = useRef();
    const refTags = useRef();

    const { updateItem } = useDataBaseService()

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
        refName.current.value = "";
        refTags.current.value = "";
        dispatch(setShowEditItemWindow(false))

    }

    const onClickOK = () => {
        setTimeout(()=> {
            // const inputData = document.querySelector('input[aria-describedby="inputDataGroupLinkTitle"]')
            // const inputDataTags = document.querySelector('input[aria-describedby="inputDataGroupLinkTags"]')

            const title = refName.current.value;
            const tags = refTags.current.value;


            updateItem(selectedItemId.id, title, tags).then(response => {

                dispatch(setItemTitle(selectedItemId.id, title))

            })

            refName.current.value = "";
            refTags.current.value = "";

            // inputData.value = '';
            // inputDataTags.value = "";
            dispatch(setShowEditItemWindow(false))

        }, duration)

    }


    return (
        <Transition in={showEditItemWindow} timeout={duration}>
           {
                state => (
                    <div className="modal d-block" style={{
                        ...defaultStyle, ...transitionStyles[state]
                    }}>

                    <ThemeProvider theme={isLightTheme?defaultTheme:darkTheme} >
                        <div className="modal-dialog" style={{display: !showEditItemWindow?'none':'block'}}>
                        <div className={`modal-content ${!isLightTheme?"dark-theme":""}`} >
                            <div className="modal-header">
                                <h5 className="modal-title">Изменение раздела "{selectedItemId? selectedItemId.title:""}"</h5>
                                <img src={iconClose} onClick={onCloseModalwindow } className="icon-close" />

                            </div>
                            <div className="modal-body">
                                <InputBase inputRef={refName} placeholder="Название раздела"
                                    sx={{width: "100%", border: "1px solid #c6c6c6", padding: "12px", borderRadius: "4px"}}
                                />
                                <InputBase inputRef={refTags} placeholder="#тэги"
                                    sx={{marginTop: "12px", width: "100%", border: "1px solid #c6c6c6", padding: "12px", borderRadius: "4px"}}
                                />

                                            {/* <Form.Control 
                                                style={{visibility: 'visible'}}
                                                placeholder="Название раздела"
                                                // value={selectedItemId?selectedItemId.title:""}
                                              type="text"
                                              id="inputDataGroupLinkTitle"
                                              aria-describedby="inputDataGroupLinkTitle"/>

                                            <Form.Control
                                                style={{visibility: 'visible'}}
                                                placeholder="#тэги"
                                              type="text"
                                            //   value={selectedItemId?selectedItemId.tags:""}
                                              id="inputDataGroupLinkTags"
                                              aria-describedby="inputDataGroupLinkTags"/> */}

                            </div>
                            <div className="modal-footer">
                                <Button className="alternative" style={{marginRight: "12px"}} onClick={onCloseModalwindow}>Отмена</Button>
                                <Button onClick={onClickOK}>Изменить</Button>
                            </div>
                            </div>
                        </div>

                    </ThemeProvider>
                    </div>
                    
                )

           }

        </Transition>

    )


}

