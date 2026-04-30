import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/clike/clike"; // Загрузка поддержки для языка 1С
import "./code-mirror-1c.css";

import "codemirror/lib/codemirror.css"; // Загрузка стилей CodeMirror
import "@uiw/codemirror-themes/cjs/index"; // Загрузка стилей компонентов uiw


import { useSelector } from 'react-redux';

import copyIcon from "../../../../../images/icon-copy.png";

import "./code-mirror-python.css";

import copyToClipboard from "./code-copy";


export default function (props) {

    const {theme} = useSelector(state=>state);

    const isLightTheme = theme==="light";

    const options = {
        mode: "text/x-csrc", // Устанавливаем режим для подсветки синтаксиса 1С
        theme: "default", // Выбираем тему (замените на нужную тему, если требуется)
        lineNumbers: true, // Показывать номера строк
        tabSize: 2, // Размер табуляции
      };



    return (

        <div className={`code-code ${!isLightTheme?"dark":"light"}`}>
            <div className='title'>
                <div>1c</div>
                <img src={copyIcon} onClick={() => copyToClipboard(props.value)}/>
            </div>
            <CodeMirror 
                onChange={props.onChange}
                value={props.value}
                options={options}
                />

        </div>
        
    )
}
