import { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { stayService } from "../../services/stay.service.local.js"
import { NavRightIcon, NavLeftIcon } from '../../services/icons.service.jsx'


export function LabelsFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

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
    }, [filterByToEdit])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 14,
            slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 8,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 360 },
            items: 5,
            slidesToSlide: 2
        }
    }

    function handleLabelPick(value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, label: value }))
        onSetFilter({ ...filterByToEdit })
    }


    return (


        <Carousel
            responsive={responsive}
            autoPlay={false}
            swipeable={true}
            draggable={true}
            keyBoardControl
            infinite={false}
            partialVisible={false}
        >
            {/* <div className="labels-container parent"> */}
            {Object.entries(labels).map(([key, value]) => (
                <div className="label-item slider" key={key} onClick={() => handleLabelPick(value.title)}>
                    <img className="label-icon" src={value.imgUrl} alt={value.label} />
                    <span>{value.title}</span>
                </div>
            ))}
            {/* </div> */}
        </Carousel >



    )
}