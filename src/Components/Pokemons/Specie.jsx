import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const getSpecies = (url, setSpecies) => {
    fetch(url)
    .then(res => res.json())
    .then(data => setSpecies(data));
}
function Specie(props){
    const url = props.url;
    const [species, setSpecies] = useState(null);
    useEffect(() => {
        getSpecies(url, setSpecies)        
    },[url])
    const description = species ? species.flavor_text_entries.filter(text => text.language.name === 'en') : null;

    return (
        <>
            <p>
                {   species &&
                    description[0].flavor_text
                }
            </p>
        </>
    );
}

export default Specie;