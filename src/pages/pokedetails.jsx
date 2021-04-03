import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import Axios from 'axios';
import Pokemon from './Pokemon.jsx';
import { PokemonContext } from './PokemonContext';
import {ClipLoader} from "react-spinners";

export default ({}) => {
  const [pokemonData, setPokemonData] = useState({})
  const [dataInvalid, setDataInvalid] = useState(false)
  const { loading, handleLoading } = useContext(PokemonContext);
  const match = useRouteMatch();
  const { pokemon } = match.params
  
  useEffect(() => {
    const getPokemons = () => {
      handleLoading(true)
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => {
            handleLoading(false)
            setPokemonData(res)
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

  if(loading){
    return (
      <div className="loader-container">
        <ClipLoader size={150}/>
      </div>
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
