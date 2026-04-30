import { useEffect, useRef, useState } from "react";
import "./authorization-form.css";
import useDataBaseService from "../../services/DataBaseService";
import { useDispatch } from "react-redux";

import { setUser } from "../../redux/actions";
import { TextField, ThemeProvider, createTheme, Button } from "@mui/material";

export default function (props) {


    const loginRef = useRef(null);
    const passRef = useRef(null);
    const passRepRef = useRef(null);

    const [error, setError] = useState("")

    const [isRegister, setIsRegister] = useState(false);

    const {logIn, registration} = useDataBaseService();

    const dispatch = useDispatch();



    const onClickHandle = () => {

        setError("");

        if (!isRegister) {
            logIn(loginRef.current.value, passRef.current.value).then(response => {

                if (response.registration) {
                    setError(response.registration)
                }
                else {
                    props.setDataUser(response.user)
                    // dispatch(setUser(response.user));
                }
    
            })

        } else {
            registration(
                loginRef.current.value, 
                passRef.current.value, 
                passRepRef.current.value).then(response => {
                    if (response.registration) {
                        setError(response.registration)
                    }
                    else {
                        props.setDataUser(response.user)
                    }
                })

        }

        
    }

    const theme = createTheme({
        components: {

            MuiButton: {
                styleOverrides: {
                    root: {
                        background: "#1abc9c",
                        color: "white",
                        border: "1px solid white",

                        "&:hover": {
                            backgroundColor: 'white',
                            color: "#1abc9c",
                            border: "1px solid #1abc9c",
                        }
                    },

                    

                }

            },

            MuiInputLabel: {
                styleOverrides: {
                    root:  {
                        // стиль при обычном состоянии
                        color: '#1abc9c',  
                        
                        // стиль при фокусировке
                        "&.Mui-focused ": {     
                            color: '#1abc9c', 
                          },
                    },
                }
            },

            MuiTextField: {
                styleOverrides: {
                    root: {
                        // стиль при обычном состоянии
                    borderColor: '#1abc9c',
                    margin: "12px",     
                    '.MuiOutlinedInput-input': {
                        borderColor: '#1abc9c',
                        // padding: '6px 32px 6px 16px;',
                      },
                      
                    // стиль при фокусировке
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#1abc9c'
                      },

                    // стиль при наведении
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1abc9c',
                        borderWidth: '0.15rem',
                      },
                    }
                }
            }
        }
    })


    const onClickChangeRegIn = () => {
        setError("");
        setIsRegister(!isRegister);
    }


    return (

        <div className="authorization-form">
            <ThemeProvider theme={theme}>
                
                <TextField type="text" label="Логин" inputRef={loginRef}/>
                <TextField type="password" label="Пароль" inputRef={passRef}/>
                
                {isRegister?
                <TextField type="password" label="Пароль повторно" inputRef={passRepRef}/>
                : <></>}
                
                <Button onClick={onClickHandle}>
                    {!isRegister?"Войти":"Зарегистрироваться"}
                </Button>


                <div className="change-reg-in">
                    <div onClick={onClickChangeRegIn}>
                        {!isRegister?"Регистрация":"Вход"}
                    </div>
                    
                </div>

                <span className="error">{error}</span>


            </ThemeProvider>
            
        </div>
    )

}