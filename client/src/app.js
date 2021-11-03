/*
 * Name: App.js
 *
 * Purpose: App Component is the main component in React JS
 *          Acts as a container for all other components.
 */

// All module imports here
import { useEffect } from 'react';
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

// Styled component declarations
const Container = styled.div`
  display: flex;
`;

/*
 * This is the main application component for React
 * it houses the main view and the various other pages,
 * which are routed using React-Router
 * 
 * Renders a Sidebar&Topbar on all pages but he login/home page
 */
function App() {

  // Hook to make an API call that checks the status of devices
  // If disconnected, status = 0 else, status = 1
  // Status of connected machines can be viewed on dashbaord page 
  useEffect(() => {
    setInterval(() => {
      fetch('/dash/checkstatus')
    }, 180000); //check every 3 mins
  });

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