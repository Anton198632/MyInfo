import "./data-code.css";

import CodeMirrorCpp from "./custom-code-mirror/code-mirror-cpp";
import CodeMirrorCsharp from "./custom-code-mirror/code-mirror-csharp";
import CodeMirrorJava from "./custom-code-mirror/code-mirror-java";
import CodeMirrorPython from "./custom-code-mirror/code-mirror-python";
import CodeMirrorCss from "./custom-code-mirror/code-mirror-css";
import CodeMirrorHtml from "./custom-code-mirror/code-mirror-html";
import CodeMirrorJs from "./custom-code-mirror/code-mirror-js";
import CodeMirrorSql from "./custom-code-mirror/code-mirror-sql";
import CodeMirrorXml from "./custom-code-mirror/code-mirror-xml";
import CodeMirrorGo from "./custom-code-mirror/code-mirror-go";
import CodeMirror1c from "./custom-code-mirror/code-mirror-1c";


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import iconDelete from "../../../../images/icon-delete.png";

import { rewriteTextData } from "../../../../redux/actions";


export default function (props) {

    const [isMouseEnter, setIsMousEnter] = useState(false);
    const {isEditState} = useSelector(state=>state);

    const [text, setText] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setText(props.value);
    }, [])

    const buildCode = () => {

        switch (props.codeLang) {

            case "cpp":
                return <CodeMirrorCpp value={text} className="code-item" onChange={onChangeHandle} />
            case "csharp":
                return <CodeMirrorCsharp value={text} className="code-item" onChange={onChangeHandle}/> 
            case "java":
                return <CodeMirrorJava value={text} className="code-item" onChange={onChangeHandle}/> 
            case "python":
                return <CodeMirrorPython value={text} className="code-item"  onChange={onChangeHandle}/>
            case "css":
                return <CodeMirrorCss value={text} className="code-item" onChange={onChangeHandle}/> 
            case "html":
                return <CodeMirrorHtml value={text} className="code-item" onChange={onChangeHandle}/> 
            case "js":
                return <CodeMirrorJs value={text} className="code-item" onChange={onChangeHandle}/> 
            case "sql":
                return <CodeMirrorSql value={text} className="code-item" onChange={onChangeHandle}/> 
            case "xml":
                return <CodeMirrorXml value={text} className="code-item" onChange={onChangeHandle}/>
            case "go":
                return <CodeMirrorGo value={text} className="code-item" onChange={onChangeHandle}/>
            case "ones":
                return <CodeMirror1c value={text} className="code-item" onChange={onChangeHandle}/>
        }
    }

    const onChangeHandle = (data) => {

        console.log(data);

        setText(data);
        dispatch(rewriteTextData(props.orderId, data));
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



    return (
        <div className="data-code section"

        onTouchStart={onMouseEnterHandle}
        onPointerEnter={onMouseEnterHandle}
        onMouseEnter={onMouseEnterHandle}

        onTouchCancel={onMouseLeaveHandle}
        onPointerCancel={onMouseLeaveHandle}
        onMouseLeave={onMouseLeaveHandle}
        
        >

           {buildCode()} 



        {(isEditState && isMouseEnter) ?
        <img className="data-code-del" 
        onClick={onClickDeleteHandle} 
        src={iconDelete} />
        :<></>}


        </div>
    )




}