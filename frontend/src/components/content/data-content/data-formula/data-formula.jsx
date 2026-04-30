import React, { useEffect, useState } from 'react';

import "./data-formula.css";
import { useDispatch, useSelector } from 'react-redux';

import { rewriteTextData } from '../../../../redux/actions';

import iconDelete from "../../../../images/icon-delete.png";


function MathFormula(props) {
    useEffect(() => {
       window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }, [props.text]);
  
    return (
      <div>
        <p dangerouslySetInnerHTML={{ __html: props.text }} className="p-text"></p>
      </div>
    );
  }

export default function(props) {

    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const {isEditState} = useSelector(state=>state);
    
    const [isMouseEnter, setIsMousEnter] = useState(false);

    useEffect(() => {
        setText(props.dataContent);

    }, [])

    
    const onChangeHandle = (e) => {
    
        setText(e.target.value);
        dispatch(rewriteTextData(props.orderId, e.target.value));
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
        <div className="data-formula"

            onTouchStart={onMouseEnterHandle}
            onPointerEnter={onMouseEnterHandle}
            onMouseEnter={onMouseEnterHandle}

            onTouchCancel={onMouseLeaveHandle}
            onPointerCancel={onMouseLeaveHandle}
            onMouseLeave={onMouseLeaveHandle}

            id={`order-id-${props.orderId}`} 
        >
        <MathFormula text={text} />

            {isEditState?
            <div>
                <input  type="text" value={text}
                placeholder='Введите формулу в формате LaTeX' 
                onChange={onChangeHandle} 
                className="formula-input" />

                <a href='http://detexify.kirelabs.org/classify.html' target='_blank'>
                    Ссылка на распознование символов формата LaTeX</a>

            </div>
            : <></>}

            {isMouseEnter && isEditState?
                <img className="data-del"
                 onClick={onClickDeleteHandle} 
                 src={iconDelete} />
                :<></>}
        </div>

    )
 

}