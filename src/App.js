import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import PokemonPage from './pages/mypokemon';
import PokemonListRoute from './pages/pokelistroute';

const App = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <div className="row body-app">
        <div className="col-12 p-0">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/poke-list" component={PokemonListRoute} />
            <Route path="/my-pokemon" component={PokemonPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
