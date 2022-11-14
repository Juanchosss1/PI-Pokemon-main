import "./App.css";
import { BrowserRouter, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";

import Details from "./components/Details/Details";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route path={"/details/:id"} component={Details} />
        <Route path={"/create"} component={CreatePokemon} />
      </BrowserRouter>
    </div>
  );
}

export default App;
