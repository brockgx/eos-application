//All module imports here
import './styles/app.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

//All page imports here
import { Home } from './pages/home';
import { Concept } from './pages/concept-test';

//All component imports here
//<><><><><><><><This is a test addition to the file to confirm this is working properly
//This is the main application component for React
//it houses the view, which is a single navbar component
//and the various other pages, which are routed using React-Router
function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hello dude this is a test</h1>
        <Route path="/" exact component={Home} />

        {/*The route used for the concept of the dataflow*/}
        <Route path="/concept" exact component={Concept} />
      </div>
    </Router>
  );
}

export default App;