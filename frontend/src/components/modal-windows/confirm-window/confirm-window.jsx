import "./confirm-window.css";

import { Transition } from "react-transition-group";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, InputBase, ThemeProvider } from "@mui/material";
import { darkTheme, defaultTheme } from "../../styles/modal-window-theme";
import iconClose from "../../../images/icon-close.png";
import { useSelector } from "react-redux";

export default function (props) {

    const {theme} = useSelector(state=>state);
    const isLightTheme = theme === "light";

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
        props.close()
    }

    const onClickOK = () => {
        props.positive();
    }


    return (

        <Transition in={props.show} timeout={duration}>
           {
                state => (
                    <div className="modal d-block" style={{
                        ...defaultStyle, ...transitionStyles[state]
                    }}>

                        <ThemeProvider theme={isLightTheme?defaultTheme:darkTheme} >
                        <div className="modal-dialog" style={{display: !props.show?'none':'block'}}>
                        <div className={`modal-content ${!isLightTheme?"dark-theme":""}`} >
                            <div className="modal-header">
                            {props.query}
                                <img src={iconClose} onClick={onCloseModalwindow } className="icon-close" />
                            </div>
                            <div className="modal-footer">
                                <Button className="alternative" style={{marginRight: "12px"}} onClick={onCloseModalwindow}>Отмена</Button>
                                <Button onClick={onClickOK}>Да</Button>
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

