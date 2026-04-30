import  CodeMirror from '@uiw/react-codemirror';

import { loadLanguage  } from '@uiw/codemirror-extensions-langs';

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
                <div>java</div>
                <img src={copyIcon} onClick={() => copyToClipboard(props.value)}/>
            </div>
            <CodeMirror 
              onChange={props.onChange}
              value={props.value}
              theme={isLightTheme?undefined:darcula}
              extensions={[loadLanguage('java')]} 
            />
        </div>
        
    )
}