import AccountCreation from '../Components/AccountCreation/AccountCreation';
import TicketEditor from '../Components/TicketEditor/TicketEditor';
import TicketTemplateCreation from '../Components/TicketTemplateCreation/TicketTemplateCreation';
import HomeScreen from '../Components/HomeScreen/HomeScreen';
import AdminApproval from '../Components/AdminApproval/AdminApproval';

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
