//All module imports here
import './styles/app.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

//All page imports here
import { Dashboard } from './pages/dashboard';
import { Query } from './pages/query';
import { Commands } from './pages/Command';
import { Support } from './pages/support';

//All component imports here
import Sidebar from './components/navigation/Sidebar';
import SignInSide from './components/SignInSide';
import Topbar from './components/navigation/Topbar';
import CustomizedSnackbars from './components/commands-tabs/commandSnackbar';

/*
This is the main application component for React
it houses the view, which is a single navbar component
and the various other pages, which are routed using React-Router
*/

function App() {
  return (   
    <Router>
      { window.location.pathname !== '/' &&  <Topbar /> }
      <div className="content">
      { window.location.pathname !== '/' &&  <Sidebar /> }
        <Switch>
          <Route path="/" exact component={ SignInSide } />
          <Route path="/home" exact component={ SignInSide } />
          <Route path="/login" exact component={ SignInSide } />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/query" exact component={Query} />
          <Route path="/command" exact component={Commands} />
          <Route path="/support" exact component={Support} />
        </Switch>
        <CustomizedSnackbars />
      </div>
    </Router>
  );
}


  
export default App;