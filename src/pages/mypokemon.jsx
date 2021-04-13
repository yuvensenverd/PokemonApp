import React, { useContext } from "react";
import { PokemonContext } from "./PokemonContext";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyPokemon = () => {
    const { myPokemonList, releasePokemon } = useContext(PokemonContext);
    const onReleasePokemonClick = (id) => {
        Swal.fire({
            title: `Are you sure to release ${myPokemonList[id].nickname}?`,
            text: "Pokemon will be removed from the list",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Release"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    releasePokemon(id);
                    Swal.fire(
                        "Released!",
                        "Your pokemon has been released.",
                        "success"
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire("Error!", "Something is wrong :( .", "error");
            });
    };
    const renderPokemonList = () => {
        if (myPokemonList.length > 0) {
            return myPokemonList.map((val, id) => {
                return (
                    <div className="col-md-6 px-4" key={id}>
                        <div className="d-flex flex-row align-items-center">
                            <h4 className="mr-3">{id + 1}</h4>
                            <div className="pokemon-list-box d-flex flex-row w-full">
                                <img
                                    src={val.avatar}
                                    height={100}
                                    width={100}
                                    className="mr-1"
                                    alt="pokemonimg"
                                />
                                <div className="d-flex flex-column justify-content-center">
                                    <h4> {val.nickname}</h4>
                                    <div>{val.name}</div>
                                </div>
                                <div className="d-flex flex-column justify-content-center ml-auto pr-4">
                                    <RemoveCircleIcon
                                        // fontSize={"25px"}
                                        htmlColor={"#541a1c"}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            onReleasePokemonClick(id)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div className="px-4">
                    <h4>List is empty :( Start Catching more pokemon!</h4>
                    <div className="mt-4">
                        <Link
                            to="/poke-list"
                            style={{ textDecoration: "none", color: "#ffffff" }}
                        >
                            <div className="btn btn-primary">View Pokemon</div>
                        </Link>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="container">
            <h1 className="mb-4">My Pokemon</h1>
            <div className="row">{renderPokemonList()}</div>
        </div>
    );
};

export default MyPokemon;
