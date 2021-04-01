import React, { createContext } from 'react';
import { usePokemonReducer } from './PokemonReducer';
import { CAPTURE, RELEASE, ADD_POKEMON, GET_INIT_POKEMONS } from './types';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons, pokemonTotalCount } = state;

//   const capture = (pokemon) => () => dispatch({ type: CAPTURE, pokemon });
//   const release = (pokemon) => () => dispatch({ type: RELEASE, pokemon });
  const addPokemon = (pokemon) => dispatch({ type: ADD_POKEMON, pokemon });
  const initPokemons = (pokemons, count) => dispatch({ type: GET_INIT_POKEMONS, pokemons, count});

  const providerValue = {
    pokemons,
    capturedPokemons,
    pokemonTotalCount,
    // capture,
    // release,
    addPokemon,
    initPokemons
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  )
};

export { PokemonContext, PokemonProvider };
