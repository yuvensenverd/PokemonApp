import React, { useContext } from "react";
import { PokemonContext } from "./PokemonContext";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Swal from "sweetalert2";

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
                                className="mr-2"
                                alt="pokemonimg"
                            />
                            <div className="d-flex flex-column justify-content-center">
                                <h4> {val.nickname}</h4>
                                <div>{val.name}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-center ml-auto pr-5">
                                <RemoveCircleIcon
                                    fontSize={"25px"}
                                    htmlColor={"#541a1c"}
                                    className="cursor-pointer"
                                    onClick={() => onReleasePokemonClick(id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="container">
            <h1 className="mb-4 px-3">My Pokemon</h1>
            <div className="row">{renderPokemonList()}</div>
        </div>
    );
};

export default MyPokemon;
