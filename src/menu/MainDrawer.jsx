import {Fragment,useState,useContext} from 'react';
import {styled,useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {formal_name} from '../User';
import {presentationComponents} from './MenuPresentationComponents';
import {UserContext, LogoutActionContext} from '../Main';
import HomeScreen from "../Components/HomeScreen/HomeScreen";


const DrawerHeader=styled('div')(({theme})=>({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const BarContent=({open,handleDrawerOpen,title,user,logoutAction})=><Fragment>
    <Grid container
    spacing={1}
    justifyContent="space-between"
    columns={12}
    color="primary"
    >
        <Grid item
        xs="auto"
        >
            <Grid container
            columns={2}
            rows={2}
            direction="row"
            >
                <Grid item
                xs="auto"
                >
                    <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{...(open && {display: 'none'})}}
                    ><MenuIcon/>
                    </IconButton>
                </Grid>
                <Grid item
                xs="auto"
                >
                    <Typography
                    variant="h6"
                    margin={1}
                    align="center"
                    >{title}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item
        xs="auto"
        >
            <Typography
            variant="h6"
            margin={1}
            align="center"
            >{formal_name(user)}
            </Typography>
        </Grid>
        <Grid item
        xs="auto"
        >
            <Card
            align="center"
            sx={{
                width: 1,
                height: 1,
                backgroundColor: "primary.dark",
                color: "secondary.light",
            }}
            >
                <CardActionArea
                onClick={()=>logoutAction()}
                >
                    <Grid container
                    columns={2}
                    spacing={1}
                    sx={{
                        mt:"auto",
                        pl: 1,
                        pr: 1,
                        pb: 1,
                    }}
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Grid item
                        xs="auto"
                        >
                            <Typography
                            variant="h6"
                            align="left"
                            >Logout
                            </Typography>
                        </Grid>
                        <Grid item
                        xs="auto"
                        ><LogoutIcon/>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Grid>
    </Grid>
</Fragment>;
const UserBarContent=({title,user,logoutAction})=><Fragment>
    <Grid container
          spacing={1}
          justifyContent="space-between"
          columns={12}
          color="primary"
    >
        <Grid item
              xs="auto"
        >
            <Grid container
                  columns={2}
                  rows={2}
                  direction="row"
            >
                <Grid item
                      xs="auto"
                >
                    <Typography
                        variant="h6"
                        margin={1}
                        align="center"
                    >{title}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item
              xs="auto"
        >
            <Typography
                variant="h6"
                margin={1}
                align="center"
            >{formal_name(user)}
            </Typography>
        </Grid>
        <Grid item
              xs="auto"
        >
            <Card
                align="center"
                sx={{
                    width: 1,
                    height: 1,
                    backgroundColor: "primary.dark",
                    color: "secondary.light",
                }}
            >
                <CardActionArea
                    onClick={()=>logoutAction()}
                >
                    <Grid container
                          columns={2}
                          spacing={1}
                          sx={{
                              mt:"auto",
                              pl: 1,
                              pr: 1,
                              pb: 1,
                          }}
                          justifyContent="center"
                          alignItems="center"
                    >
                        <Grid item
                              xs="auto"
                        >
                            <Typography
                                variant="h6"
                                align="left"
                            >Logout
                            </Typography>
                        </Grid>
                        <Grid item
                              xs="auto"
                        ><LogoutIcon/>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Grid>
    </Grid>
</Fragment>;
const TopBar=(props)=>{
    const user=useContext(UserContext);
    return <Fragment>
        <AppBar
            position="sticky"
        >
            {user.uType === "user"?
                (
                    <Toolbar>
                        <UserBarContent {...props}/>
                    </Toolbar>
                ):
                (
                    <Toolbar>
                        <BarContent {...props}/>
                    </Toolbar>
                )
            }
        </AppBar>
    </Fragment>;
}
const PresentationListItems=(props)=>{
    return <Fragment>
        {props.menuItemTitles.map(title=>{
            return <ListItem
                    button
                    onClick={() => props.onClick(title)}
                    key={title}
                >
                    <ListItemText
                        primary={title}
                        key={title}
                    />
                    {props.selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>}
                </ListItem>
            }
        )}
    </Fragment>;
};
const findSelectedComponent=(selectedItem)=>{
    const component=[
        ...presentationComponents(),
    ].find(comp=>comp.title === selectedItem);
    return component ? component : {
        title: null,
        component: null
    };
};

export default function MainDrawer({title}){
    const user=useContext(UserContext);
    const logoutAction=useContext(LogoutActionContext);
    const theme=useTheme();
    const [open,setOpen]=useState(false);
    const [selectedItem,setSelectedItem]=useState('Home');
    const handleDrawerOpen=()=>{setOpen(true);};
    const handleDrawerClose=()=>{setOpen(false);};
    const handleSelectedItem=(title)=>{setSelectedItem(title)};

    if (user.uType === "user")
    {
        return <Fragment>
            <TopBar
                title={title}
                user={user}
                logoutAction={logoutAction}
            />
            <Box container
            margin="auto"
            weight={1}
            height={1}
            sx={{
                backgroundColor: 'secondary.main',
                p: 2,
            }}
            >
                <HomeScreen />
            </Box>
        </Fragment>
    }
    return <Fragment>
        <TopBar
        title={title}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        user={user}
        logoutAction={logoutAction}
        />
        <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        >
            <IconButton
            onClick={handleDrawerClose}
            >
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Divider/>
            <List>
                <PresentationListItems
                    selectedItem={selectedItem}
                    onClick={handleSelectedItem}
                    menuItemTitles={presentationComponents().map(comp=>comp.title)}
                />
            </List>
        </Drawer>
        <Box container
        margin="auto"
        weight={1}
        height={1}
        sx={{
            backgroundColor: 'secondary.main',
            p: 2,
        }}
        >
        {findSelectedComponent(selectedItem).component}
        </Box>
    </Fragment>;
}
