import React, {useState, useEffect, Fragment} from "react";
import API from "./API_Interface/API_Interface";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import BoxStyleVariants from "./Styles/BoxStyles";

import Anton from './/anton-final.png';

export default function Login({setUser}){
    const [APIready, setAPIready] = useState(true);
    const [verifyUser, setVerifyUser] = useState(false);
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const [authFailed, setAuthFailed] = useState(false);
    useEffect(()=>{
        if(APIready && verifyUser){
            setAPIready(false);
            setVerifyUser(false);
            (async()=>{
                let noLeak=true;
                (new API())
                .login(userName,userPass)
                .then((response)=>{
                    if(noLeak){
                        setAPIready(true);
                        if(response){
                            setAuthFailed(false);
                            setUser(response);
                        } else {
                            setAuthFailed(true);
                            setVerifyUser(false);
                        }
                    }
                });
                return ()=>{noLeak=false;};
            })();
        }
    },[verifyUser,userName,userPass,setUser,APIready]);
    return <Fragment>
        <Grid container
        margin="auto"
        columns={2}
        sx={{
            backgroundColor: 'secondary.main',
            alignItems: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: "800px",
            p: 5,
        }}
        >
            <Grid item
            xs={2}
            >
                <Card elevation={1}
                color={'secondary'}
                sx={{
                    border: 3,
                    borderColor: 'primary.light',
                    borderRadius: '10%',
                    backgroundColor: 'primary.dark',
                    textAlign: 'center',
                }}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        setUserName(document.getElementById('Username').value);
                        setUserPass(document.getElementById('Password').value);
                        setVerifyUser(true);
                    }
                }}
                >
                    <Grid container
                    columns={1}
                    spacing={5}
                    sx={{
                        alignItems: 'center',
                        justifyItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: 'secondary.main',
                        mt: 5,
                        mb: 5,
                    }}
                    >
                        <Grid item
                        xs={1}
                        >
                            <Typography
                            variant="h4"
                            ><u>AN</u>other <u>T</u>icketing <u>S</u>ystem
                            </Typography>
                        </Grid>
                        <Grid item
                        xs={0.5}
                        component="img"
                        src={Anton}
                        alt="Anton the Ant :)"
                        />
                        <Grid item
                        xs={1}
                        >
                            <Typography
                            variant="h5"
                            >Login
                            </Typography>
                        </Grid>
                        <Grid item
                        xs="auto"
                        >
                            <TextField
                            id="Username"
                            type="text"
                            error={authFailed}
                            label="Username"
                            variant="standard"
                            onChange={(e)=>setUserName(e.target.value)}
                            sx={{
                                ...BoxStyleVariants.TextFieldBoxes,
                                width: 1,
                                height: "auto",
                            }}
                            />
                        </Grid>
                        <Grid item
                        xs="auto"
                        >
                            <TextField
                            id="Password"
                            type="password"
                            error={authFailed}
                            label="Password"
                            variant="standard"
                            onChange={(e)=>setUserPass(e.target.value)}
                            sx={{
                                ...BoxStyleVariants.TextFieldBoxes,
                                width: 1,
                                height: "auto",
                            }}
                            />
                        </Grid>
                        <Grid item
                        xs="auto"
                        >
                            <Button
                            id="Login"
                            variant="outlined"
                            onClick={()=>setVerifyUser(true)}
                            sx={{
                                color: 'secondary.light',
                                borderColor: 'secondary.main',
                                width: 1,
                            }}
                            >Login
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    </Fragment>;
}
