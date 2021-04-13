import "./App.css";
import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home";
import PokemonPage from "./pages/MyPokemon.jsx";
import PokemonListRoute from "./pages/PokeListRoute.jsx";
import { PokemonContext } from "./pages/PokemonContext";

import Navbar from "./navbar";

const App = () => {
    const { getCatchFromStorage } = useContext(PokemonContext);
    // console.log(useContext(PokemonContext))
    useEffect(() => {
        let storagedPokemon = localStorage.getItem("my-pokemon-list");
        if (storagedPokemon) {
            getCatchFromStorage(JSON.parse(storagedPokemon));
        }
    }, []);

    return (
        <div style={{ backgroundColor: "#eeeeee" }}>
            <Navbar />
            <div
                className="container"
                style={{ minHeight: "100vh", maxHeight: "auto" }}
            >
                <div className="row body-app h-full mt-2">
                    <div
                        className="col-12 pr-0 pl-0 pb-0 m-0 h-full "
                        style={{ paddingTop: "64px" }}
                    >
                        {/* 64px for navbar height */}
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route
                                path="/poke-list"
                                component={PokemonListRoute}
                            />
                            <Route path="/my-pokemon" component={PokemonPage} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
