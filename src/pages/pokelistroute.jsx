import React, { useState } from 'react';
import PokeDetails from './PokeDetails';
import PokeList from './PokeList';
import MyPokemon from './MyPokemon';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default ({}) => {
  const match = useRouteMatch();
  const path = match.path

  return (
    <div className="h-full py-4">
      {/* <h1>This is Poke List</h1> */}
        <Switch>
          <Route exact path={`${path}`} component={PokeList}/>
          <Route path={`${path}/my-pokemon`} component={MyPokemon}/>
          <Route path={`${path}/:pokemon`} component={PokeDetails}/>
        </Switch>
    </div>
  );
};
