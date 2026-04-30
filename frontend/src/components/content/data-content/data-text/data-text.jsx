import { useEffect, useRef, useState } from "react";
import "./data-text.css";
import { useDispatch, useSelector } from "react-redux";

import { rewriteTextData, setTextEditMenuCoords } from "../../../../redux/actions";

import iconDelete from "../../../../images/icon-delete.png";

export default function (props) {

    const textareaRef = useRef();

    const [isMouseEnter, setIsMousEnter] = useState(false);
    const [isFocuse, setFocuse] = useState(false);

    const [symbolCounter, setSymbolsCounter] = useState()

    const {isEditState} = useSelector(state=>state);

    const dispatch = useDispatch();

    useEffect(() => {

        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";

        
    })

    useEffect(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
     }, [props.text]);


    const onInputHandle = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = (e.target.scrollHeight) + "px";

        setSymbolsCounter(textareaRef.current.innerText.length);
    }

    function getSelectedText() {
        var selectedText = "";
        if (window.getSelection) { // Для большинства современных браузеров

            selectedText = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") { // Для старых версий IE
            selectedText = document.selection.createRange().text;
        }
        return selectedText
    }


    const onContextMenuHandle = (e) => {

        if (!isEditState)
            return

        e.preventDefault();

        console.log(getSelectedText());

        let x = e.clientX;
        let y = e.clientY;

        console.log(window.innerHeight, y);

        if (window.innerWidth - 333 < x)
            x = window.innerWidth - 333

        if (window.innerHeight - 350 < y)
            y = window.innerHeight - 350

        dispatch(setTextEditMenuCoords({x, y}));

    }

    const onEditCompleteHandle = (e) => {

        const ordeId = parseInt(e.target.parentNode.id.toString().substr(9));
        const dataText = e.target.innerHTML;

        dispatch(rewriteTextData(ordeId, dataText));

        setFocuse(false);
    }


    const onMouseEnterHandle = () => {
        setIsMousEnter(true);
    }

    const onMouseLeaveHandle = () => {
        setIsMousEnter(false);
    }

    const onClickDeleteHandle = () => {

        props.showDeleteConfirm(props.dataId, props.dataItemNum)
    }


    const onFocusHandle =()=> {
        setFocuse(true);
    }


    return (
        <div id={`order-id-${props.orderId}`} 
            className="data-text" 
            onContextMenu={onContextMenuHandle}

            onTouchStart={onMouseEnterHandle}
            onPointerEnter={onMouseEnterHandle}
            onMouseEnter={onMouseEnterHandle}

            onTouchCancel={onMouseLeaveHandle}
            onPointerCancel={onMouseLeaveHandle}
            onMouseLeave={onMouseLeaveHandle}
            >

            <div contentEditable={isEditState?"true":"false"}
             onFocus={onFocusHandle}
            onBlur={onEditCompleteHandle}
            className="section edit-text" 
            onInput={onInputHandle} ref={textareaRef}
            dangerouslySetInnerHTML={{__html: props.text !== "" || isFocuse?
            props.text
            :"<span class='place-holder'>Введите текст...</span>"}} >
             
            </div>

           {isEditState? 
            <div className="symbol-counter">
                <div>
                    {symbolCounter} симв.
                </div>
            </div>
            : <></>
           } 
           

           {isMouseEnter && isEditState?
           <img className="data-del"
            onClick={onClickDeleteHandle} 
            src={iconDelete} />
           :<></>}

        </div>
    )


}