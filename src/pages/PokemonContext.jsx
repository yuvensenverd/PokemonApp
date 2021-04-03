import React, { createContext } from "react";
import { usePokemonReducer } from "./PokemonReducer";
import {
    HANDLE_LOADING,
    GET_INIT_POKEMONS,
    CATCH_POKEMON,
    GET_CATCHED_FROM_STORAGE,
    RELEASE_POKEMON
} from "./types";

const PokemonContext = createContext();

const PokemonProvider = (props) => {
    const [state, dispatch] = usePokemonReducer();
    const { pokemons, pokemonTotalCount, myPokemonList, loading } = state;
    const catchPokemon = (pokemonCatched) =>
        dispatch({ type: CATCH_POKEMON, pokemonCatched });
    const handleLoading = (loading) =>
        dispatch({ type: HANDLE_LOADING, loading });
    const releasePokemon = (index) =>
        dispatch({ type: RELEASE_POKEMON, index });
    const getCatchFromStorage = (pokemonList) =>
        dispatch({ type: GET_CATCHED_FROM_STORAGE, pokemonList });
    const initPokemons = (pokemons, count) =>
        dispatch({ type: GET_INIT_POKEMONS, pokemons, count });

    const providerValue = {
        pokemons,
        myPokemonList,
        pokemonTotalCount,
        loading,
        handleLoading,
        releasePokemon,
        catchPokemon,
        getCatchFromStorage,
        initPokemons
    };

    return (
        <PokemonContext.Provider value={providerValue}>
            {props.children}
        </PokemonContext.Provider>
    );
};

export { PokemonContext, PokemonProvider };
