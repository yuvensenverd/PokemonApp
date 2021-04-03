import { useContext } from 'react'
import { PokemonContext } from './pages/PokemonContext'
import { AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Pokeball from './images/pokeball.png';
import Pikachu from './images/pikachu.png';





export default ({}) => {
  const { myPokemonList } = useContext(PokemonContext);
    return (
        <AppBar position="static" style={{backgroundColor : '#343a40'}}>
            <Toolbar>
              <div className="d-flex flex-row w-full">
                <Link to='/' style={{textDecoration : 'none', color : '#ffffff'}}>
                  <div className="d-flex flex-row">
                    <img src={Pikachu} width={'40px'} height={'30px'} className="mr-2"/>
                    <Typography variant="h6" >
                      Home
                    </Typography>
                  </div>
                </Link>
                <div className="ml-auto d-flex flex-row justify-content-center align-items-center">
                 <Link to='/poke-list/my-pokemon' style={{textDecoration : 'none', color : '#ffffff'}}>
                  <img src={Pokeball} height={'25px'} width={'25px'} className="mr-2"/>
                  Total Owned : {myPokemonList.length}
                  </Link>
                </div>
              </div>
            </Toolbar>
        </AppBar>
    )
}