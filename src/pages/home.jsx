import React from "react";
import { Link } from "react-router-dom";
import pokeball from "../images/pokeball.png";
import backpack from "../images/backpack.png";

const Home = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "80%" }}
        >
            <h1 className="mb-4">Pokémon App</h1>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="row m-0">
                    <div className="col-md-6 mb-3">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Link
                                to="/poke-list"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="home-menu list">
                                    <img
                                        src={pokeball}
                                        height={"50px"}
                                        width={"50px"}
                                        alt="pokeball"
                                    />
                                    <h4 className="mt-3">Pokémon List</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Link
                                to="/poke-list/my-pokemon"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="home-menu mypokemon">
                                    <img
                                        src={backpack}
                                        height={"50px"}
                                        width={"50px"}
                                        alt="backpack"
                                    />
                                    <h4 className="mt-3">My Pokémon</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
