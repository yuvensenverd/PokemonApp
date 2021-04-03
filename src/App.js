import './App.css';
import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import PokemonPage from './pages/MyPokemon.jsx';
import PokemonListRoute from './pages/PokeListRoute.jsx';
import { PokemonContext } from './pages/PokemonContext';


import Navbar from './navbar'

const App = () => {
  const { getCatchFromStorage } = useContext(PokemonContext);
  // console.log(useContext(PokemonContext))
  useEffect(() => {
    let storagedPokemon = localStorage.getItem('my-pokemon-list')
    if(storagedPokemon){
      getCatchFromStorage(JSON.parse(storagedPokemon))
    }
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="container" style={{ height : '100vh'}}>
        <div className="row body-app h-full mt-2">
          <div className="col-12 p-0 m-0 h-full">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/poke-list" component={PokemonListRoute} />
              <Route path="/my-pokemon" component={PokemonPage} />
            </Switch>
          </div>
        </div>
      </div>
    </div>

  
  );
};

export default App;
