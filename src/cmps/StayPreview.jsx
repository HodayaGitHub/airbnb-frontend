import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { ControlledCarousel } from './ControlledCarousel'
import { useState } from 'react'


export function StayPreview({ stay, onRemoveStay }) {
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()

    // function onStayClick(){
    //     navigate(`/stay/${stay._id}`)
    // }
    return (

        <li className="stay-preview" key={stay._id} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <Link className='linki' target={"_blank"} to={`/stay/${stay._id}?`}>
                <div className="img-container" >
                    <ControlledCarousel stay={stay} isHover={isHover} />
                </div>
                <div className="stay-desc">
                    <h4 className='stay-name'>{stay.name}</h4>


                    {/* TODO: calc the km between the searched location to the stay location */}
                    <span className='stay-distance'>x Kilometres away</span>

                    {/* TODO: show the available dates */}
                    <span className='stay-date'>Sep 29 - Oct 4</span>

                    <span className="stay-price"><span>${stay.price.toLocaleString()}</span> night</span>

                    <div className="actions-btns-container">
                        <button> <Link className='details-btn' to={`/stay/details/${stay._id}`}>Details</Link></button>
                        <button onClick={() => onRemoveStay(stay._id)}> remove</button>

                    </div>

                </div>
            </Link>
        </li>


    )
}
