// All module imports here
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';

// All page imports here
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import { Query } from './pages/query';
import { Commands } from './pages/command';
import { Support } from './pages/support';

//All component imports here
import Sidebar from './components/navigation/Sidebar';
import Topbar from './components/navigation/Topbar';

// All style imports here

/*
 * This is the main application component for React
 * it houses the view, which is a single navbar component
 * and the various other pages, which are routed using React-Router
*/
const Container = styled.div`
  display: flex;
`;

function App() {
  return (   
    <Router>
      { window.location.pathname !== '/' &&  <Topbar /> }
      <Container>
      { window.location.pathname !== '/' &&  <Sidebar /> }
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/query" exact component={Query} />
          <Route path="/command" exact component={Commands} />
          <Route path="/support" exact component={Support} />
        </Switch>
      </Container>
    </Router>
  );
}
export default App;