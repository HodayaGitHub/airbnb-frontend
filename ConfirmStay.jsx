import { useNavigate, useParams } from 'react-router-dom'
import leftArow from '../../src/assets/img/svgs/left-arrow.svg'
import TextField from '@mui/material/TextField'
import { credit } from '../../src/data/creditcard'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { stayService } from '../services/stay.service.local'
import { stayService } from '../services/stay.service'
import { orderService } from '../services/order.service'
import { MainHeader } from '../cmps/MainHeader.jsx'

export function ConfirmPage() {
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [card, setCard] = useState(credit[0])
    const order = useSelector(storeState => storeState.orderModule.order) || JSON.parse(localStorage.getItem('PRE_ORDER'))
    const [stay, setStay] = useState(null)

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log(err);
        }
    }


    function handleCreditChange(target) {
        const field = target.id
        const value = target.value
        setCard((prevCard) => ({ ...prevCard, [field]: value }))
    }
    async function saveOrder(order) {
        await orderService.save(order)
        localStorage.removeItem('PRE_ORDER')
        navigate('/')
    }

    if (!stay || !order) return <div className='loader'></div>
    return (
        <>
            <MainHeader />
            <div className='confirm-page'>
                <div className='title'>
                    <button className='return-btn' onClick={() => navigate(`/stay/${stayId}`)}><img src={leftArow} /></button>
                    <h1>Confirm and pay</h1>
                </div>
                <div className='reservation'>
                    <div className='reservation-info'>
                        <section className='trip-info'>
                            <h2>Your trip</h2>
                            <div className="trip-dates">
                                <h3>Dates</h3>
                                <div className='order-attribute'>
                                    <span>{order.checkIn} - {order.checkOut}</span>
                                    <button className='edit-btn'>Edit</button>
                                </div>
                            </div>
                            <div className="trip-guest">
                                <h3>Guests</h3>
                                <div className='order-attribute'>
                                    <span>  {order.totalGuests} guest{order.totalGuests !== 1 && <span>s</span>}
                                        {order.guests.infants !== 0 && <> , {order.guests.infants} infant{order.guests.infants !== 1 && <span>s</span>}</>}
                                    </span>
                                    <button className='edit-btn'>Edit</button>
                                </div>
                            </div>
                        </section>

                        <section className='payment'>
                            <div className='title'>
                                <h2>pay with</h2>
                                <img src='../../src\assets\img\svgs\creditcards.PNG' />
                            </div>
                            <form className='billing-form' onSubmit={(ev) => { ev.preventDefault() }}>
                                <TextField className="billing number" id="number" onChange={(ev) => handleCreditChange(ev.target)} label="Credit card" value={card.number || ''} placeholder='0000 0000 0000 0000' variant="standard" inputProps={{ maxLength: 16 }} />
                                <div>
                                    <TextField className="billing exp-date" id="expDate" onChange={(ev) => handleCreditChange(ev.target)} label="Expiration date" value={card.expDate || ''} placeholder='MM/YY' variant="standard" inputProps={{ maxLength: 5 }} />
                                    <TextField className="billing cvv" id="cvv" onChange={(ev) => handleCreditChange(ev.target)} label="CVV" placeholder='123' value={card.cvv || ''} maxRows={1} variant="standard" inputProps={{ maxLength: 3 }} />
                                </div>
                            </form>
                        </section>

                        <section className='cancelation'>
                            <h2>Cancellation policy</h2>
                            <span>This reservation is non-refundable. </span>
                        </section>
                        <section className='Ground rules'>
                            <h2>Required for your trip</h2>
                            <span>We ask every guest to remember a few simple things about what makes a great guest.</span>
                            <ul>
                                <li>Follow the house rules</li>
                                <li>Treat your Host’s home like your own</li>
                            </ul>
                        </section>
                        <p>By selecting the button below, I agree to the <a href="#">Host's House Rules</a>,
                            <a href="#">Ground rules for guests</a>, <a href="#">Airbnb's Rebooking and Refund Policy</a>,
                            and that Airbnb can <a href="#">charge my payment method</a> if I’m responsible for damage.</p>

                        <button className='confirm-btn' onClick={() => {
                            saveOrder(order)
                        }}>Confirm and pay</button>
                    </div>

                    <div className='oreder-preview'>
                        {stay && <section className='stay-info'>
                            <img className='stay-img' src={stay.imgUrls[1]} />
                            <span className='stay-name'>{stay.name}</span>
                            <span className='reviews'>{stay.reviews.length} review{stay.reviews.length > 1 && <span>s</span>}</span>
                        </section>}
                        <div className='price-details'>
                            <h2>Price details</h2>
                            <ul>
                                {stay?.price && <li>${stay.price} x {order.totalNights} nights <span>${stay.price * order.totalNights}</span></li>}
                                <li><a href="#">Airbnb service fee</a> <span>$200</span></li>
                                {stay?.price && <li><h3>total <a href="#">.(USD).</a></h3> <h3>${stay.price * order.totalNights + 200}</h3></li>}
                            </ul>
                        </div>


                    </div>

                </div>
            </div >
        </>
    )
}