import { useEffect, useState, useRef } from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { stayService } from "../../services/stay.service.js"
import * as labelsSvg from '../../services/labels.icons.service.jsx'
import * as React from 'react'

export function LabelsFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [labels, setLabels] = useState([])

    useEffect(() => {
        fetchLabels()
    }, [])

    useEffect(() => {
        onSetFilter({ ...filterByToEdit })
    }, [filterByToEdit])

    function fetchLabels() {
        const fetchedLabels = stayService.getLabels()
        setLabels(fetchedLabels)
    }


    const responsive = {
        desktopLarge: {
            breakpoint: { max: 3000, min: 1600 },
            items: 16,
            slidesToSlide: 4
        },
        desktop: {
            breakpoint: { max: 1600, min: 1200 },
            items: 12,
            slidesToSlide: 3
        },
        laptop: {
            breakpoint: { max: 1200, min: 992 },
            items: 10,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 992, min: 768 },
            items: 8,
            slidesToSlide: 2
        },
        mobileLarge: {
            breakpoint: { max: 768, min: 480 },
            items: 5,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 480, min: 0 },
            items: 3,
            slidesToSlide: 1
        }
    }

    function handleLabelPick(value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, label: value }))
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
        // ref={containerRef}

        >
            {Object.entries(labels).map(([key, value]) => (
                <div className="label-item slider" key={key} onClick={() => handleLabelPick(value.title)}>
                    <span className="label-icon">
                        {labelsSvg[value.svg] ? React.createElement(labelsSvg[value.svg]) : ''}
                    </span>
                    <span className="label-title">{value.title}</span>
                </div>
            ))}
        </Carousel >



    )
}