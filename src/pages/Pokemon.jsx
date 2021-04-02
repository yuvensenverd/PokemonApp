import React, {useState} from 'react';
import _ from 'lodash';
import pokeball from '../images/pokeball.png'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import Carousel from 'nuka-carousel'
import Typography from '@material-ui/core/Typography';
import TypesLogo from './TypesLogo.jsx';
import Swal from 'sweetalert2';



export default ({ data }) => {

    const [value, setValue] = useState(0)

    const handleChange = (e, value) => {
        console.log(value)
        setValue(value)
    }
    const handleChangeIndex = (value) =>{
        setValue(value)
    }

    if(!_.isEmpty(data)){

        // console.log('masuks')
        const { sprites, moves, types, name, order, abilities, stats } = data 

        const catchPokemon = () => {
            let num = Math.random()
            if(num > 0.5){
                Swal.fire({
                    title: `${name} was caught!`,
                    text: ` Give your new ${name} a nickname`,
                    imageUrl: `${sprites.front_default}`,
                    imageWidth: 250,
                    imageHeight: 200,
                    imageAlt: 'name',
                    // title: ``,
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText : 'Confirm'
                    
                })
            }else {
                window.alert('failed!')
            }
        }
      
        const renderPokemonCards = (images, name) => {
            const printOrder=(num)=> {
                num = num.toString();
                while (num.length < 3) num = "0" + num;
                return num;
            }
            return(
              <div className="pokemon-cards">
                  <div className="d-flex flex-column">
                      <h4 className="text-center">ID{printOrder(order)}</h4>
                      <div className="d-flex flex-row justify-content-center">
                        <img src={images.front_default} height={150} width={150}/>
                      </div>
                      <h4 className="text-center">{name}</h4>
                  </div>
              </div>
            )
        }

        const renderCatchButton = () => {
            return (
                <div className="catch-button mt-3" onClick={()=>catchPokemon()}>
                    <img src={pokeball} height={35} width={35} className="mr-2"/>
                    Catch!
                </div>
            )
        }

        const renderPokemonTypes = (types) => {
            console.log(types)
            return (
                <TypesLogo type={types}/>
            )
        }

        

        const pokemonHeaderTabs = () => {
            return (
                <React.Fragment>

                    <Paper style={{
                        flexGrow : 1
                    }}>
                        <Tabs
                        style={{
                            backgroundColor : '#2f2f2f',
                            color : '#ffffff',
                            fontWeight : 'bolder'
                            
                        }}
                        value={value}
                        onChange={handleChange}
                        // indicatorColor="primary"
                        // textColor="primary"
                        variant="fullWidth"
                        >
                            <Tab label="Abilities" />
                            <Tab label="Moves"/>
                          
                        </Tabs>
                        
                    </Paper>
                </React.Fragment>
            )
        }

        const pokemonContent = (abilities, moves) => {

            const abilitiesContent = (abilities) => {
                return (
                    <div>
                        { 
                            abilities.map((val,id)=>{
                                //val.ability.url for details
                                return (
                                    <div className="mb-2">
                                        <h4>{id+1+'. '}{val.ability.name}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
                
            }
       
            const movesContent = (moves) => {
                return (
                    <div>
                        { 
                            moves.map((val,id)=>{
                                //val.ability.url for details
                                return (
                                    <div className="mb-2">
                                        <h4>{id+1+'. '}{val.move.name}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            return (
                <Carousel disableEdgeSwiping withoutControls  slideIndex={value}>
                  
                    {abilitiesContent(abilities)}
                    {movesContent(moves)}
                    
                </Carousel>
            )

        }
      
        return (
          <div className=''>
              <div className="row m-0">
                  <div className="col-md-4">
                      {renderPokemonCards(sprites, name)}
                      {renderCatchButton()}
                  </div>
                  <div className="col-md-8">
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
    return null
};
