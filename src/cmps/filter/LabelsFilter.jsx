import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { stayService } from "../../services/stay.service.js"
import * as labelsSvg from '../../services/labels.icons.service.jsx'
import * as React from 'react'

export function LabelsFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [labels, setLabels] = useState([])

    useEffect(() => {
        fetchLabels()
    }, [])

    useEffect(() => {
        if (filterByToEdit !== filterBy) {
            onSetFilter(filterByToEdit)
        }
    }, [filterByToEdit])

    function handleLabelPick(value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, label: value }))
    }

    function fetchLabels() {
        const fetchedLabels = stayService.getLabels()
        setLabels(fetchedLabels)
    }



    const responsive = {
        desktopLarge: {
            breakpoint: { max: 3000, min: 1600 },
            items: 18,
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
            items: 7,
            slidesToSlide: 2
        },
        mobileLarge: {
            breakpoint: { max: 768, min: 480 },
            items: 4,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 480, min: 0 },
            items: 4,
            slidesToSlide: 3
        }
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
                <div className={`label-item slider  ${filterByToEdit.label === value.title ? 'selected-label' : ''}`} key={key} onClick={() => handleLabelPick(value.title)}>
                    <span className={`label-icon `}>
                        {labelsSvg[value.svg] ? React.createElement(labelsSvg[value.svg]) : ''}
                    </span>
                    <span className="label-title">
                        {value.title}
                    </span>
                </div>
            ))}
        </Carousel >
    )
}