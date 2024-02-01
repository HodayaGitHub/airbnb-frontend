import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

// const { Link } = ReactRouterDOM
export function StayPreview({ stay }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    const fallbackImg = "https://res.cloudinary.com/drlt4yjnj/image/upload/v1704134518/on_error_nhlmpp.png"
    // console.log('loggedinUser', loggedinUser)
    return (
        <li className="stay-preview" key={stay._id}>


            <div className="img-container">
                {stay.imgUrls && stay.imgUrls.length > 0 ? (
                    stay.imgUrls.map((imgUrl, index) => (
                        <img
                            key={index}
                            className="stay-img"
                            src={imgUrl}
                            alt={stay.name}
                            onError={(event) => {
                                event.target.src = fallbackImg
                                event.onerror = null
                            }}
                        />
                    ))
                ) : (
                    <img
                        className="stay-img"
                        src={fallbackImg}
                        alt={stay.name}
                        onError={(event) => {
                            event.target.src = fallbackImg;
                            event.onerror = null;
                        }}
                    />
                )}
            </div>

            <div className="stay-desc">
                <Link to={`/stay/${stay._id}`} >
                    <h4>{stay.name}</h4>
                </Link>

                {/* TODO: calc the km between the searched location to the stay location */}
                <span>x Kilometres away</span>

                {/* TODO: show the available dates */}
                <span>Sep 29 - Oct 4</span>

                <span className="stay-price"><span>${stay.price.toLocaleString()}</span> night</span>

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

            </div>

        </li>
    )
}
