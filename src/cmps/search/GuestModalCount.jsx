
import { MinusIcon, PlusIcon } from '../../services/icons.service';
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { ServiceAnimalModal } from './ServiceAnimalModal.jsx'

export function GuestCountModal(updateGuestCount) {

    const [isPetsModalOpen, setIsPetsModalOpen] = useState(false)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy);

    const GUEST_DESC = {
        adults: 'Ages 13 or above',
        children: 'Ages 2-12',
        infants: 'Under 2',
        pets: 'Bringing a service animal?',
    }

    function serviceAnimalModalOpen() {
        setIsPetsModalOpen(true)
    }

    function serviceAnimalModalClose() {
        setIsPetsModalOpen(false)
    }


    return (
        <>
            {isPetsModalOpen && <ServiceAnimalModal serviceAnimalModalClose={serviceAnimalModalClose} />}

            <div className="guest-modal">
                <div className="guest-wrapper">
                    {Object.entries(filterBy.guests).map(([guestType, guestAmount], index, array) => (
                        <div className="guest-container" key={guestType}>

                            <div className="guest-item">
                                <div className="guests-info">
                                    <span className="guest-title">{guestType}</span>
                                    <span className={`guest-desc ${index === array.length - 1 ? 'service-animal' : ''}`}
                                        onClick={index === array.length - 1 ? serviceAnimalModalOpen : null}>
                                        {GUEST_DESC[guestType]}
                                    </span>
                                </div>

                                <div className="guest-counter-btns">
                                    <button className="guest-counter-btn" onClick={(event) => updateGuestCount(event, guestType, -1)}
                                        style={{ cursor: guestAmount <= 0 ? 'not-allowed' : 'pointer' }}
                                        disabled={guestAmount <= 0}>
                                        <MinusIcon />
                                    </button>
                                    <span className="counter">{guestAmount}</span>
                                    <button className="guest-counter-btn" onClick={(event) => updateGuestCount(event, guestType, 1)}>
                                        <PlusIcon />
                                    </button>
                                </div>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>

    )


}