import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home'
import PokemonPage from './pages/mypokemon'
import PokemonList from './pages/pokelist'

const App = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <div className="row body-app">
        <div className="col-12 p-0" style={{ minHeight: '100vh' }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/poke-list" component={PokemonList} />
            <Route path="/my-pokemon" component={PokemonPage} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
