import "./App.css";
import Container from "./components/container/Container";
import CreateUserForm from "./components/createUserForm/CreateUserForm";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/createUser" />
          <Route
            exact
            path="/:page?"
            render={(props) => <Container {...props} />}
          />
          <Route path="/createUser/:id" component={Container} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
