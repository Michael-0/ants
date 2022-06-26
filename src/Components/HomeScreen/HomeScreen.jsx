import {createContext, Fragment, useContext, useEffect, useState} from "react";
import API from "../../API_Interface/API_Interface";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import EditIcon from '@mui/icons-material/Edit';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BoxStyleVariants from "../../Styles/BoxStyles";
import {UserContext/*, SetUserContext*/} from "../../Main";
import TicketCreation from "../TicketCreation/TicketCreation";
import TicketEditor from "../TicketEditor/TicketEditor";
import TicketViewer from "../TicketViewer/TicketViewer";
import TicketList from "../TicketList/TicketList";

const RefreshUserTicketContext = createContext();
const SetRefreshUserTicketContext = createContext();

export default function HomeScreen(){
    const user=useContext(UserContext);
    //const setUser=useContext(SetUserContext);
    const[refreshUserTickets,setRefreshUserTickets]=useState(true);
    const[userTickets,setUserTickets]=useState(undefined);
    const[ticketView,setTicketView]=useState(true);
    const[selectedTicket,setSelectedTicket]=useState(undefined);
    const[defaultForTemplate,setDefaultForTemplate]=useState("");
    const[attemptCreate,setAttemptCreate]=useState(false);
    const[APIready,setAPIready]=useState(true);
    const[refreshTicketTemplate,setRefreshTicketTemplate]=useState(true);
    const[ticketTemplate,setTicketTemplate]=useState(undefined);
    const [adminTickets,setAdminTickets] = useState(undefined);

    useEffect(()=>{
        if(APIready){
            if(refreshTicketTemplate){
                setAPIready(false);
                setRefreshTicketTemplate(false);
                (async()=>{
                    let noLeak=true;
                    await(new API())
                    .ticketTemplate()
                    .then((response)=>{
                        if(noLeak){
                            setTicketTemplate(response);
                            setAPIready(true);
                        }
                    });
                    return ()=>{noLeak=false};
                })();
            } else if(refreshUserTickets){
                setAPIready(false);
                setRefreshUserTickets(false);
                if(user.uType === 'admin'){
                    (async()=>{
                        let noLeak=true;
                        await(new API())
                            .ticketAdminuNumb(user.uNumb)
                            .then((response)=>{
                                if(noLeak){
                                    setAdminTickets(response);
                                    /*if(!selectedTicket && response.length > 0){
                                        setSelectedTicket(response[0]);
                                    }*/
                                    setAPIready(true);
                                }
                            });
                        return ()=>{noLeak=false;};
                    })();
                }
                (async()=>{
                    let noLeak=true;
                    await(new API())
                    .ticketuNumb(user.uNumb)
                    .then((response)=>{
                        if(noLeak){
                            setUserTickets(response);
                            /*if(!selectedTicket && response.length > 0){
                                setSelectedTicket(response[0]);
                            }*/
                            setAPIready(true);
                        }
                    });
                    return ()=>{noLeak=false;};
                })();
            }
        }
    },[refreshTicketTemplate,APIready,attemptCreate,ticketTemplate,selectedTicket,setSelectedTicket,setUserTickets,user, refreshUserTickets, setRefreshUserTickets]);

    return <Fragment>
    <RefreshUserTicketContext.Provider value={refreshUserTickets}>
    <SetRefreshUserTicketContext.Provider value={setRefreshUserTickets}>
        <Grid container
        spacing={2}
        columns={4}
        sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "secondary.main",
        }}
        >
            <Grid item
            xs={1}
            >
                <Grid container
                spacing={1}
                columns={1}
                >
                    <Grid item
                    xs={1}
                    >
                        <Card
                        sx={{
                            backgroundColor: "primary.dark",
                            color: "secondary.light",
                        }}
                        >
                            <CardActionArea
                            onClick={()=>setSelectedTicket(undefined)}
                            >
                                <CardContent align= "center">
                                    <Grid container
                                    columns={2}
                                    spacing={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    >
                                        <Grid item xs="auto">
                                            <AddBoxIcon/>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: "2em",
                                                wordWrap: "break-word",
                                            }}
                                            >Create New Ticket
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <TicketList
                        userTickets={userTickets}
                        adminTickets={adminTickets}
                        selectedTicket={selectedTicket}
                        setTicketView={setTicketView}
                        setSelectedTicket={setSelectedTicket}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item
            xs={3}
            >
                <Paper
                elevation={1}
                sx={{
                    display: 'flex',
                    backgroundColor: 'primary.main',
                    width: 'auto',
                    height: 'auto',
                    "& > :not(style)": {
                        m: 1,
                    },
                }}
                >
                {selectedTicket?
                    (ticketView?
                        <TicketViewer
                        userTickets={userTickets}
                        ticketTemplate={ticketTemplate}
                        selectedTicket={selectedTicket}
                        />
                    :
                        <TicketEditor
                        ticket={selectedTicket}
                        setRefreshUserTickets={setRefreshUserTickets}
                        />
                    )
                :
                    <TicketCreation/>
                }
                </Paper>
            </Grid>
        </Grid>
    </SetRefreshUserTicketContext.Provider>
    </RefreshUserTicketContext.Provider>
    </Fragment>;
};

export {SetRefreshUserTicketContext, RefreshUserTicketContext};


