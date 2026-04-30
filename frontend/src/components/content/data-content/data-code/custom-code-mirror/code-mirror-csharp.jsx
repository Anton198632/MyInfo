import  CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';

import { StreamLanguage  } from "@codemirror/language"
// import { javascript } from '@codemirror/lang-javascript';
import { csharp } from "@replit/codemirror-lang-csharp";
import { loadLanguage  } from '@uiw/codemirror-extensions-langs';
import { tags as t } from '@lezer/highlight';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useSelector } from 'react-redux';

import copyIcon from "../../../../../images/icon-copy.png"

import "./code-mirror-python.css";

import copyToClipboard from "./code-copy";

export default function (props) {

    const {theme} = useSelector(state=>state);

    const isLightTheme = theme==="light";

    return (

        <div className={`code-code ${!isLightTheme?"dark":"light"}`}>
            <div className='title'>
                <div>c#</div>
                <img src={copyIcon} onClick={() => copyToClipboard(props.value)}/>
            </div>
            <CodeMirror
                onChange={props.onChange} 
              value={props.value}
              theme={isLightTheme?undefined:darcula}
              extensions={[csharp()]}  
            />
        </div>
        
    )
}

