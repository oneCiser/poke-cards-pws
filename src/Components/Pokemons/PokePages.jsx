import { Pagination, Navbar, Nav,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PokePages.css'
import PokeCards from './PokeCards';
import { useEffect, useState } from 'react';
const getCurrent = (setCurrent, current) => {
    const value = current > 0 ? current - 1 : 0
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(value) * 20}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const max = parseInt(data.count / 20)
            const currentTmp = {
                current: current > 0 ? (current <= max ? current : max) : 1,
                count: max,
                next: data.next,
                previus: data.previus,
                pokemons: data.results
            }
            localStorage.setItem('page',currentTmp.current);
            setCurrent(currentTmp);
        })
}
function range(size, startAt = 0, max) {
    if (startAt == 1) {
        return [...Array(size).keys()].map(i => i + startAt + 1);
    }
    else if (startAt >= max || startAt + size >= max) {
        return [...Array(size).keys()].map(i => i + max - size);
    }
    else {
        return [...Array(size).keys()].map(i => i + startAt);
    }




}
async function pokeNotification(pokemons) {
    const randomItem = Math.floor(Math.random() * pokemons.length);
    const pokemon = await (await fetch(pokemons[randomItem].url)).json();
    console.log(pokemon);
    const notifTitle = pokemon.name;
    const notifBody = `Exp ${pokemon.base_experience}`;
    const notifImg = new Image;
    notifImg.src = pokemon.sprites.front_default;
    const options = {
      body: notifBody,
      icon: pokemon.sprites.front_default,
    };
    new Notification(notifTitle, options);
}
function PokePages(props) {
    const { start } = props;
    const [current, setCurrent] = useState({ current: start, count: 0, next: null, previus: null, pokemons: null });
    useEffect(() => {
        getCurrent(setCurrent, current.current);
        
    }, [start])
    const numberRange = range(10, current.current, current.count);
    if(!localStorage.getItem('requestPermission') && current.pokemons){
        Notification.requestPermission()
        .then((result) => {
            if (result === 'granted'){
                pokeNotification(current.pokemons)
            }
        })
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <img src={window.location.origin + '/logo.png'} style={{width:'75px',height:'75px'}}/>
                <Nav className="mr-auto">
                </Nav>
            </Navbar>
            <div className='cards-scroll'>
            {
                current.pokemons &&
                <PokeCards pokemons={current.pokemons} keyid='1'/>
            }
            </div>
            <div className='pages'>
            {
                current.pokemons &&
                <Pagination >
                    <Pagination.First onClick={() => {getCurrent(setCurrent, 1)}} />
                    <Pagination.Prev onClick={() => {getCurrent(setCurrent, current.current - 1)}}/>
                    <Pagination.Item
                        key='1'
                        onClick={(e) => { getCurrent(setCurrent, parseInt(e.currentTarget.id)) }}
                        active={current.current === 1}>{1}</Pagination.Item>
                    {
                        current.current > 2 &&
                        <Pagination.Ellipsis />
                    }
                    {
                        numberRange.map((item, index) => {
                            return (
                                
                                    <Pagination.Item
                                        id={item}
                                        onClick={(e) => { getCurrent(setCurrent, parseInt(e.currentTarget.id)) }}
                                        active={current.current === item} key={`${item}${index}`}>{item}</Pagination.Item>
                                
                            );
                        })
                    }
                    {
                        current.current < current.count - 10 &&
                        <Pagination.Ellipsis />
                    }
                    <Pagination.Item
                        key={current.count}
                        onClick={(e) => { getCurrent(setCurrent, current.count) }}
                        active={current.current === current.count}>{current.count}</Pagination.Item>
                    <Pagination.Next onClick={() => {getCurrent(setCurrent, current.current + 1)}}/>
                    <Pagination.Last 
                        onClick={() => {getCurrent(setCurrent, current.count)}}/>
                </Pagination>
            }
            </div>
            
        </>
    );
}

export default PokePages;