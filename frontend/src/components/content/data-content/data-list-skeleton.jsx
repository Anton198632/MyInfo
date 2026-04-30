import { Skeleton } from "@mui/material"
import { useSelector } from "react-redux";


export default function () {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const {theme} = useSelector(state=>state);

      const isLightTheme = theme==="light";

    return <div style={{width: "100%"}}>
        {
            Array.from({length: 8}).map((item, i) => {
                return <Skeleton variant="rounded" 
                            width={`${getRandomInt(30, 90)}%`} 
                            height={"18"}
                            key={i}
                            sx={{margin: "12px 24px", backgroundColor: !isLightTheme?"#777":"none"}}
                            />
            })
        }

        <Skeleton variant="rounded" width={"80%"} height={"30vh"} 
                sx={{margin: "12px 24px", backgroundColor: !isLightTheme?"#777":"none"}}/>
        {
            Array.from({length: 5}).map((item, i) => {
                return <Skeleton variant="rounded" 
                            width={`${getRandomInt(30, 90)}%`} 
                            height={"18"}
                            key={i}
                            sx={{margin: "12px 24px", backgroundColor: !isLightTheme?"#777":"none"}}
                            />
            })
        }
        
    </div>
    

}