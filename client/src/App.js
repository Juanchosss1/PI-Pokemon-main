import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Details from "./components/Details/Details";
function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <BrowserRouter>
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/"} component={NavBar} />
        <Route exact path={"/home"} component={Home} />
        <Route path={"/details/:id"} component={Details} />
      </BrowserRouter>
    </div>
  );
}

export default App;
