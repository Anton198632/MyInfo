import { useState } from "react";
import "./data-image.css";
import styled from 'styled-components';
import {  useSelector } from "react-redux";

import iconDelete from "../../../../images/icon-delete.png";

export default function (props) {


    const [isFullScreen, setIsFullScreen] = useState(false);

    const [isMouseEnter, setIsMousEnter] = useState(false);

    const {isEditState} = useSelector(state=>state);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const {theme} = useSelector(state=>state)
    const isLightTheme = theme==="light";


    const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${isLightTheme?"rgb(198 198 198 / 19%)":"#393939"};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('${props.value}'); /* Замените на URL вашего изображения */
    background-size: cover; /* Задайте желаемое поведение фонового изображения */
    filter: blur(5px); /* Задайте желаемую степень размытия */
    opacity: .3;
  }
`;

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

      <div className="data-image"
      onTouchStart={onMouseEnterHandle}
      onPointerEnter={onMouseEnterHandle}
      onMouseEnter={onMouseEnterHandle}

      onTouchCancel={onMouseLeaveHandle}
      onPointerCancel={onMouseLeaveHandle}
      onMouseLeave={onMouseLeaveHandle}
      
      >
        <ImageContainer className="image-container code-image code-item" 
        id={`order-id-${props.orderId}`} >

              <img 
              src={props.value} 
              alt="Image"
              className={`${isFullScreen ? 'fullscreen-image' : ''} `}
              onClick={toggleFullScreen}
            />
        </ImageContainer>

        {isEditState && isMouseEnter ?
        <img className="data-del" 
        onClick={onClickDeleteHandle} 
        src={iconDelete} />
        :<></>}
      </div>
      

)


} 