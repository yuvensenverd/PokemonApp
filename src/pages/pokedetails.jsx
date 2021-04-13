import React, { useState, useEffect, useContext } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
// import Axios from "axios";
import Pokemon from "./Pokemon.jsx";
import { PokemonContext } from "./PokemonContext";
import { ClipLoader } from "react-spinners";
import client from "../apollo/clientSetup";
import { getPokemonDetails } from "../apollo/queries";

const PokemonDetails = () => {
    const [pokemonData, setPokemonData] = useState({});
    // const [pokemonSkills, setPokemonSkills] = useState([]);
    const [dataInvalid, setDataInvalid] = useState(false);
    const { loading, handleLoading } = useContext(PokemonContext);
    const match = useRouteMatch();
    const { pokemon } = match.params;

    // const getPokemonSkills = async (data) => {
    //     let pokemon_skills = await Promise.all(
    //         data.map(async (skills) => {
    //             let res = Axios.get(skills.ability.url);
    //             return res;
    //         })
    //     );
    //     console.log(pokemon_skills);
    // };

    useEffect(() => {
        const apolloGetPokemon = async (name) => {
            handleLoading(true);
            try {
                const { data: dataPokemon } = await client.query({
                    query: getPokemonDetails,
                    variables: {
                        name: name
                    }
                });
                // console.log("----", dataPokemon);
                handleLoading(false);
                if (dataPokemon.pokemon.id) {
                    setPokemonData(dataPokemon);
                } else {
                    setDataInvalid(true);
                }
                // console.log(dataPokemon);
            } catch (err) {
                handleLoading(false);
                setDataInvalid(true);
            }
        };
        apolloGetPokemon(pokemon);
        // const getPokemons = async () => {
        //     handleLoading(true);
        //     try {
        //         let res = await Axios.get(
        //             `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        //         );

        //         // await getPokemonSkills(res.data.abilities);
        //         // handleLoading(false);
        //         // setPokemonData(res);
        //     } catch (err) {
        //         handleLoading(false);
        //         setDataInvalid(true);
        //     }
        // };

        // getPokemons();
    }, [pokemon]);

    if (dataInvalid) {
        return <Redirect to="/poke-list" />;
    }

    if (loading) {
        return (
            <div className="loader-container">
                <ClipLoader size={150} />
            </div>
        );
    }
    // console.log(pokemonData);
    return (
        <div className="d-flex flex-column ">
            <h1 className="text-center">Pokémon Info</h1>
            <div className="py-3">
                <Pokemon pokemon={pokemonData} />
            </div>
        </div>
    );
};

export default PokemonDetails;
