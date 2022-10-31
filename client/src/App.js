import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Details from "./components/Details/Details";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/"} component={NavBar} />
      </Switch>
        <Route exact path={"/home"} component={Home} />
        <Route path={"/details/:id"} component={Details} />
        <Route path={"/create"} component={CreatePokemon} />
      </BrowserRouter>
    </div>
  );
}

export default App;
