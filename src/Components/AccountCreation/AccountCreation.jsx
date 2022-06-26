import {Fragment, useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import BoxStyleVariants from '../../Styles/BoxStyles';
import API from "../../API_Interface/API_Interface";
import {Input} from "@mui/material";
import {Label} from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const specialties = ["Network", "Hardware", "Software", "Telecom"];

export default function AccountCreation(props){
    const api=useState(new API())[0];
    const[admin,setAdmin]=useState(false);
    const[attemptCreate,setAttemptCreate]=useState(false);
    const[testCreate,setTestCreate]=useState(false);
    const[APIready,setAPIready]=useState(true);
    const[refreshUserTemplate,setRefreshUserTemplate]=useState(true);
    const[template,setTemplate]=useState(undefined);
    // const [level, setLevel] = useState("User");
    useEffect(()=>{
        if(APIready){
            if(refreshUserTemplate){
                setAPIready(false);
                setRefreshUserTemplate(false);
                (async()=>{
                    let noLeak=true;
                    api.userTemplate().then((response)=>{
                        console.log(response);
                        if(noLeak){
                            setTemplate(response);
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false;};
                })();
            } else if(testCreate){
                /*setTestCreate(false);
                (async(user)=>{
                    let noLeak=true;
                    api.testUser(user).then((response)=>{
                        console.log(response);
                        if(noLeak){
                            setTestCreate(response);
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false;};
                })();*/
            } else if(testCreate){
                setTestCreate(false);
                /*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
                </Snackbar>*/
            } else if(attemptCreate){
                setAPIready(false);
                setAttemptCreate(false);
                (async()=>{
                    let noLeak=true;
                    api.userCreate(
                        {
                            uName: document.getElementById("uName").value,
                            uType: document.getElementById("uType").innerText,
                            uPass: document.getElementById("uPass").value,
                            eMail: document.getElementById("eMail").value,
                            pNumb: document.getElementById("pNumb").value,
                            pName: document.getElementById("pName").value,
                            fName: document.getElementById("fName").value,
                            mName: document.getElementById("mName").value,
                            lName: document.getElementById("lName").value,
                            pNoun: document.getElementById("pNoun").value,
                            oName: document.getElementById("oName").value
                        }
                    ).then((response)=>{
                        console.log(response);
                        if(noLeak){
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false;};
                })();
            }
        }
    }, [template, testCreate, refreshUserTemplate, attemptCreate, api]);
    return <Fragment>
        <Grid container
        columns={2}
        spacing={3}
        >
        {template?.reduce((p,v,i,a)=>{
            p.push(
            <Grid item
            key={i}
            xs={1}
            >
            {v.type==="list"?
                <FormControl
                    component="span"
                >
                    <InputLabel>
                    Level
                    </InputLabel>
                    <Select {...v} defaultValue={"user"}
                            // onChange={()=>uTypeChangeHandler(document.getElementById(v.id).innerText)}
                    >
                        <MenuItem onClick={()=>{setAdmin(false)}}
                            value="user"
                        >User
                        </MenuItem>
                        <MenuItem
                            onClick={()=>{setAdmin(true)}}
                            value="agent">
                            Agent
                        </MenuItem>
                        <MenuItem
                            onClick={()=>{setAdmin(true)}}
                            value="admin"
                        >Admin
                        </MenuItem>
                    </Select>
                </FormControl>
            :
                <TextField {...v}/>
            }
            </Grid>);
            return p;
        }, [])}
            <Grid item xs={admin?1:0} key={template?.length}>
                <List dense={true}>
                    {specialties?.reduce((p,v,i,a)=>{
                        p.push(
                            <ListItem
                                key={i}
                                sx={{
                                    display: (admin ? 'block' : 'none'),
                                }}
                            >
                                <FormControlLabel
                                    control={<Checkbox key={i*i} id={v}/>}
                                    label={v}
                                    sx={{...BoxStyleVariants.CheckBoxes}}
                                />
                            </ListItem>);
                        return p;
                    }, [])}
                </List>
            </Grid>
            <Grid item xs={1} key={template?.length+2} sx={{
                display: 'flex',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                justifyItems: 'flex-start',
            }}>
                <Button
                    variant="outlined"
                    onClick={()=>setAttemptCreate(true)}
                >
                    Create
                </Button>
            </Grid>
        </Grid>
        {/*
        <Grid container
        direction="row"
        justifyContent="center"
        >
            <Grid item
            xs={6}
            >
                <List disabled
                dense={true}
                >
                {specialties?.reduce((p,v,i,a)=>{
                    p.push(
                    <ListItem
                    key={i}
                    sx={{
                        display: (admin ? 'block' : 'none'),
                        textAlign: "center",
                    }}
                    >
                        <FormControlLabel
                        control={<Checkbox id={v}/>}
                        label={v}
                        sx={{...BoxStyleVariants.CheckBoxes}}
                        />
                    </ListItem>);
                    return p;
                }, [])}
                </List>
            </Grid>
        </Grid>
        */}
    </Fragment>;
};
