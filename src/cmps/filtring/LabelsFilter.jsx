import { useEffect, useState } from 'react'

import { stayService } from "../../services/stay.service.local.js"


export function LabelsFilter({ stays }) {

    const [labels, setLabels] = useState([])

    useEffect(() => {

        async function fetchLabels() {
            try {
                const fetchedLabels = await stayService.getLabels()
                setLabels(fetchedLabels)
            } catch (error) {
                console.error('Error fetching labels:', error)
            }
        }

        fetchLabels()
    }, [])


    return (
        <>
            <div className="labels-container">
                {Object.entries(labels).map(([key, value]) => (
                    <div className="label-item" key={key}>
                        <img className="label-icon" src={value.imgUrl} alt={value.label} />
                        <span>{value.title}</span>
                    </div>
                ))}
            </div>
        </>

    )
}