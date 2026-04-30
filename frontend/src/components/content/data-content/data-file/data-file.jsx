import "./data-file.css";

import downloadIcon from "../../../../images/icon-download.png"
import useDataBaseService from "../../../../services/DataBaseService";

import { useDispatch, useSelector } from "react-redux";

import iconDelete from "../../../../images/icon-delete.png";
import { useState } from "react";

export default function (props) {

    const {getServerAddress} = useDataBaseService();

    const {isEditState} = useSelector(state=>state);
    const [isMouseEnter, setIsMousEnter] = useState(false);

    const onClickFileDownload = () => {

        const link = document.createElement('a');
        link.href = `${getServerAddress()}/static/files/${props.fileName}`
        console.log()
        link.download = props.fileName;
        link.target = "_blank";
        link.click();

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
        <div className="data-file" 

            onTouchStart={onMouseEnterHandle}
            onPointerEnter={onMouseEnterHandle}
            onMouseEnter={onMouseEnterHandle}

            onTouchCancel={onMouseLeaveHandle}
            onPointerCancel={onMouseLeaveHandle}
            onMouseLeave={onMouseLeaveHandle}

            id={`order-id-${props.orderId}`} 
        
        >
            <div className="data-file-name" onClick={onClickFileDownload}>{props.fileName}
                <img className="data-file-dowload" src={downloadIcon} />
            </div>
            
            {isMouseEnter && isEditState?
                <img className="data-del"
                 onClick={onClickDeleteHandle} 
                 src={iconDelete} />
                :<></>}

        </div>
    )

}