import Axios from "axios";
import React, { useEffect, useContext } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import pokeball from "../images/pokeball.png";
import { PokemonContext } from "./PokemonContext";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Pagination from "@material-ui/lab/Pagination";
import qs from "query-string";

const PokemonList = () => {
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const path = match.path;
    const queryPage = qs.parse(location.search).page
        ? qs.parse(location.search).page
        : 1;
    const limit = 10;

    //   const [page, setPage] = useState(queryPage)
    const {
        pokemonTotalCount,
        pokemons,
        initPokemons,
        myPokemonList,
        loading,
        handleLoading
    } = useContext(PokemonContext);
    let totalPokemonOwned = myPokemonList.length;
    const totalpages = Math.ceil(pokemonTotalCount / limit);
    //   console.log(pokemonTotalCount)

    useEffect(() => {
        const getPokemons = () => {
            handleLoading(true);
            console.log(loading);
            Axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                    (queryPage - 1) * limit
                }&limit=${limit}`
            )
                .then((res) => {
                    handleLoading(false);
                    initPokemons(res.data.results, res.data.count);
                })
                .catch((err) => {
                    handleLoading(false);
                    console.log(err);
                });
        };

        getPokemons();
    }, [queryPage]);

    const renderPokemon = ({ list }) => {
        return list.map((pokemon, id) => {
            return (
                <div key={id}>
                    <Link
                        to={`${path}/${pokemon.name}`}
                        style={{ textDecoration: "none", color: "#010119" }}
                    >
                        <ListItem
                            button
                            style={{
                                border: "1px solid #b3b3b3",
                                width: "200px"
                            }}
                        >
                            <ListItemText
                                primary={`${
                                    (queryPage - 1) * limit + id + 1 + ". "
                                }${pokemon.name}`}
                            />
                        </ListItem>
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
            <div className="d-flex flex-column justify-content-center align-items-center h-full">
                <div className="d-flex flex-row">
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
                </div>
                <h1 className="mt-3 mb-3">Pokémon List</h1>

                <List component="nav" aria-label="secondary mailbox folders">
                    {renderPokemon({ list: pokemons })}
                </List>
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
