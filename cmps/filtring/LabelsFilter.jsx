import { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
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

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 16,
            // slidesToSlide: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 464 },
            items: 2,
            slidesToSlide: 1
        }
    }


    return (

        <>
            {/* <div className="carousel-button-group"> // remember to give it position:absolute
                <ButtonOne className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} />
                <ButtonTwo onClick={() => next()} />
                <ButtonThree onClick={() => goToSlide(currentSlide + 1)}> Go to any slide </ButtonThree>
            </div> */}


            <Carousel
                // customButtonGroup={<ButtonGroup />}
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                <div className="labels-container parent">
                    {Object.entries(labels).map(([key, value]) => (
                        <div className="label-item slider" key={key}>
                            <img className="label-icon" src={value.imgUrl} alt={value.label} />
                            <span>{value.title}</span>
                        </div>
                    ))}
                </div>
            </Carousel >
        </>

    )
}