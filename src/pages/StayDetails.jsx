import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { stayService } from '../services/stay.service.js'
import { stayService } from '../services/stay.service.local.js'


function getEmptyMsg() {
    return {
        txt: '',
    }
}

export function StayDetails() {
    const [msg, setMsg] = useState(getEmptyMsg())
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            // showErrorMsg('Cant load stay')
            navigate('/stay')
        }
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await stayService.addMsg(stay._id, msg.txt)
        setStay((prevStay) => ({
            ...prevStay,
            msgs: [...(prevStay.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        // showSuccessMsg('Msg saved!')
    }

    async function onRemoveMsg(msgId) {
        const removedMsgId = await stayService.removeMsg(stay._id, msgId)
        setStay((prevStay) => ({
            ...prevStay,
            msgs: prevStay.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        // showSuccessMsg('Msg removed!')
    }



    if (!stay) return <div>Loading...</div>
    return (
        <section className="stay-details">
            <h1>{stay.name}</h1>
            <h5>Price: ${stay.price}</h5>
            <img src={stay.src} alt="" />
            <ul>
                {stay.msgs &&
                    stay.msgs.map((msg) => (
                        <li key={msg.id}>
                            By: {msg.by.fullname} - {msg.txt}
                            <button
                                type="button"
                                onClick={() => onRemoveMsg(msg.id)}>
                                X
                            </button>
                        </li>
                    ))}
            </ul>

            {/* <form className="login-form" onSubmit={onSaveMsg}>
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    placeholder="Username"
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Send</button>
            </form> */}
            
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
                cumque tempore, aperiam sed dolorum rem!
            </p>

            <Review></Review>
            <button> <Link className='back-btn' to={`/stay`}>Back</Link></button>
        </section>
    )
}
