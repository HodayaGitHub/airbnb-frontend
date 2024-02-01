import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainHeader } from '../../cmps/MainHeader.jsx';
import { labels } from '../../data/labels-new-stay.js';
import * as labelsSvg from '../../services/labels.icons.new.stay.jsx';
import * as React from 'react';

export function Page8({ updateStay, stay }) {
    const [stayToEdit, setStayEdit] = useState(stay);

    useEffect(() => {
        updateStay(stayToEdit);
    }, [stayToEdit]);

    function submitForm(name, price) {
        setStayEdit((prevStay) => {
            const updatedStay = { ...prevStay, name: name, price: price };

            // detailCounts.Gues
            return updatedStay
        });
    }

    function formatCurrency(event) {
        // Remove any non-digit characters
        let inputValue = event.target.value.replace(/[^\d]/g, '');

        // Add the dollar sign at the beginning
    

        // Update the input value
        setStayEdit((prevStay) => ({
            ...prevStay,
            price: inputValue
        }));
    }

    return (
        <section className='step8 steps-layout'>
            <MainHeader />

            <div className='container'>
                <h1>Now, set your price and name for your place </h1>
                <h3>You can change it anytime.</h3>
                <h3>You will be promoted to the top of the table in your area for the first 3 days! </h3>

                <form>
                    <input className='placeName' type="text" placeholder='Place Name' />
                    <input className='placePrice' type="text" placeholder='$0' onChange={formatCurrency} value={stayToEdit.price} />
                </form>

            </div>
        </section>
    );
}
