import { createTheme } from "@mui/material"


export const defaultTheme = createTheme({

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
                    },

                    "&.alternative": {
                        background: "#c6c6c6",
                        color: "white",
                        border: "1px solid white",
                    },
                    
                    "&.alternative:hover": {
                        background: "white",
                        color: "#c6c6c6",
                        border: "1px solid #c6c6c6",
                    }
                },

            }
        },
    }

})

export const darkTheme = createTheme({
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
    
                        "&.alternative": {
                            background: "#c6c6c6",
                            color: "rgb(57, 57, 57)",
                            border: "1px solid rgb(57, 57, 57)",
                        },
                        
                        "&.alternative:hover": {
                            background: "rgb(57, 57, 57)",
                            color: "#c6c6c6",
                            border: "1px solid #c6c6c6",
                        }
                    },
    
                }
            },


            // {
            //     styleOverrides: {
            //         root: {
            //             background: "#1abc9c",
            //             color: "white",
            //             border: "1px solid white",

            //             "&:hover": {
            //                 backgroundColor: 'white',
            //                 color: "#1abc9c",
            //                 border: "1px solid #1abc9c",
            //             }
            //         },

                    

            //     }

            // },

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