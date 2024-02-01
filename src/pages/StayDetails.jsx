import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { stayService } from '../services/stay.service.js'
import { stayService } from '../services/stay.service.local.js'



export function StayDetails() {
    // const [msg, setMsg] = useState(getEmptyMsg())
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





    if (!stay) return <div></div>
    return (
        <section className="stay-details">
            <h1>Stay Name: {stay.name}</h1>

        </section>
    )
}
