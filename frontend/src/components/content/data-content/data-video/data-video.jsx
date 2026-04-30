import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';

import "./data-video.css"

import iconDelete from "../../../../images/icon-delete.png";
import { rewriteTextData } from '../../../../redux/actions';

export default function (props)  {

    const [isMouseEnter, setIsMousEnter] = useState(false);
    const {isEditState} = useSelector(state=>state);

    const [link, setLink] = useState();

    const dispatch = useDispatch();

    useEffect(() => {

        console.log(props.value);

        setLink(props.value)

    }, [])

    const onMouseEnterHandle = () => {
        setIsMousEnter(true);
      }
  
      const onMouseLeaveHandle = () => {
        setIsMousEnter(false);
      }
  
      const onClickDeleteHandle = () => {
        props.showDeleteConfirm(props.dataId, props.dataItemNum)
    }

  // Опции для YouTube плеера
  const opts = {
    // height: '360',
    // width: '640',
    playerVars: {
      // Здесь вы можете добавить дополнительные параметры, если необходимо
      autoplay: 0,
    },
  };

  // Обработчик события, который будет вызван после загрузки плеера
  const onReady = (event) => {
    // Вы можете добавить здесь дополнительные действия, если нужно
  };


//   let videoId = props.value
//   videoId = videoId.substring(videoId.indexOf("?v=")+3, videoId.lenght);

  const onChangeHandle = (e) => {
    setLink(e.target.value)
    dispatch(rewriteTextData(props.orderId, e.target.value))
  }
  

  return (
    <div className='data-video'

      onTouchStart={onMouseEnterHandle}
      onPointerEnter={onMouseEnterHandle}
      onMouseEnter={onMouseEnterHandle}

      onTouchCancel={onMouseLeaveHandle}
      onPointerCancel={onMouseLeaveHandle}
      onMouseLeave={onMouseLeaveHandle}
    
    
    >
        <YouTube videoId={
          link?link.substring(link.indexOf("?v=")+3, link.lenght):""
        } opts={opts} onReady={onReady} className='video-item' />


        {isEditState?
          <input  type="text" value={link}
                placeholder='Ссылка на видео' 
                onChange={onChangeHandle} 
                className="video-input" />
        : <></>}

        {isEditState && isMouseEnter ?
        <img className="data-del" 
        onClick={onClickDeleteHandle} 
        src={iconDelete} />
        :<></>}

    </div>
    
  );
};