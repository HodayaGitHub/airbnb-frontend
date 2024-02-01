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

    return (
        <section className='step2 steps-layout'>
            <MainHeader />

            <div className='container'>
                <h1>One last step and you are ready to host! </h1>

                <form>
                    <label>place name:
                        <input type="text" />
                    </label>
                    <label>price for a night :
                        <input type="text" />
                    </label>
                </form>

            </div>
        </section>
    );
}
