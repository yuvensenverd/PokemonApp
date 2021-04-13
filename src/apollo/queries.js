import { gql } from "@apollo/client";

export const getPokemonList = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                id
                url
                name
                image
            }
        }
    }
`;

export const getPokemonDetails = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id

            moves {
                move {
                    name
                }
            }
            name
            types {
                type {
                    name
                }
            }
            sprites {
                front_default
                back_default
                front_shiny
                back_shiny
            }
            abilities {
                ability {
                    name
                }
            }
            stats {
                base_stat
                effort
                stat {
                    name
                }
            }
        }
    }
`;

// export const queryPokemonMoves = gql`
//     query moves(
//         $move1: String!
//         $move2: String!
//         $move3: String!
//         $move4: String!
//     ) {
//         move1: move(move: $move1) {
//             response
//         }
//         move2: move(move: $move2) {
//             response
//         }
//         move3: move(move: $move3) {
//             response
//         }
//         move4: move(move: $move4) {
//             response
//         }
//     }
// `;
