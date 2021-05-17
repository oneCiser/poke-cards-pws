import 'bootstrap/dist/css/bootstrap.min.css';
import {TypesColours} from '../../Types';
import { capitalizeFirstLetter} from '../../Utilities';
import {Popover, Badge, Overlay} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
const getType = (url, setType) => {
    fetch(url)
    .then(response => response.json())
    .then(data => setType(data))
}
function Type(props){
    const {url, pokemon, keyid} = props;
    const [show, setShow] = useState(false);
    const [type, setType] = useState(null);
    const target = useRef(null);
    
    
    
    useEffect(() => {
        // let isMounted = true; 
        // fetch(url)
        // .then(response => response.json())
        // .then(data => {
        //     if (isMounted) setType(data)})
        getType(url, setType)
    },[url]);
    const resists = type ? [...type.damage_relations.half_damage_from,...type.damage_relations.no_damage_from] : [];
    const weaks = type ? type.damage_relations.double_damage_from : [];
    
    return (
        <div >
            {   type &&
                <Badge pill style={{backgroundColor:TypesColours[type.name]}} key={`${type.name}-Badge`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} ref={target}>
                {
                    capitalizeFirstLetter(type.name)
                }
                </Badge>
            }

            {
                type &&
                <Overlay  placement='auto' flip={true}   target={target.current} show={show} >
                    {({ placement, scheduleUpdate, arrowProps, show: _show, popper, ...props }) =>
                    (<Popover id="popover-basic" {...props} >
                            <Popover.Title style={{backgroundColor:TypesColours[type.name]}}>
                                <strong>
                                    {
                                        capitalizeFirstLetter(type.name)
                                    }
                                </strong>

                            </Popover.Title>
                            <Popover.Content>
                                <strong>
                                    Resists:
                                </strong>
                                <br/>
                                {
                                    resists.map((resist, index) =>{
                                            return (
                                                
                                                    <Badge pill style={{backgroundColor:TypesColours[resist.name]}} key={`${index}-${pokemon}-${resist.name}-Badge-resist-${keyid}`}>
                                                        {
                                                            capitalizeFirstLetter(resist.name)
                                                        }
                                                    </Badge>
                                                
                                                )
                                    })
                                }
                                <hr/>
                                <strong>
                                    Weak to:
                                </strong>
                                <br/>
                                {
                                    weaks.map((weak,index) =>{
                                        return (
                                            
                                                <Badge pill style={{backgroundColor:TypesColours[weak.name]}} key={`${index}-${pokemon}-${weak.name}-Badge-weak`}>
                                                    {
                                                        capitalizeFirstLetter(weak.name)
                                                    }
                                                </Badge>
                                            

                                        )
                                    })
                                }
                            </Popover.Content>
                        </Popover>     
                                )}
                </Overlay>
                
            }
        </div>
    );

}

export default Type