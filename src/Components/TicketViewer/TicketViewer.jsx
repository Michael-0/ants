import {createContext, Fragment, useContext, useEffect, useState} from "react";
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
export default ({userTickets,ticketTemplate,selectedTicket})=><Fragment>
    {Array.isArray(ticketTemplate)?(
        <Grid container
        spacing={1}
        columns={2}
        >
        {ticketTemplate.reduce((p,column,i,a)=>{
            let settings={...(JSON.parse(column.comment)),...column};
            if(settings.type&&settings.type!=="hidden"){
            p.push(
            <Grid item
            xs={1}
            key={i}
            >
                <Card
                key={i}
                sx={{
                    backgroundColor:"primary.dark",
                    color:"secondary.light",
                }}
                >
                    <CardContent>
                    {settings.type==="number"?
                        <TextField multiline
                        {...settings}
                        minRows={1}
                        maxRows={5}
                        variant="standard"
                        color="secondary"
                        value={selectedTicket[settings.id]}
                        sx={{...BoxStyleVariants.TextFieldBoxes}}
                        inputProps={{
                            readOnly: true,
                            inputMode:'numeric',
                            pattern:'[0-9]*',
                        }}
                        />
                    :
                        <TextField multiline
                        {...settings}
                        minRows={1}
                        maxRows={5}
                        variant="standard"
                        color="secondary"
                        value={selectedTicket[settings.id]}
                        sx={{...BoxStyleVariants.TextFieldBoxes}}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                    }
                    </CardContent>
                </Card>
            </Grid>
            );}
            return p;
        },[])}
        </Grid>
    ):undefined}
</Fragment>;
