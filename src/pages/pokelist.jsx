// import Axios from "axios";
import React, { useEffect, useContext } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// import pokeball from "../images/pokeball.png";
import { PokemonContext } from "./PokemonContext";

// import TypesLogo from "./TypesLogo.jsx";

import Pagination from "@material-ui/lab/Pagination";
import client from "../apollo/clientSetup";
import { getPokemonList } from "../apollo/queries";
import qs from "query-string";
import { css, cx } from "@emotion/css";

const PokemonList = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const path = match.path;
    const queryPage = qs.parse(location.search).page
        ? qs.parse(location.search).page
        : 1;
    const limit = 12;
    const {
        pokemonTotalCount,
        pokemons,
        initPokemons,
        myPokemonList,
        loading,
        handleLoading
    } = useContext(PokemonContext);
    const totalpages = Math.ceil(pokemonTotalCount / limit);

    // const getPokemonDetails = async (data) => {
    //     let pokemonDetails = await Promise.all(
    //         data.map(async (pokemon) => {
    //             let res = Axios.get(pokemon.url);
    //             return res;
    //         })
    //     );
    //     // console.log(pokemonDetails);
    //     return pokemonDetails;
    // };

    // const renderPokemonTypes = (types) => {
    //     return <TypesLogo type={types} />;
    // };

    useEffect(() => {
        const apiGetPokemon = async () => {
            handleLoading(true);
            const { data } = await client.query({
                query: getPokemonList,
                variables: {
                    offset: (queryPage - 1) * limit,
                    limit: limit
                }
            });

            if (data) {
                const { pokemons } = data;
                // console.log(data);
                initPokemons(pokemons.results, pokemons.count);
                handleLoading(false);
            }
        };
        apiGetPokemon();
        // const getPokemons = async () => {
        //     handleLoading(true);
        //     try {
        //         let res = await Axios.get(
        //             `https://pokeapi.co/api/v2/pokemon?offset=${
        //                 (queryPage - 1) * limit
        //             }&limit=${limit}`
        //         );
        //         // console.log(res.data);

        //         let details = await getPokemonDetails(res.data.results);
        //         // console.log(details);

        //         let concat_array = res.data.results.map((data, id) => {
        //             return { ...data, details: { ...details[id].data } };
        //         });
        //         // console.log(concat_array);

        //         handleLoading(false);
        //         initPokemons(concat_array, res.data.count);
        //     } catch (err) {
        //         console.log(err);
        //         handleLoading(false);
        //     }
        // };

        // getPokemons();
    }, [queryPage]);

    const renderPokemon = ({ list }) => {
        const myList = {};
        for (let i = 0; i < myPokemonList.length; i++) {
            if (myList[myPokemonList[i].name]) {
                myList[myPokemonList[i].name]++;
            } else {
                myList[myPokemonList[i].name] = 1;
            }
        }
        const jsUcFirst = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        return list.map((pokemon, id) => {
            // console.log(pokemon);
            let { image } = pokemon;
            let totalOwned = myList[pokemon.name];
            return (
                <div
                    key={id}
                    className="col-xl-3 col-lg-4 col-md-6 mb-4 mx-3 mx-md-0 "
                >
                    <Link
                        to={`${path}/${pokemon.name}`}
                        style={{
                            textDecoration: "none",
                            color: "#010119"
                        }}
                    >
                        <div className="d-flex flex-row justify-content-center w-full">
                            <div className="pokemon-list custom-box">
                                {totalOwned ? (
                                    <div className="circle-owned">
                                        {totalOwned}x
                                    </div>
                                ) : null}

                                <div className="d-flex flex-column align-items-center">
                                    <img
                                        className="pokemon-front-image"
                                        src={image}
                                        alt={id}
                                        key={id}
                                    />
                                </div>
                            </div>
                        </div>
                        <h5 className="mt-2">{jsUcFirst(pokemon.name)}</h5>
                        {/* <div className="mb-4">
                            {renderPokemonTypes(details.types)}
                        </div> */}
                    </Link>
                </div>
            );
        });
    };

    const handleRoute = (url) => {
        history.push(url);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <ClipLoader size={150} />
            </div>
        );
    }

    return (
        <div className="container h-full">
            {/* <div className="d-flex flex-row justify-content-center">
                <div className="mb-4 d-block d-md-none ">
                    <Pagination
                        count={totalpages}
                        page={parseInt(queryPage)}
                        onChange={(e, page) =>
                            handleRoute(`${path}?page=${page}`, page)
                        }
                        color="secondary"
                        siblingCount={1}
                    />
                </div>
            </div> */}
            <div className="d-flex flex-column align-items-center h-full mt-4">
                {/* <div className="d-flex flex-row">
                    <img
                        src={pokeball}
                        width={"25px"}
                        height={"25px"}
                        className="mr-2"
                        alt="pokeball"
                    />
                    <div className="text-right">
                        Total Pokemon Owned : {totalPokemonOwned}
                    </div>
                </div> */}
                <h1 className="mt-3 mb-5">Pokémon List</h1>

                <div className="row mx-4 mx-md-0 " style={{ width: "100%" }}>
                    {renderPokemon({ list: pokemons })}
                </div>

                <div className="mt-4">
                    <Pagination
                        count={totalpages}
                        page={parseInt(queryPage)}
                        onChange={(e, page) =>
                            handleRoute(`${path}?page=${page}`, page)
                        }
                        color="secondary"
                        siblingCount={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default PokemonList;
