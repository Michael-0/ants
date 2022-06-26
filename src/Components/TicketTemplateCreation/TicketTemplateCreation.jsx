import {Fragment, useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import BoxStyleVariants from '../../Styles/BoxStyles';
import API from "../../API_Interface/API_Interface";

export default function TicketTemplateCreation(props){
    const [selectorState, setSelectorState] = useState({name: "Create New Template", description: ""});
    const [attemptCreate, setAttemptCreate] = useState(false);
    const [attemptUpdate, setAttemptUpdate] = useState(false);
    const [APIawait, setAPIawait] = useState(false);
    const [refreshTemplates, setRefreshTemplates] = useState(true);
    const [templates, setTemplates] = useState(undefined);
    useEffect(()=>{
        if (refreshTemplates && !APIawait){
            setAPIawait(true);
            setRefreshTemplates(false);
            (async()=>{
                let noLeak=true;
                await(new API())
                .templates()
                .then((response)=>{
                    if(noLeak){
                        setTemplates(response);
                        setSelectorState(response[0]);
                        setAPIawait(false);
                    }
                });
                return ()=>{noLeak=false};
            })();
        } else {
            if (attemptUpdate && !APIawait){
                setAPIawait(true);
                setAttemptUpdate(false);
                (async()=>{
                    let noLeak=true;
                    await(new API())
                    .templateUpdate(document.getElementById("Description").value, document.getElementById("Template").innerText)
                    .then((response)=>{
                        if(noLeak){
                            setAPIawait(false);
                        }
                    });
                    return ()=>{noLeak=false};
                })();
            }
            else if (attemptCreate && !APIawait){
                setAPIawait(true);
                setAttemptCreate(false);
                (async()=>{
                    let noLeak=true;
                    await(new API())
                        .templateCreate(document.getElementById("NewTemplate").value, document.getElementById("Description").value)
                        .then((response)=>{
                            if(noLeak){
                                setAPIawait(false);
                            }
                        });
                    return ()=>{noLeak=false};
                })();
            }
        }
    }, [refreshTemplates, APIawait, attemptUpdate, attemptCreate, templates]);

    function createTicketTemplateHandler(){
        if (APIawait){return;}
        // setAPIawait(true);
        let newTemplate = document.getElementById("NewTemplate").value;
        let template = document.getElementById("Template").innerText;
        let description = document.getElementById("Description").value;
        if (template !== "Create New Template"){
            // API call to update existing template
            setAttemptUpdate(true);
        } else if (newTemplate && template === "Create New Template") {
            // API call to insert a new template
            setAttemptCreate(true);
        } else {
            alert("Need a new template name");
        }
    };
    function descriptionChangeHandler(){
        let d = document.getElementById("Description").value;
        setSelectorState({...selectorState, description: d});
    };
    return <Fragment>
        <Grid container
        columns={2}
        spacing={2}
        sx={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            justifyItems: "center",
        }}
        >
            <Grid item
            xs={1}
            >
                <TextField
                id="NewTemplate"
                variant="standard"
                defaultValue=""
                label="New Template"
                disabled={selectorState.name !== "Create New Template"}
                sx={{
                    width: 1// display: selectorState.name === "Create New Template" ? "block" : "none",
                }}
                />
            </Grid>
            <Grid item
            xs={1}
            >
                <FormControl sx={{width: 1}}>
                {templates ? (
                    <Fragment>
                        <InputLabel id="TemplateLabel"
                        >Existing Templates
                        </InputLabel>
                        <Select id="Template"
                        variant="standard"
                        onChange={e=>setSelectorState(e.target.value)}
                        labelId="TemplateLabel"
                        label="Existing Templates"
                        defaultValue={templates[0]}
                        >
                        {templates.map((e, idx)=>
                            <MenuItem
                            key={idx}
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
            xs={2}
            >
                <TextField id="Description" multiline fullWidth
                variant="standard"
                onChange={descriptionChangeHandler}
                label="Description"
                value={selectorState.description}
                rows={5}
                />
            </Grid>
            <Grid item container
            xs={2}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                justifyItems: "center",
            }}
            >
                <Grid>
                    <Button
                    variant="outlined"
                    onClick={createTicketTemplateHandler}
                    >
                        {selectorState.name === "Create New Template" ? "Create New Template" : "Update Existing Template" }
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Fragment>;
};

