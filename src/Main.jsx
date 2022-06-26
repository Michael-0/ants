import {useState,createContext,Fragment} from "react";
import {createTheme, ThemeProvider, Box} from "@mui/material";
import Login from "./Login";
import App from "./App";

const UserContext = createContext();
const SetUserContext = createContext();
const LogoutActionContext = createContext();

export default function Main(){
    const [user,setUser]=useState(undefined);
    const logout=()=>{setUser(undefined);};
    let theme = createTheme({
        palette: {
            primary: {
                main: "#41464c",
                light: "#6c7178",
                dark: "#1a1f24",
            },
            secondary: {
                main: "#9fa4b5",
                light: "#d0d5e7",
                dark: "#707585",
            },
        },
    });
    theme = createTheme(theme, {
        palette: {
            info: {
                main: theme.palette.primary.main,
            },
        },
    });
    return <Fragment>
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={user}>
                <SetUserContext.Provider value={setUser}>
                    <LogoutActionContext.Provider value={logout}>
                        <Box
                        sx={{
                            width:"100vw",
                            height:"100vh",
                            backgroundColor: 'secondary.main',
                            color: 'secondary.main',
                        }}
                        >
                        {user?(
                            <App/>
                        ):(
                            <Login setUser={setUser}/>
                        )}
                        </Box>
                    </LogoutActionContext.Provider>
                </SetUserContext.Provider>
            </UserContext.Provider>
        </ThemeProvider>
    </Fragment>;
};

export {UserContext, SetUserContext, LogoutActionContext};
