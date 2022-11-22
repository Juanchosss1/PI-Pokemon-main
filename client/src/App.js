import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/home"} component={Home} />
          <Route path={"/details/:id"} component={Details} />
          <Route path={"/create"} component={CreatePokemon} />
          <Route path={"*"} component={Error404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
