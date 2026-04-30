import  CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';

import { StreamLanguage  } from "@codemirror/language"
// import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/legacy-modes/mode/python'

import { tags as t } from '@lezer/highlight';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useSelector } from 'react-redux';

import copyIcon from "../../../../../images/icon-copy.png"

import "./code-mirror-python.css";

import copyToClipboard from "./code-copy";
import { useEffect } from 'react';

const lightTheme = createTheme({
    dark: 'light',
    settings: {
      background: '#ffffff',
      foreground: '#4D4D4C',
      caret: '#AEAFAD',
      selection: '#D6D6D6',
      selectionMatch: '#D6D6D6',
      gutterBackground: '#f2f2f2',
      gutterForeground: '#bfbcbc',
      gutterBorder: '#dddddd',
      gutterActiveForeground: '',
      lineHighlight: '#EFEFEF',



    },
    styles: [
      { tag: t.comment, color: '#969090' },
      { tag: t.definition(t.typeName), color: '#194a7b' },
      { tag: t.typeName, color: '#194a7b' },
      { tag: t.tagName, color: '#008a02' },
      { tag: t.variableName, color: '#343434' },
      { tag: t.className, color: '#302c24' },
      { tag: t.string, color: '#118589' },
      { tag: t.number, color: '#506cf4' },
     { tag: t.bool, color: '#0000ff' },
     { tag: t.keyword, color: '#0000ff' },

    
     ],
    
  });


export default function (props) {

  
    useEffect(() => {
      const cmScrollers = document.querySelectorAll(".cm-scroller");
      console.log(cmScrollers);
    }, [])

    const {theme} = useSelector(state=>state);

    const isLightTheme = theme==="light";

    return (

        <div className={`code-code ${!isLightTheme?"dark":"light"}`}>
            <div className='title'>
                <div>python</div>
                <img src={copyIcon} onClick={() => copyToClipboard(props.value)}/>
            </div>
            <CodeMirror 
            onChange={props.onChange}
              value={props.value}
              theme={isLightTheme?undefined:darcula}
              extensions={StreamLanguage.define(python)} 
            />
        </div>
        
    )
}

