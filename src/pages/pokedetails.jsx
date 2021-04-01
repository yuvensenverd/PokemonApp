import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Axios from 'axios';

export default ({}) => {

  const match = useRouteMatch();
  const { pokemon } = match.params
  useEffect(() => {
    const getPokemons = async () => {
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => {
            console.log(res)
         
        })
        .catch(err => {
            console.log(err);
        });
    };
     getPokemons();
  }, [pokemon]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>This is {pokemon}</h1>
    </div>
  );
};
