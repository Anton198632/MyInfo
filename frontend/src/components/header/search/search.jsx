import { IconButton, InputBase, Paper, ThemeProvider, createTheme} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setData, setItemsList, setSelectedItem } from "../../../redux/actions";
import useDataBaseService from "../../../services/DataBaseService";




export default function () {

    const refInput = useRef(null);

    const {theme, selectedSection} = useSelector(state=>state);
    const isLightTheme = theme==="light";

    const dispatch = useDispatch();

    const {getItems, getItemsByWords} = useDataBaseService();

    const defaultTheme = createTheme({})

    const darkTheme = createTheme({
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        background: "black",
                        

                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        color: "white"
                    }
                }
            },

            MuiIconButton: {
                styleOverrides: {
                  root: {
                    '&:hover': {
                      backgroundColor: '#1e1e1e', // Здесь вы можете указать желаемый цвет для эффекта нажатия
                    },
                  },
                },
            },
            
        }
    })


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            searchOnClickHandle(event);
          
        }
    };



    const searchOnClickHandle = (e) => {

        if (!selectedSection)
            return

        dispatch(setSelectedItem(null));
        dispatch(setItemsList(null))
        dispatch(setData([]))
        

        if (refInput.current.value !== "")
            getItemsByWords(selectedSection.id, refInput.current.value).then(response => {
                dispatch(setItemsList(response.items));
            })
        else 
            getItems(selectedSection.id).then(response => {
                dispatch(setItemsList(response.items));
            })
    }


    return (
        <div className="search">
            <ThemeProvider theme={isLightTheme?defaultTheme:darkTheme} >
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%" }}>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Поиск"
                    inputRef={refInput}
                    onKeyPress={handleKeyPress}
                    />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
                    onClick={searchOnClickHandle}  >
                    <SearchIcon style={{color: '#c6c6c6'}} />
                </IconButton>

            </Paper>

            </ThemeProvider>
            
            


        </div>
    )


}