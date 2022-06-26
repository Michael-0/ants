import {Fragment, useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import BoxStyleVariants from "../../Styles/BoxStyles";
import SaveIcon from '@mui/icons-material/Save';
import {UserContext} from '../../Main';
import API from "../../API_Interface/API_Interface";

export default function TicketCreation(props){

    const {ticket,setRefreshUserTickets} = props;


    const [defaultForTemplate, setDefaultForTemplate] = useState(ticket.tDesc);
    const [attemptUpdate, setAttemptUpdate] = useState(false);
    const [APIready, setAPIready] = useState(true);
    const [refreshTemplates, setRefreshTemplates] = useState(true);
    const [templates, setTemplates] = useState('');

    const [ticketCategory,setTicketCategory] = useState(ticket.tCategory);
    const [ticketTemplate,setTicketTemplate] = useState('');
    const [ticketDescription,setTicketDescription] = useState(undefined);

    const [updatedTicket,setUpdatedTicket] = useState(undefined);

    const [templateIdx,setTemplateIdx] = useState(0);

    const user = useContext(UserContext);
    const [newTickettNumb,setNewTickettNumb] = useState(ticket.tNumb);


    useEffect(()=>{
        if(templates !== ''){
            for(let index = 0; index < templates.length;index++){
                if(ticket.tTemplate === templates[index].name){
                    setTemplateIdx(index);
                }
            }
        }

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
                            setTicketTemplate(ticket.tTemplate)
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false};
                })();
            } else if(attemptUpdate){
                setAPIready(false);
                setAttemptUpdate(false);
                (async(user)=>{
                    let noLeak=true;
                    await(new API())
                    .ticketUpdate(updatedTicket)
                    .then((response)=>{
                        if(noLeak){
                            setAPIready(true);
                        }
                    });
                    return()=>{noLeak=false};
                })({});
            }
        }
    }, [APIready, refreshTemplates, attemptUpdate, ticket.tTemplate, updatedTicket]);
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
                value={user.fName}
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
                value={user.eMail}
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
                value={user.pNumb}
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
                    value={ticketCategory}
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
                            onChange={e=>{setDefaultForTemplate(e.target.value.description);setTicketTemplate(e.target.value.name);}}
                            sx={{...BoxStyleVariants.TextFieldBoxes}}
                            labelId="Template"
                            label="Template"
                            value={templates[templateIdx]}
                            >
                            {templates.map((e,i)=>
                                <MenuItem
                                key={i}
                                value={e}
                                onClick={e=>{setTemplateIdx(i)}}
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
                onChange={e=>{
                    setDefaultForTemplate(e.target.value.description);
                    setTicketDescription(e.target.value)
                }}
                />
            </Grid>
            <Grid item
            xs={2}
            >
                <Button
                variant="outlined"
                sx={{...BoxStyleVariants.TextFieldBoxes}}
                onClick={()=>{
                    setAttemptUpdate(true);
                    setRefreshUserTickets(true);
                    setUpdatedTicket([ticketCategory,ticketTemplate,ticketDescription,newTickettNumb]);
                }}
                >
                    <Grid container
                    columns={2}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Grid item xs>
                            <SaveIcon/>
                        </Grid>
                        <Grid item xs
                        sx={{
                            wordWrap: "break-word",
                        }}
                        >{`Update Ticket: ${ticket.tNumb}`}
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        </Grid>
    </Fragment>;
};
