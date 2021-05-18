import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import Pokemondetail from "./Components/Pokemon/Pokemondetail";
import Form from "./Components/CreatePoke/Form";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={Form} />
        <Route
          exact
          path="/pokemon/:id"
          render={({ match }) => <Pokemondetail id={match.params.id} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
