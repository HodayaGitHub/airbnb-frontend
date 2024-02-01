import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader';
import { MinusIcon, PlusIcon } from '../../services/icons.service';

export function Page5({ stay, updateStay }) {
  const navigate = useNavigate();
  const [stayToEdit, setStayEdit] = useState(stay);

  const [detailCounts, setDetailCounts] = useState({
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathroom: 0,
  });

  useEffect(() => {
    setStayEdit((prevStay) => {
      const updatedStay = { ...prevStay, beds: detailCounts.beds };

      // detailCounts.Gues
      return updatedStay
    });
  }, [detailCounts])

  useEffect(() => {
    updateStay(stayToEdit);
  }, [stayToEdit]);

  function updateDetailCount(option, amount) {
    setDetailCounts((prevCounts) => ({
      ...prevCounts,
      [option]: Math.max(0, prevCounts[option] + amount),
    }));
  }

  const placeDetails = {
    guests: 'Guests',
    bedrooms: 'Bedrooms',
    beds: 'Beds',
    bathroom: 'Bathroom',
  };

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
    </section>
  );
}
