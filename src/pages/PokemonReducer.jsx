import { useReducer } from 'react';
import { ADD_POKEMON, GET_INIT_POKEMONS } from './types';

// const getCapturedPokemons = (capturedPokemons, releasedPokemon) =>
//   capturedPokemons.filter(pokemon => pokemon !== releasedPokemon)

// const releasePokemon = (releasedPokemon, state) => ({
//   pokemons: [...state.pokemons, releasedPokemon],
//   capturedPokemons: getCapturedPokemons(state.capturedPokemons, releasedPokemon)
// });

// const getPokemonsList = (pokemons, capturedPokemon) =>
//   pokemons.filter(pokemon => pokemon !== capturedPokemon)

// const capturePokemon = (pokemon, state) => ({
//   pokemons: getPokemonsList(state.pokemons, pokemon),
//   capturedPokemons: [...state.capturedPokemons, pokemon]
// });

const addPokemon = (pokemon, state) => ({
  pokemons: [...state.pokemons, pokemon],
  capturedPokemons: state.capturedPokemons
});

const getInitPokemons = (pokemons, count, state) => ({

  pokemons: pokemons,
  capturedPokemons: state.capturedPokemons,
  pokemonTotalCount : count
});

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case ADD_POKEMON:
      return addPokemon(action.pokemon, state);
    case GET_INIT_POKEMONS:
      return getInitPokemons(action.pokemons, action.count, state);
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemons: [],
    capturedPokemons: [],
    pokemonTotalCount : 0
  });
