import {Fragment, useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import BoxStyleVariants from "../../Styles/BoxStyles";
import {SetUserContext, UserContext} from '../../Main';
import {SetRefreshUserTicketContext, RefreshUserTicketContext} from '../HomeScreen/HomeScreen';
import API from "../../API_Interface/API_Interface";

export default function TicketCreation(props){
    const [defaultForTemplate, setDefaultForTemplate] = useState("");
    const [attemptCreate, setAttemptCreate] = useState(false);
    const [APIready, setAPIready] = useState(true);
    const [refreshTemplates, setRefreshTemplates] = useState(true);
    const [templates, setTemplates] = useState(undefined);

    const [ticketCategory,setTicketCategory] = useState(undefined);
    const [ticketTemplate,setTicketTemplate] = useState(undefined);
    const [ticketDescription,setTicketDescription] = useState(undefined);

    const [finalTicket,setFinalTicket] = useState(undefined);

    const user = useContext(UserContext);
    const SetRefreshTickets = useContext(SetRefreshUserTicketContext);
    const [newTicketuNumb,setNewTicketuNumb] = useState(user.uNumb);

    function makeDaTicket(){
        setAttemptCreate(true);
        setFinalTicket([newTicketuNumb,ticketCategory,ticketTemplate,1,ticketDescription])
    }

    useEffect(()=>{
        if(APIready){
            if (refreshTemplates){
                setAPIready(false);
                setRefreshTemplates(false);
                (async()=>{
                    let noLeak=true;
                    await(new API())
                    .templates()
                    .then((response)=>{
                        if(noLeak){
                            setTemplates(response);
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false};
                })();
            } else if(attemptCreate){
                setAPIready(false);
                setAttemptCreate(false);
                (async(user)=>{
                    let noLeak=true;
                    await(new API())
                    .ticketCreate(finalTicket)
                    .then((response)=>{
                        if(noLeak){
                            SetRefreshTickets(true);
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false};
                })({});
            }
        }
    },[refreshTemplates,APIready,attemptCreate,templates,finalTicket]);
    return <Fragment>
        <Grid container
        spacing={2}
        sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            justifyItems: "center",
            flexDirection: "row",
        }}
        >
            <Grid item
            xs={6}
            >
                <TextField id="Name"
                placeholder="Name"
                variant="standard"
                label="Name"
                defaultValue={user.fName}
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                />
            </Grid>
            <Grid item
            xs={6}
            >
                <TextField id="Email"
                placeholder="Email"
                variant="standard"
                label="Email"
                defaultValue={user.eMail}
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                />
            </Grid>
            <Grid item
            xs={6}
            >
                <TextField id="PhoneNum"
                placeholder="PhoneNum"
                variant="standard"
                label="Phone Number"
                defaultValue={user.pNumb}
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                />
            </Grid>
            <Grid item
            xs={6}
            >
                <FormControl
                component="span"
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                >
                    <InputLabel id="demo-simple-select-label"
                    >Category
                    </InputLabel>
                    <Select id="Category"
                    variant="standard"
                    sx={{...BoxStyleVariants.TextFieldBoxes}}
                    labelId="demo-simple-select-label"
                    label="Category"
                    placeholder="Category"
                    defaultValue=""
                            onChange={(e)=>setTicketCategory(e.target.value)}

                    >
                        <MenuItem value="Networking"
                        >Networking
                        </MenuItem>
                        <MenuItem
                        value="Hardware">
                        Hardware
                        </MenuItem>
                        <MenuItem
                        value="Software"
                        >Software
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item
            xs={6}
            >
                <FormControl
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                >
                    {templates ? (
                        <Fragment>
                            <InputLabel id="Template"
                            >Template
                            </InputLabel>
                            <Select id="Template"
                            variant="standard"
                            onChange={e=>{setDefaultForTemplate(e.target.value.description);setTicketTemplate(e.target.value.name)}}
                            sx={{...BoxStyleVariants.TextFieldBoxes}}
                            labelId="Template"
                            label="Template"
                            defaultValue={templates[0]}
                            >
                            {templates.map((e,i)=>
                                <MenuItem
                                key={i}
                                value={e}
                                >{e.name}
                                </MenuItem>
                            )}
                            </Select>
                        </Fragment>
                    ) : undefined}
                </FormControl>
            </Grid>
            <Grid item
            xs={12}
            >
                <TextField id="Description" multiline fullWidth
                variant="standard"
                label="Description"
                value={defaultForTemplate}
                rows={5}
                sx={{
                    ...BoxStyleVariants.TextFieldBoxes,
                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "transparent",
                    },
                }}
                InputLabelProps={{shrink: true}}
                onChange={e=>{setDefaultForTemplate(e.target.value.description);setTicketDescription(e.target.value)}}

                />
            </Grid>
            <Grid item
            xs={2}
            >
                <Button
                variant="outlined"
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                onClick={() => (makeDaTicket())}
                >Create Ticket
                </Button>
            </Grid>
        </Grid>
    </Fragment>;
};
