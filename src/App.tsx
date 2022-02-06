import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ContactSettings from './components/ContactSettings';
import Main from './components/Main';
import Medicine from './components/Medicine';
import Alarms from './components/Alarms';
import Schedule from './components/Schedule';
import AccountSettings from './components/AccountSettings';
import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import FindAccount from './components/FindAccount';
import PickResetMethod from './components/PickResetMethod';
import EnterCode from './components/EnterCode';
import ResetPassword from './components/ResetPassword';

import PrivateRoute from './components/PrivateRoute';

import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/findaccount" component={FindAccount} />
        <Route exact path="/pickresetmethod" component={PickResetMethod} />
        <Route exact path="/entercode" component={EnterCode} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/" component={Splash} />
        <PrivateRoute path="/features">
          <Main>
            <Route path="/features/medicine" component={Medicine} />
            <Route path="/features/contactsettings" component={ContactSettings} />
            <Route path="/features/alarms" component={Alarms} />
            <Route path="/features/schedule" component={Schedule} />
            <Route path="/features/accountsettings" component={AccountSettings} />
          </Main>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
