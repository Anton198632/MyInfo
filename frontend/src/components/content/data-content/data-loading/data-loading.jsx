import { CircularProgress } from "@mui/material";

import "./data-loading.css";

export default function () {



    return (
        <div className="data-loading">
            <CircularProgress color="success"/>
            <div></div>
        </div>
    )



}