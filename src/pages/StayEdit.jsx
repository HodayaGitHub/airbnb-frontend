
import { useNavigate, useParams } from 'react-router'
import { stayService } from '../services/stay.service.local.js'
import { useEffect, useState } from 'react'
import { addStay } from '../store/actions/stay.actions.js'
import { uploadService } from '../services/upload.service.js'
import { Page1 } from './AddStay/Page1'
import { Page2 } from './AddStay/Page2'
import { Page3 } from './AddStay/Page3'
import { Page4 } from './AddStay/Page4'
import { Page5 } from './AddStay/Page5'
import { Page6 } from './AddStay/Page6'
import { Page7 } from './AddStay/Page7'
import { Page8 } from './AddStay/Page8'
import { Page9 } from './AddStay/page9.jsx'
import { Progress } from 'flowbite-react';
import { MainHeader } from '../cmps/MainHeader.jsx'

export function StayEdit() {
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const [amentity, setAmentity] = useState([])
    const [label, setLabel] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const amentities = stayService.getAmentities()
    const labels = stayService.getLocalLabels()

    const [currentPage, setCurrentPage] = useState(1)

    let STAY = stayService.getEmptyStay()


    useEffect(() => {
        // Displaying image previews when the images state changes
    }, [stay]);



    const renderCurrentPage = () => {
        switch (currentPage) {
            case 1:
                return <Page1 updateStay={updateStay} />;
            case 2:
                return <Page2 handleLablesChange={handleLablesChange} updateStay={updateStay} stay={stay} />;
            case 3:
                return <Page3 updateStay={updateStay} stay={stay} />;
            case 4:
                return <Page4 goToNextPage={goToNextPage} />;
            case 5:
                return <Page5 updateStay={updateStay} stay={stay} />;
            case 6:
                return <Page6 goToNextPage={goToNextPage} />;
            case 7:
                return <Page7 stay={stay} />;
            case 8:
                return <Page8 updateStay={updateStay} stay={stay} />;
            case 9:
                return <Page9 updateStay={updateStay} stay={stay} />;
            default:
                return null;
        }
    }


    function updateStay(newDetails) {
        setStay((prevStay) => {
            const updatedStay = { ...prevStay, ...newDetails };
            console.log('original stay', updatedStay);
            return updatedStay;
        });
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'range') {
            value = +value
        }
        else if (target.type === 'radio') {
            value = target.id

        }

        setStay(prevStay => ({ ...prevStay, [field]: value }))
    }

    function handlePriceChange({ target }) {
        let value = +target.value
        setStay(prevStay => ({ ...prevStay, price: value }))
    }

    async function onAddStay(stay) {
        try {
            await addStay(stay)
            navigate('/')
        }
        catch (err) {
            console.log('Cannot add stay', err)
        }
    }

    // function goToNextPage() {
    //     setCurrentPage((prevPage) => prevPage + 1);
    // };


    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(ev)
        console.log(secure_url)
        let imgUrls = stay.imgUrls
        imgUrls.push(secure_url)
        setStay(prevStay => ({ ...prevStay, imgUrls }))
        setIsUploading(false)
    }

    function handleLablesChange(isChecked, labelName) {
        if (isChecked) {
            setLabel((prevLabel) => [...prevLabel, labelName]);
        } else {
            setLabel((prevLabel) => prevLabel.filter((name) => name !== labelName));
        }
        console.log(stay, labelName)
    }

    const totalPages = 9
    const progress = Math.ceil((currentPage / totalPages) * 100);


    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    function handleSubmit() {
        // e.preventDefault()
        // if (!stay.name || !stay.price) return
        onAddStay(stay)
    }

    return (

        <>
            {/* <MainHeader /> */}
            {renderCurrentPage()}

            <section className="progress-bar-footer main-layout full">
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${progress}%`, backgroundColor: 'black' }}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>


                <div className='nav-btn-container'>
                    {currentPage > 1 && (
                        <div className='navigation-btns'>
                            <button className="add-stay-navigate-btn" onClick={goToPrevPage}>Back</button>
                        </div>
                    )}
                    {currentPage === 1 && (
                        <div>
                            {/* Placeholder content */}
                        </div>
                    )}

                    {/* Next button */}
                    {/* {currentPage <= totalPages && (
                        <div className='navigation-btns'>
                            <button className="add-stay-navigate-btn" onClick={goToNextPage}>Next</button>
                        </div>
                    )} */}

                    {currentPage <= totalPages && (
                        <div className='navigation-btns'>
                            {currentPage === totalPages ? (
                                <button className="add-stay-navigate-btn" onClick={handleSubmit}>Submit</button>
                            ) : (
                                <button className="add-stay-navigate-btn" onClick={goToNextPage}>Next</button>
                            )}
                        </div>
                    )}
                </div>



                {/* Back button placeholder */}

            </section>
        </>
    )

}
