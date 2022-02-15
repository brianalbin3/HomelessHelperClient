import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PrayerRequests from './components/PrayerRequests';
import Main from './components/Main';
import HomelessPeople from './components/HomelessPeople';
import MapComponent from './components/MapComponent';
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
            <Route path="/features/schedule" component={Schedule} />
            <Route path="/features/homelesspeople" component={HomelessPeople} />
            <Route path="/features/prayerrequests" component={PrayerRequests} />
            <Route path="/features/map" component={MapComponent} />
            <Route path="/features/accountsettings" component={AccountSettings} />
          </Main>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
