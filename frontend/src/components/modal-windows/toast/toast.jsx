import { useDispatch, useSelector } from "react-redux";
import "./toast.css"
import { Transition } from "react-transition-group";
import { useEffect, useRef } from "react";
import { duration } from "@mui/material";
import { showToast } from "../../../redux/actions";

export default function() {

    const {toast} = useSelector(state=>state);

    const refToast = useRef();

    const DURATION = 5000;

    const dispatch = useDispatch()


    useEffect(() => {

        if (toast.show) {
            const animation = refToast.current.animate([
                { filter: 'opacity(0%)'},
                { filter: 'opacity(30%)'},
                { filter: 'opacity(50%)'},
                { filter: 'opacity(70%)'},
                { filter: 'opacity(100%)'},
                { filter: 'opacity(100%)'},
                { filter: 'opacity(100%)'},
            ], {duration: DURATION, iterations: 1})
    
            animation.play();

            setTimeout(() => {
                

                dispatch(showToast(false, toast.type, toast.message))

            }, DURATION)
        }

    })

    


    return (

            <div className={`toast-message ${!toast.show?"toast-hide":""}`} ref={refToast} >
                <div className={toast.type}>
                    {toast.message}
                </div>
                
            </div>

    )


}