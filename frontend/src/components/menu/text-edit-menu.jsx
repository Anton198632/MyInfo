import "./text-edit-menu.css"
import { useDispatch, useSelector } from "react-redux";

import { rewriteTextData, setTextEditMenuCoords, setTextEditMenuFont } from "../../redux/actions";
import { Select, MenuItem, Button, createTheme } from "@mui/material";

import { useRef, useState } from "react";

import iconBold from "../../images/icon-bold.png";
import iconItalic from "../../images/icon-italic.png";
import { ColorBox, ColorPicker } from "material-ui-color";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
    //   border: "1px solid red",
    //   position: "absolute"
    }
  });


export default function () {

    const {textEditMenuCoords } = useSelector(state=>state);

    // const [font, setFont] = useState({
    //     fontSize: 14,
    //     fontBold: false,
    //     fontItalic: false,
    //     fontColor: "black",
    //     fontBackground: "white"
    // })

    const font = useSelector(state=>state.textEditMenuFont)

    const [fontColor, setFontColor] = useState();
    const [backColor, setBackColor] = useState("none"); 
    const [borderColor, setBorderColor] = useState("none");

    const dispatch = useDispatch();

    const classes = useStyles();

    const resetFontStyle = () => {
        setFontColor();
        setBackColor("none");
        setBorderColor("none");
        dispatch(setTextEditMenuFont({
                fontSize: 16,
                fontBold: false,
                fontItalic: false,
                fontColor: "black",
                fontBackground: "white"
            }
        ))
    }


    // const onClickHandle = (e) => {
    //     dispatch(setTextEditMenuCoords(undefined));
    // }

    const handleChange = (event) => {
        dispatch(setTextEditMenuFont({...font, fontSize: event.target.value}));
    };

    const onClickBold = (e) => {
        e.preventDefault();
        dispatch(setTextEditMenuFont({...font, fontBold: !font.fontBold}));
    }

    const onClickItalic = (e) => {
        e.preventDefault();
        dispatch(setTextEditMenuFont({...font, fontItalic: !font.fontItalic}));
    }

    function findParentWithClass(node, className) {
        while (node.parentNode) {
          node = node.parentNode;
          if (node.classList && node.classList.contains(className)) {
            return node;
          }
        }
        return null; // Если не найден элемент с заданным классом
      }

    const formatText = (e) => {

        // Получаем текущее выделение
        var selection = window.getSelection();
        
        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);

            // Создаем спан для выделения
            var span = document.createElement("span");
            span.style.fontSize = font.fontSize + "px";
            if (font.fontBold)
                span.style.fontWeight = "600";

            if (font.fontItalic)
                span.style.fontStyle = "italic";

            span.style.color = fontColor;
            span.style.background = backColor;

            if (borderColor !== "#FFFFFF") {
                span.style.border = `1px solid ${borderColor}`;
                span.style.padding = "1px 4px";
            }

            // span.className = "text-bold"; // Добавляем класс для стилизации

            const commonAncestorContainer = range.commonAncestorContainer;
            console.log(commonAncestorContainer);

            // Заменяем выделенный текст спаном
            range.surroundContents(span);

            const selectedDiv = findParentWithClass(commonAncestorContainer, "data-text");
            const newDataText = selectedDiv.childNodes[0].innerHTML;
            const orderId = parseInt(selectedDiv.id.toString().substr(9))
            dispatch(rewriteTextData(orderId, newDataText))



            // Очищаем выделение
            selection.removeAllRanges();

            resetFontStyle();
        }

        console.log();

        dispatch(setTextEditMenuCoords(undefined));


    }


    const onClickFontColorHandle = (e) => {
        e.preventDefault();
        onClickFontColorButton(e)
        document.querySelector("#fontColorBox").style.visibility = "visible";
    }

    const onChangeFontColorHandle = (...args) => {

        setFontColor(`#${args[0].hex}`);
    }

    const onClickFontColorButton = (e) => {

        document.querySelector("#fontColorBox").style.visibility = "hidden";
        document.querySelector("#backColorBox").style.visibility = "hidden";
        document.querySelector("#borderColorBox").style.visibility = "hidden";

    }

    const onClickBackColorHandle = (e) => {
        e.preventDefault();
        onClickFontColorButton(e)
        document.querySelector("#backColorBox").style.visibility = "visible";

    }

    const onClickBorderColorHandle = (e) => {
        e.preventDefault();
        onClickFontColorButton(e)
        document.querySelector("#borderColorBox").style.visibility = "visible";
    }

    const onChangeBackColorHandle = (...args) => {

        setBackColor(`#${args[0].hex}`);
    }

    const onChangeBorderColorHandle = (...args) => {

        setBorderColor(`#${args[0].hex}`);
    }

    const onMouseDownHandle = (e) => {
        e.preventDefault();
    }

    return (
        <div onMouseDown={onMouseDownHandle}>

            {textEditMenuCoords? (
                <div className="edit-text-menu" style={{left: textEditMenuCoords.x, top: textEditMenuCoords.y}}>
                <div className="edit-text-list">
                    <Select
                     sx={{height: "32px", width: "56px"}}
                      value={font.fontSize}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={14}><em>14</em></MenuItem>
                      <MenuItem value={16}>16</MenuItem>
                      <MenuItem value={18}>18</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                    </Select>
                    <div className={`icon-bold ${font.fontBold?"selected": ""}`} onMouseDown={onClickBold}>
                        <img src={iconBold} alt="" />
                    </div>
                    <div className={`icon-bold ${font.fontItalic?"selected": ""}`} onMouseDown={onClickItalic}>
                        <img src={iconItalic} alt="" />
                    </div>

                    <div style={{color: fontColor}} className="icon-bold text-color" 
                    onMouseDown={onClickFontColorHandle}>
                        T
                        <div>color</div>
                    </div>
                    <div className="color-picker" style={{ visibility: "hidden", position: "absolute"}} id="fontColorBox">
                        <ColorBox
                            sx={{zIndex: 100}}
                            classes={classes}
                            value={fontColor}
                            onChange={onChangeFontColorHandle}
                         />
                         <Button sx={{color: "#1abc9c !important"}} onClick={onClickFontColorButton}>OK</Button>
                    </div>

                    
                    <div style={{background: backColor, color: fontColor}} className="icon-bold text-background selected"
                    onMouseDown={onClickBackColorHandle}>
                        T
                        <div>back</div>
                    </div>
                    <div className="color-picker" style={{visibility: "hidden", position: "absolute"}} id="backColorBox">
                        <ColorBox
                            sx={{zIndex: 100}}
                            classes={classes}
                            value={backColor}
                            onChange={onChangeBackColorHandle}
                         />
                         <Button sx={{color: "#1abc9c !important"}} onClick={onClickFontColorButton}>OK</Button>
                    </div>

                    <div style={{
                        background: backColor, 
                        color: fontColor, 
                        border: `1px solid ${borderColor}`}} className="icon-bold text-background"
                    onMouseDown={onClickBorderColorHandle}>
                        T
                        <div>border</div>
                    </div>
                    <div className="color-picker" style={{visibility: "hidden", position: "absolute"}} id="borderColorBox">
                        <ColorBox
                            sx={{zIndex: 100}}
                            classes={classes}
                            value={borderColor}
                            onChange={onChangeBorderColorHandle}
                         />
                         <Button sx={{color: "#1abc9c !important"}} onClick={onClickFontColorButton}>OK</Button>
                    </div>

                </div>
                    
                    <Button sx={{color: "#1abc9c !important"}} onClick={formatText}>Применить</Button>
                    
                </div>

            ):(<></>)}

        </div>
    )


}

