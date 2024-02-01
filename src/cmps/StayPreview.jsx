import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

// const { Link } = ReactRouterDOM
export function StayPreview({ stay }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    const fallbackImg = "https://res.cloudinary.com/drlt4yjnj/image/upload/v1704134518/on_error_nhlmpp.png"
    // console.log('loggedinUser', loggedinUser)
    return (
        <li className="stay-preview" key={stay._id}>

            <Link to={`/stay/${stay._id}`} >
                <h4>{stay.name}</h4>
            </Link>

            <div className="img-container">
                <img className="stay-img"
                    src={stay.src || fallbackImg}
                    alt={stay.name}
                    onError={event => {
                        event.target.src = { fallbackImg }
                        event.onerror = null
                    }}
                />
            </div>

            <span className="stay-price">Price: <span>${stay.price.toLocaleString()}</span></span>

            <div className="actions-btns-container">
                <button> <Link className='details-btn' to={`/stay/details/${stay._id}`}>Details</Link></button>
                {loggedinUser && loggedinUser.isAdmin &&
                    <>
                        <button onClick={() => {
                            onRemoveToy(stay._id)
                        }}>x</button>
                        <button onClick={() => {
                            onEditToy(stay)
                        }}>Edit</button>
                    </>
                }
            </div>
        </li>
    )
}
