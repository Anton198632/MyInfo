import { Skeleton } from "@mui/material"
import { useSelector } from "react-redux";


export default function () {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const {theme} = useSelector(state=>state);

      const isLightTheme = theme==="light";

    return <div>
        {
            Array.from({length: 15}).map((item, i) => {
                return <Skeleton variant="rounded" 
                            width={`${getRandomInt(30, 80)}%`} 
                            height={"18"}
                            key={i}
                            sx={{margin: "10px 10px", backgroundColor: !isLightTheme?"#777":"none"}}
                            />
            })
        }
        
    </div>
    

}