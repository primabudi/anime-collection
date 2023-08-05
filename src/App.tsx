import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AnimeList from "./pages/anime-list";

function App() {
  console.log("asdasd");
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AnimeList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
