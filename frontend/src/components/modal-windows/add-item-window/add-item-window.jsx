import "./add-item-window.css";

import { Transition } from "react-transition-group";
import { Form } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import useDataBaseService from "../../../services/DataBaseService";
import { useDispatch, useSelector } from "react-redux";

import { setShowAddItemWindow, setItemsList, showToast } from "../../../redux/actions";
import { Button, InputBase, TextField, ThemeProvider } from "@mui/material";

import { darkTheme, defaultTheme } from "../../styles/modal-window-theme";
import { useRef } from "react";

import iconClose from "../../../images/icon-close.png";

export default function () {

    const refName = useRef();

    const {selectedSection, selectedItemId, showAddItemWindow, theme} = useSelector(state => state)
    const isLightTheme = theme==="light";

    const { addNewItem } = useDataBaseService()

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

        refName.current.value = ""

        dispatch(setShowAddItemWindow(false))

    }

    const onClickOK = () => {
        setTimeout(()=> {
            // const inputData = document.querySelector('input[aria-describedby="inputDataGroupLink"]')

            const itemId = selectedItemId?selectedItemId.id:null;

            const title = refName.current.value;

            addNewItem(selectedSection.id, itemId, title).then(response => {
                dispatch(setItemsList(response.items));
                dispatch(showToast(true, "positive", `Раздел "${title}" добавлен`))
            })

            refName.current.value = ""
            dispatch(setShowAddItemWindow(false))

        }, duration)

    }


    return (
        <Transition in={showAddItemWindow} timeout={duration}>
           {
                state => (
                    <div className="modal d-block" style={{
                        ...defaultStyle, ...transitionStyles[state]
                    }}>

                    <ThemeProvider theme={isLightTheme?defaultTheme:darkTheme} >

                    
                    
                        <div className="modal-dialog" style={{display: !showAddItemWindow?'none':'block'}}>
                            <div className={`modal-content ${!isLightTheme?"dark-theme":""}`} >
                            <div className="modal-header">
                                <h5 className="modal-title">Добавление раздела</h5>
                                {/* <button onClick={onCloseModalwindow } type="button" className="btn-close" aria-label="Close"></button> */}
                                <img src={iconClose} onClick={onCloseModalwindow } className="icon-close" />
                            </div>
                            <div className="modal-body">

                                <InputBase inputRef={refName} placeholder="Название раздела"
                                    sx={{width: "100%", border: "1px solid #c6c6c6", padding: "12px", borderRadius: "4px"}}
                                />


                                            {/* <Form.Control
                                                style={{visibility: 'visible'}}
                                                placeholder="Название раздела"
                                              type="text"
                                              id="inputDataGroupLink"
                                              aria-describedby="inputDataGroupLink"/> */}

                            </div>
                            <div className="modal-footer">

                                <Button onClick={onClickOK}>OK</Button>

                                {/* <button onClick={onClickOK} className="btn btn-secondary">
                                    OK
                                </button> */}
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

