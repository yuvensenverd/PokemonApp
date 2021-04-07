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
import { Redirect } from "react-router";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const Pokemon = ({ data }) => {
    const [value, setValue] = useState(0);
    const [movesListPage, setMovesListPage] = useState(1);
    const [goToMyPokemon, setGoToMyPokemon] = useState(false);
    const { myPokemonList, catchPokemon } = useContext(PokemonContext);
    const movesListLimit = 10;
    const handleChange = (e, value) => {
        setValue(value);
    };
    if (!_.isEmpty(data)) {
        const { sprites, moves, types, name, id, abilities, stats } = data.data;
        const { url } = data.config;

        const onCatchClick = () => {
            let num = Math.random();

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
                        if (results2.isConfirmed) {
                            const data = {
                                nickname: results2.value,
                                avatar: sprites.front_default,
                                name,
                                url
                            };
                            catchPokemon(data);
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text:
                                    "You can now view your new pokemon in your list!",
                                showConfirmButton: true,
                                confirmButtonText: "My Pokemon Page",
                                showCancelButton: true,
                                cancelButtonText: "Ok",
                                cancelButtonColor: "#e74c3c"
                            }).then((results2) => {
                                if (results2.isConfirmed) {
                                    setGoToMyPokemon(true);
                                }
                            });
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

            const printCarouselSprites = (sprites) => {
                let jsx = [];
                for (let i = 0; i < Object.keys(sprites).length; i++) {
                    if (
                        sprites[Object.keys(sprites)[i]] !== null &&
                        typeof sprites[Object.keys(sprites)[i]] === "string"
                    ) {
                        if (Object.keys(sprites)[i] === "front_default") {
                            //FRONT DEFAULT ALWAYS AT 0 INDEX
                            jsx.unshift(
                                <img
                                    src={sprites[Object.keys(sprites)[i]]}
                                    height={150}
                                    width={150}
                                    alt={Object.keys(sprites)[i]}
                                />
                            );
                        } else {
                            jsx.push(
                                <img
                                    src={sprites[Object.keys(sprites)[i]]}
                                    height={150}
                                    width={150}
                                    alt={Object.keys(sprites)[i]}
                                />
                            );
                        }
                    }
                }
                return jsx;
            };

            // console.log(imagesList);
            return (
                <div className="pokemon-cards">
                    <div className="d-flex flex-column">
                        <h4 className="text-center">ID{printOrder(id)}</h4>
                        <div className="d-flex flex-row justify-content-center">
                            {/* <img
                                src={images.front_default}
                                height={150}
                                width={150}
                                alt="pokemon_front_image"
                            /> */}
                            <Carousel
                                disableEdgeSwiping
                                height={150}
                                width={150}
                                dragging={true}
                                autoplay={true}
                                autoplayInterval={4000}
                                wrapAround
                                withoutControls
                                swiping={true}
                                style={{ outline: "none" }}
                            >
                                {printCarouselSprites(images)}
                            </Carousel>
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
                    <div style={{ outline: "none" }}>
                        {abilities.map((val, id) => {
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
                    style={{ outline: "none" }}
                >
                    {abilitiesContent(abilities)}
                    <div style={{ outline: "none" }}>
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

        if (goToMyPokemon) {
            return <Redirect to="/poke-list/my-pokemon" />;
        }

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
