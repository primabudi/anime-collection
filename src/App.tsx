import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AnimeList from "./pages/anime-list";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AnimeDetail from "./pages/anime-detail";
import AnimeCollectionProvider from "./context/AnimeCollectionProvider";
import CollectionList from "./pages/collection-list";
import CollectionDetail from "./pages/collection-detail";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <AnimeCollectionProvider>
        <h1>Anime Database</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <AnimeList />
            </Route>
            <Route path="/anime/:detail">
              <AnimeDetail />
            </Route>
            <Route path="/collection-list">
              <CollectionList />
            </Route>
            <Route path="/collection-detail/:collectionName">
              <CollectionDetail />
            </Route>
          </Switch>
        </BrowserRouter>
      </AnimeCollectionProvider>
    </ApolloProvider>
  );
}

export default App;
