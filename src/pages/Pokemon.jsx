import React, { useState, useContext } from "react";
import _ from "lodash";
import pokeball from "../images/pokeball.png";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Carousel from "nuka-carousel";
import TypesLogo from "./TypesLogo.jsx";
import Swal from "sweetalert2";
import Pagination from "@material-ui/lab/Pagination";
import StatRating from "./StatRatings";
import { PokemonContext } from "./PokemonContext";

const Pokemon = ({ data }) => {
    const [value, setValue] = useState(0);
    const [movesListPage, setMovesListPage] = useState(1);
    const { myPokemonList, catchPokemon } = useContext(PokemonContext);
    const movesListLimit = 10;
    const handleChange = (e, value) => {
        // console.log(value)
        setValue(value);
    };
    if (!_.isEmpty(data)) {
        const { sprites, moves, types, name, id, abilities, stats } = data.data;
        const { url } = data.config;

        const onCatchClick = () => {
            let num = Math.random();
            // let timerInterval;
            Swal.fire({
                title: "Catching...",
                imageUrl: `${pokeball}`,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "pokeball",
                timer: 1000,
                showCloseButton: false,
                showConfirmButton: false
            }).then(() => {
                if (num > 0.5) {
                    Swal.fire({
                        title: `${name} was caught!`,
                        text: ` Give your new ${name} a nickname`,
                        imageUrl: `${sprites.front_default}`,
                        imageWidth: 250,
                        imageHeight: 200,
                        imageAlt: "name",
                        // title: ``,
                        input: "text",
                        inputAttributes: {
                            autocapitalize: "off"
                        },
                        showCancelButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Confirm",
                        preConfirm: (value) => {
                            let listName = myPokemonList.map((val) =>
                                val.nickname.toLowerCase()
                            );
                            if (value.length <= 0) {
                                Swal.showValidationMessage(
                                    `please choose a nickname for your new pokemon!`
                                );
                            }
                            if (listName.indexOf(value.toLowerCase()) !== -1) {
                                Swal.showValidationMessage(
                                    `nickname ${value} is already in use! please choose a different nickname!`
                                );
                            }
                        }
                    }).then((results2) => {
                        console.log(results2);
                        if (results2.isConfirmed) {
                            const data = {
                                nickname: results2.value,
                                avatar: sprites.front_default,
                                name,
                                url
                            };

                            // console.log(listName)
                            // if(listName.indexOf(data.nickname) !== -1){
                            //     window.alert(`nickname ${data.nickname} is already in use! please choose a different nickname!`)

                            // }else {
                            catchPokemon(data);
                            Swal.fire(
                                "Success!",
                                "You can now view your new pokemon in your list!",
                                "success"
                            );
                            // }
                        }
                    });
                } else {
                    Swal.fire(
                        "Catch Failed :( ",
                        "Unfortunate! Keep trying!",
                        "error"
                    );
                }
            });
        };

        const renderPokemonCards = (images, name) => {
            const printOrder = (num) => {
                num = num.toString();
                while (num.length < 4) num = "0" + num;
                return num;
            };
            return (
                <div className="pokemon-cards">
                    <div className="d-flex flex-column">
                        <h4 className="text-center">ID{printOrder(id)}</h4>
                        <div className="d-flex flex-row justify-content-center">
                            <img
                                src={images.front_default}
                                height={150}
                                width={150}
                                alt="pokemon_front_image"
                            />
                        </div>
                        <h4 className="text-center">{name}</h4>
                    </div>
                </div>
            );
        };

        const renderCatchButton = () => {
            return (
                <div
                    className="catch-button mt-3"
                    onClick={() => onCatchClick()}
                >
                    <img
                        src={pokeball}
                        height={35}
                        width={35}
                        className="mr-2"
                        alt="pokeball"
                    />
                    Catch!
                </div>
            );
        };

        const renderPokemonStat = (stats) => {
            return (
                <div>
                    <h3 className="my-3">Stats</h3>
                    <StatRating stat={stats} />
                </div>
            );
        };

        const renderPokemonTypes = (types) => {
            // console.log(types)
            return <TypesLogo type={types} />;
        };

        const pokemonHeaderTabs = () => {
            return (
                <React.Fragment>
                    <Paper
                        style={{
                            flexGrow: 1
                        }}
                    >
                        <Tabs
                            style={{
                                backgroundColor: "#2f2f2f",
                                color: "#ffffff",
                                fontWeight: "bolder"
                            }}
                            value={value}
                            onChange={handleChange}
                            // indicatorColor="primary"
                            // textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Abilities" />
                            <Tab label="Moves" />
                        </Tabs>
                    </Paper>
                </React.Fragment>
            );
        };

        const pokemonContent = (abilities, moves) => {
            const abilitiesContent = (abilities) => {
                return (
                    <div>
                        {abilities.map((val, id) => {
                            //val.ability.url for details
                            return (
                                <div className="mb-2" key={id}>
                                    <h4>
                                        {id + 1 + ". "}
                                        {val.ability.name}
                                    </h4>
                                </div>
                            );
                        })}
                    </div>
                );
            };

            const movesContent = (moves) => {
                data = moves.slice(
                    (movesListPage - 1) * movesListLimit,
                    movesListPage * movesListLimit
                );
                return (
                    <div>
                        {data.map((val, id) => {
                            //val.ability.url for details
                            return (
                                <div className="mb-2" key={id}>
                                    <h5>
                                        {(movesListPage - 1) * 10 +
                                            (id + 1) +
                                            ". "}
                                        {val.move.name}
                                    </h5>
                                </div>
                            );
                        })}
                    </div>
                );
            };
            return (
                <Carousel
                    disableEdgeSwiping
                    withoutControls
                    slideIndex={value}
                    height={"auto"}
                    dragging={false}
                    swiping={false}
                    style={{ outline: 0 }}
                >
                    {abilitiesContent(abilities)}
                    <div>
                        {movesContent(moves)}
                        <div className="mt-3 d-flex flex-row justify-content-center align-items-center">
                            <Pagination
                                count={Math.ceil(moves.length / movesListLimit)}
                                page={movesListPage}
                                onChange={(e, page) => setMovesListPage(page)}
                                color="secondary"
                                siblingCount={1}
                            />
                        </div>
                    </div>
                </Carousel>
            );
        };

        return (
            <div className="">
                <div className="row m-0">
                    <div className="col-md-4">
                        {renderPokemonCards(sprites, name)}
                        {renderCatchButton()}
                        {renderPokemonStat(stats)}
                    </div>
                    <div
                        className="col-md-8 pb-4"
                        style={{ backgroundColor: "#eeeeee" }}
                    >
                        {renderPokemonTypes(types)}
                        {pokemonHeaderTabs()}
                        <div className="mt-4">
                            {pokemonContent(abilities, moves)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default Pokemon;
