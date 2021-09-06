//All module imports here
import './styles/app.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

//All page imports here
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import { Concept } from './pages/concept';
import { Query } from './pages/query';
import { Commands } from './pages/command';
import { Support } from './pages/support';

//All component imports here
import Sidebar from './components/Sidebar';
import SignInSide from './components/SignInSide';



/*
This is the main application component for React
it houses the view, which is a single navbar component
and the various other pages, which are routed using React-Router
*/

//I have changed the code around the dashboard to make a pseudo-authorised process for now

function App() {
  return (
    <div className="App">
      <Router>
         {
         //  <SignInSide />
         }
         <Sidebar />
         
        <Switch>
          {
          //I have changed the path of / to be signinside rather than home for now, this isn't permanent
          //<Route path= "/SignInSide" exact component={ SignInSide }/>
          }
          
          <Route path="/" exact component={ SignInSide } />
          <Route path="/login" exact component={ SignInSide } />
          <Route path="/home" exact component={ Home } />
          <Route path="/concept" exact component={Concept} />
          <Route path="/dashboard" exact component={() => <Dashboard authorised={true} />} />
          <Route path="/query" exact component={Query} />
          <Route path="/command" exact component={Commands} />
          <Route path="/support" exact component={Support} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;