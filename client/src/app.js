//All module imports here
import './styles/app.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

//All page imports here
import { Home } from './pages/home';
import { Concept } from './pages/concept-test';

//All component imports here
import NavbarComp from './components/Navbar';

//This is the main application component for React
//it houses the view, which is a single navbar component
//and the various other pages, which are routed using React-Router
function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
        <Switch>
          <Route path="/home" exact component={Home} />
          {/*The route used for the concept of the dataflow*/}
          <Route path="/concept" exact component={Concept} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;