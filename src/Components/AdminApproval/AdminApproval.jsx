import {Fragment,useEffect,useState} from "react";
import API from "../../API_Interface/API_Interface";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";

export default function AdminApproval(){
    const [adminRequests,setAdminRequests]=useState(undefined);
    const [APIready,setAPIready]=useState(true);
    const [accepting,setAccepting]=useState(undefined);
    const [rejecting,setRejecting]=useState(undefined);
    const [refreshTemplate,setRefreshTemplate] = useState(true);
    const [template,setTemplate]=useState(undefined);
    useEffect(()=>{
        if(refreshTemplate && APIready){
            setAPIready(false);
            setRefreshTemplate(false);
            (async()=>{
                let noLeak=true;
                await(new API())
                .userTemplate()
                .then((response)=>{
                    if(noLeak){
                        setTemplate(response);
                        setAPIready(true);
                    }
                });
                return ()=>{noLeak=false};
            })();
        } else {
            if(rejecting && APIready){
                setAPIready(false);
                setRejecting(undefined);
                (async()=>{
                    let noLeak=true;
                    await(new API())
                    .adminReject(rejecting)
                    .then((response)=>{
                        if(noLeak){
                            setAPIready(true);
                        }
                    });
                    return ()=>{noLeak=false};
                })();
            } else if(accepting && APIready){
                setAPIready(false);
                setAccepting(undefined);
                (async()=>{
                    let noLeak=true;
                    await(new API())
                    .adminAccept(accepting)
                    .then((response)=>{
                        if(noLeak){
                            setAPIready(true);
                        }
                    });
                    return ()=>{noLeak=false};
                })();
            } else if(!adminRequests && APIready){
                setAPIready(false);
                (async()=>{
                    let noLeak=true;
                    (new API())
                    .adminRequests()
                    .then((response)=>{
                        if(noLeak){
                            setAdminRequests(response);
                            setAPIready(true);
                        }
                    });
                    return ()=>{noLeak=false;};
                })();
            }
        }
    },[APIready,adminRequests,refreshTemplate,accepting,rejecting,template]);
    return <Fragment>
        <Grid container
        columns={1}
        >
            <Grid item
            xs={1}
            >
                <Card
                sx={{
                    m: "auto",
                    p: 2,
                }}
                >
                {adminRequests?.map((usr,key)=>
                    <Grid container
                    key={key}
                    columns={usr.length + 2}
                    spacing={2}
                    sx={{
                        alignItems: "flex-start",
                    }}
                    >
                    {Object.entries(usr).map((e, idx)=>
                        <Grid item
                        key={idx}
                        xs={1}
                        sx={{
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            justifyItems: "center",
                            textAlign: "center",
                            textJustify: "center",
                        }}
                        >
                        {`${e[0]}:`}
                        <br/>
                        {`${e[1]}`}
                        </Grid>
                    )}
                        <Grid item
                        xs={1}
                        sx={{
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            justifyItems: "center",
                            textAlign: "center",
                            textJustify: "center",
                        }}
                        >
                            <Card>
                                <CardActionArea
                                onClick={()=>setAccepting(usr)}
                                >
                                <Typography
                                >
                                Accept
                                </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item
                        xs={1}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            justifyItems: "center",
                            textAlign: "center",
                        }}
                        >
                            <Card>
                                <CardActionArea
                                onClick={()=>setRejecting(usr)}
                                >
                                    <Typography>
                                    Reject
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                )}
                </Card>
            </Grid>
        </Grid>
    </Fragment>;
};

