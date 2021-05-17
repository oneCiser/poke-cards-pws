import 'bootstrap/dist/css/bootstrap.min.css';
import './PokeCard.css';
import { Card, Carousel, Image, Tabs, Tab, Container, Row, Col} from 'react-bootstrap';
import {capitalizeTheFirstLetterOfEachWord} from '../../Utilities';
import { useEffect, useState } from 'react';
import Specie from './Specie';
import Type from '../Types/Type';
const InternalTypes = [
    {
        name:'Male',
        sprites:[
            'front_default',
            'back_default'
        ]
    },
    {
        name:'Female',
        sprites:[
            'front_female',
            'back_female'
        ]
    },
    {
        name:'Male Shiny',
        sprites:[
            'front_shiny',
            'back_shiny'
        ]
    },
    {
        name:'Female Shiny',
        sprites:[
            'front_shiny_female',
            'back_shiny_female'
        ]
    },
];
function PokeImg(props) {
    const {front, back} = props
    return (
        <>  
            
            <Carousel >
                {
                    front && 
                    <Carousel.Item key='front'>
                        <Image fluid className="poke-sprite" alt='Front'
                            src={front}/>
                    </Carousel.Item>
                }
                {
                    back && 
                    <Carousel.Item key='back'> 
                        <Image fluid className="poke-sprite" alt='Back'
                            src={back}/>
                    </Carousel.Item>
                }
            </Carousel>
        </>
    );
}
function PokeImgTypes(props) {
    const {sprites, name} = props;
    const types = InternalTypes.filter(type => sprites[type.sprites[0]]);
    
    return (
        <>
            <Tabs defaultActiveKey={InternalTypes[0].name} >
                {
                    types.map((type, index) => {
                        return (
                            
                            <Tab eventKey={type.name} title={type.name} key={`PokeImgTypes-${type.name}-${name}-${index}`}>
                                <PokeImg front={sprites[type.sprites[0]]} back={sprites[type.sprites[1]]} />                            
                            </Tab>
                        );
                    })
                }
            </Tabs>
        </>
    );
}
const getPokemon = (url, setPokemon) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        setPokemon(data);
    })
}


function PokeCard(props) {
    const {url, keyid} = props
    const [pokemon, setPokemon] = useState(null)
    useEffect(() => {
        getPokemon(url, setPokemon);
    },[url])
    return (
        <>
            {
                pokemon && 
                <Card style={{ width: '18rem'}} >
                    <Card.Header>
                        <strong>
                            {
                                capitalizeTheFirstLetterOfEachWord(pokemon?.name,'-')
                            }
                        </strong>

                    </Card.Header>
                    <Card.Img as={PokeImgTypes} sprites={pokemon.sprites} name={pokemon.name}/>
                    <Card.Body>
                        <Container>
                            <Row className='justify-content-md-center'>
                            {
                            pokemon.types.map((type, index) => {
                                return (
                                    <Col key={`${index}-div`}>
                                        <Type url={type.type.url} pokemon={pokemon.name} key={`${index}${keyid}`} keyid={`${index}${keyid}`}/>
                                        
                                    </Col>
                                    

                                );
                            })
                            }
                            </Row>

                        </Container>

                        <hr/>
                        <Specie url={pokemon.species.url} key={`${pokemon.species.name}-specie`}/>
                    </Card.Body>
                </Card>
            }
        </>
    );

}

export default PokeCard