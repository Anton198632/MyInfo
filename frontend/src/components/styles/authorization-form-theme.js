import { createTheme } from "@mui/material";


export const authDarkTheme = createTheme({

    palette: {
        type: "dark",
 
        primary: {
            main: '#1abc9c', 
        }
    },

    components: {
  
        MuiButton: {
            styleOverrides: {
                root: {
                    background: "#1abc9c",
                        color: "rgb(57, 57, 57)",
                        border: "1px solid rgb(57, 57, 57)",
    
                    "&:hover": {
                        backgroundColor: 'rgb(57, 57, 57)',
                        color: "#1abc9c",
                        border: "1px solid #1abc9c",
                    },
                },

                

            }

        },

        MuiInputBase: {
            styleOverrides: {
                root: {
                    background: "rgb(57, 57, 57)", 
                    color: "white",

                }
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
                    backgroundColor: "black",
                    
                    
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

                    //
                    '&.MuiAutocomplete-inputRoot': {
                        backgroundColor: 'black',
                            color: "#1abc9c",
                            border: "1px solid #1abc9c",
                    },
                }
            }
        }
    }


})


export const authDefaultTheme = createTheme({

    palette: {
        type: "light",
 
        primary: {
            main: '#1abc9c', 
        }
    },

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