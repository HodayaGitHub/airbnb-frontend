import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader';
import { MinusIcon, PlusIcon } from '../../services/icons.service';

export function Page5({ goToNextPage }) {
  const navigate = useNavigate();

  const placeDetails = {
    Guests: 'Guests',
    Bedrooms: 'Bedrooms',
    Beds: 'Beds',
    Bathroom: 'Bathroom',
  };

  const [detailCounts, setDetailCounts] = useState({
    Guests: 0,
    Bedrooms: 0,
    Beds: 0,
    Bathroom: 0,
  });

  function updateDetailCount(option, amount) {
    setDetailCounts((prevCounts) => ({
      ...prevCounts,
      [option]: Math.max(0, prevCounts[option] + amount),
    }));
  }

  return (
    <section className='step5'>

      <MainHeader />

      <div className='step4-container'>

        <div className="guest-wrapper">
          <h1>Share some basics about your place</h1>
          <p className="sec-title">You'll add more details later, like bed types.</p>
          {Object.entries(placeDetails).map(([guestType, guestDescription]) => (
            <div className="guest-item" key={guestType}>
              <div className="guests-info">
                <span className="guest-desc">
                  {guestDescription}
                </span>
              </div>

              <div className="guest-counter-btns">
                <button
                  className="guest-counter-btn"
                  onClick={() => updateDetailCount(guestType, -1)}
                  style={{ cursor: detailCounts[guestType] <= 0 ? 'not-allowed' : 'pointer' }}
                  disabled={detailCounts[guestType] <= 0}
                >
                  <MinusIcon />
                </button>
                <span className="counter"> {detailCounts[guestType]}</span>

                <button
                  className="guest-counter-btn"
                  onClick={() => updateDetailCount(guestType, 1)}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>

          ))}
        </div>
      </div>
      <button className="add-stay-next-page" onClick={goToNextPage}>Next</button>
    </section>
  );
}
