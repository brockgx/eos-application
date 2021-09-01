//All module imports here
import './styles/app.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

//All page imports here
import { Home } from './pages/home';
import { Concept } from './pages/concept-test';

//All component imports here
<<<<<<< HEAD
//<><><><><><><><This is a test addition to the file to confirm this is working properly
=======
import NavbarComp from './components/Navbar';

>>>>>>> main
//This is the main application component for React
//it houses the view, which is a single navbar component
//and the various other pages, which are routed using React-Router
function App() {
  return (
    <Router>
      <div className="App">
<<<<<<< HEAD
        <h1>Hello dude this is a test exercise</h1>
        <h2> Subtitles</h2>
        <Route path="/" exact component={Home} />

        {/*The route used for the concept of the dataflow*/}
        <Route path="/concept" exact component={Concept} />
=======
        <NavbarComp />
        <Switch>
          <Route path="/home" exact component={Home} />
          {/*The route used for the concept of the dataflow*/}
          <Route path="/concept" exact component={Concept} />
        </Switch>
>>>>>>> main
      </div>
    </Router>
  );
}

export default App;