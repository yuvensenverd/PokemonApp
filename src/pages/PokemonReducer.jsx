import { useReducer } from "react";
import {
    GET_INIT_POKEMONS,
    CATCH_POKEMON,
    GET_CATCHED_FROM_STORAGE,
    RELEASE_POKEMON,
    HANDLE_LOADING
} from "./types";

const getInitPokemons = (pokemons, count, state) => ({
    ...state,
    pokemons: pokemons,
    pokemonTotalCount: count
});

const catchPokemon = (pokemonCatched, state) => {
    localStorage.setItem(
        "my-pokemon-list",
        JSON.stringify([...state.myPokemonList, pokemonCatched])
    );
    return {
        ...state,
        myPokemonList: [...state.myPokemonList, pokemonCatched]
    };
};

const releasePokemon = (index, state) => {
    let newArr = [...state.myPokemonList];
    newArr.splice(index, 1);
    localStorage.setItem("my-pokemon-list", JSON.stringify([...newArr]));

    return {
        ...state,
        myPokemonList: [...newArr]
    };
};

const getMyPokemonList = (pokemonList, state) => {
    return {
        ...state,
        pokemons: state.pokemons,
        pokemonTotalCount: state.pokemonTotalCount,
        myPokemonList: pokemonList
    };
};

const handleLoading = (loading, state) => {
    return {
        ...state,
        loading: loading
    };
};

const pokemonReducer = (state, action) => {
    switch (action.type) {
        case GET_INIT_POKEMONS:
            return getInitPokemons(action.pokemons, action.count, state);
        case CATCH_POKEMON:
            return catchPokemon(action.pokemonCatched, state);
        case HANDLE_LOADING:
            return handleLoading(action.loading, state);
        case RELEASE_POKEMON:
            return releasePokemon(action.index, state);
        case GET_CATCHED_FROM_STORAGE:
            return getMyPokemonList(action.pokemonList, state);
        default:
            return state;
    }
};

export const usePokemonReducer = () =>
    useReducer(pokemonReducer, {
        pokemons: [],
        myPokemonList: [],
        pokemonTotalCount: 0,
        loading: false
    });
