import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import PokemonPage from './pages/MyPokemon.jsx';
import PokemonListRoute from './pages/PokeListRoute.jsx';
import { PokemonProvider } from './pages/PokemonContext';

const App = () => {

  useEffect(() => {
  }, []);

  return (
    <PokemonProvider>
      <div className="container">
        <div className="row body-app">
          <div className="col-12 p-0 m-0">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/poke-list" component={PokemonListRoute} />
              <Route path="/my-pokemon" component={PokemonPage} />
            </Switch>
          </div>
        </div>
      </div>
    </PokemonProvider>
  );
};

export default App;
