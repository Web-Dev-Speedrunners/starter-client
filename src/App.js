import "./App.css";
import Error404Page from "./error_404/error_page";
//Router
import { Switch, Route, Redirect } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  StudentActionsController
} from './components/containers';

// if you create separate components for adding/editing 
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/home_page" component={HomePageContainer} />
        <Route exact path="/edit/student/:id" component={StudentActionsController} />
        <Route exact path="/edit/student/" component={StudentActionsController} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route exact path="/error/404" component={Error404Page} />
        <Redirect to="/error/404" />
      </Switch>        
    </div>
  );
}

export default App;
