//All module imports here
import './styles/app.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

//All page imports here
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import { Query } from './pages/query';
import { Commands } from './pages/command';
import { Support } from './pages/support';

//All component imports here
import Sidebar from './components/Sidebar';
import SignInSide from './components/SignInSide';
import Topbar from './components/Topbar';


/*
This is the main application component for React
it houses the view, which is a single navbar component
and the various other pages, which are routed using React-Router
*/



  //I have changed the path of / to be signinside rather than home for now, this isn't permanent
  //it can be changed to home page, it doesn't really matter
function App() {
  return (   
    <Router>
      <Topbar />
      <div className="content">
        <Sidebar />
        <Switch>
          <Route path="/" exact component={ SignInSide } />
          <Route path="/login" exact component={ SignInSide } />
          <Route path="/home" exact component={ Home } />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/query" exact component={Query} />
          <Route path="/command" exact component={Commands} />
          <Route path="/support" exact component={Support} />
        </Switch>
      </div>
    </Router>
  );
}


  
export default App;