import {Fragment} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BoxStyleVariants from "../../Styles/BoxStyles";
export default ({ticketTemplate,selectedTicket})=><Fragment>
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
