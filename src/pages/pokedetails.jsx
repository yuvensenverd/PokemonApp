import React, { useState, useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import Axios from 'axios';
import Pokemon from './Pokemon.jsx'

export default ({}) => {
  const [pokemonData, setPokemonData] = useState({})
  const [dataInvalid, setDataInvalid] = useState(false)

//   Pokemon Detail page; should show a picture of the Pokemon with its moves
// and types (this information is from the API, feel free to add more information
// on the Pokemon if you want to). The mandatory thing is that there should be
// a button to catch the Pokemon, (success probability is 50%), if success then
// the user can give the Pokemon a nickname and add that Pokemon to `My
// Pokemon List’. You can catch the same pokemon multiple times but need to
// give a different nickname for each pokemon.

  const match = useRouteMatch();
  const { pokemon } = match.params
  useEffect(() => {
    const getPokemons = () => {
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => {
          console.log(res)
            setPokemonData(res.data)
        })
        .catch(err => {
            setDataInvalid(true)
        });
    };
     getPokemons();
  }, [pokemon]);

  if(dataInvalid){
    return (
      <Redirect to="/poke-list"/>
    )
  }
  return (
    <div className="d-flex flex-column ">
      <h1 className="text-center">Pokémon Info</h1>
      <div className="py-3">
        <Pokemon data={pokemonData} />
      </div>
    </div>
  );
};
