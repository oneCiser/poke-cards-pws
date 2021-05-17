import 'bootstrap/dist/css/bootstrap.min.css';
import PokeCard from './PokeCard';
import { CardColumns } from 'react-bootstrap';

function PokeCards(props){
    const {pokemons, keyid} = props;
    return (
        <>
            <CardColumns>
                {
                    pokemons.map((pokemon, index) => {
                        return (
                            <PokeCard url={pokemon.url} key={`${keyid}${index+1}`} keyid={`${keyid}${index}`}/>
                        );
                    })
                }
            </CardColumns>
        </>
    );
}
export default PokeCards;