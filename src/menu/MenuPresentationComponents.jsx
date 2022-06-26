import AccountCreation from '../Components/AccountCreation/AccountCreation';
import TicketTemplateCreation from '../Components/TicketTemplateCreation/TicketTemplateCreation';
import HomeScreen from '../Components/HomeScreen/HomeScreen';

const presentationComponents=(props)=>{
    return [
        {
            title: 'Home',
            component: <HomeScreen/>
        },
        {
            title: 'AccountCreation',
            component: <AccountCreation/>
        },
        {
            title: 'TicketTemplateCreation',
            component: <TicketTemplateCreation/>
        }
    ];
};


export {presentationComponents};
