import {Fragment} from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
export default ({userTickets,adminTickets,selectedTicket,setTicketView,setSelectedTicket})=><Fragment>
    {userTickets?.map((ticket,i)=>
        <Card key={i}>
        {selectedTicket===ticket ?
            <CardActionArea onClick={()=>{setSelectedTicket(ticket);setTicketView(false);}}>
                <CardContent align="center">
                    <Grid container
                    columns={2}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Grid item xs="auto">
                            <EditIcon/>
                        </Grid>
                        <Grid item xs>
                            <Typography
                            variant="h6"
                            sx={{
                                fontSize: "2em",
                                wordWrap: "break-word",
                            }}
                            >Click to Edit Ticket: {ticket.tNumb}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        :
            <CardActionArea onClick={()=>{setSelectedTicket(ticket);setTicketView(true);}}>
                <CardContent>
                    <Typography gutterBottom
                    variant="h5"
                    component="div"
                    >Ticket: {ticket.tNumb}
                    </Typography>
                    <Typography
                    variant="body2"
                    color="text.secondary"
                    >{ticket.tDesc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        }
        </Card>
    )}
    <br/>
    {adminTickets?.map((ticket,i)=>
        <Card key={i} >
            {selectedTicket===ticket ?
                <CardActionArea onClick={()=>{setSelectedTicket(ticket);setTicketView(false);}}>
                    <CardContent align="center">
                        <Grid container
                        columns={2}
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                        >
                            <Grid item xs="auto">
                                <EditIcon/>
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: "2em",
                                        wordWrap: "break-word",
                                    }}
                                >Click to Edit Ticket: {ticket.tNumb}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                :
                <CardActionArea onClick={()=>{setSelectedTicket(ticket);setTicketView(true);}}>
                    <CardContent>
                        <Typography gutterBottom
                                    variant="h5"
                                    component="div"
                        >Ticket: {ticket.tNumb}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >{ticket.tDesc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            }
        </Card>
    )}
</Fragment>;
