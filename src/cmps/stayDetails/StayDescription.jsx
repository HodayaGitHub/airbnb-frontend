
import * as labelsSvg from '../../services/labels.icons.service.jsx';
import * as React from 'react';
import { stayService } from '../../services/stay.service.js';

import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import key from '../../assets/img/svgs/key.svg';
import chat from '../../assets/img/svgs/chat.svg';
import locationImg from '../../assets/img/svgs/location.svg';
import { AMENTITIES } from '../../data/stay.details.amentities.js';

export function StayDescription({ stay, hostAvatarUrl}) {

    return (
        <>
            <section className='stay-information'>
                <h1>
                    {stay.type === 'House' ? 'Entire ' + stay.type : stay.type} in{' '}
                    {stay.loc.city}, {stay.loc.country}
                </h1>
                <p className='stay-contents'>
                    {stay.capacity} guest
                    {stay.capacity !== 1 && <span>s</span>} • {stay.bedrooms} bedroom
                    {stay.bedrooms !== 1 && <span>s</span>} • {' '}
                    {stay.bedrooms !== 0 ? stay.beds : 1} bed
                    {stay.bedrooms > 1 && stay.beds > 1 && <span>s</span>} •{' '}
                    {stay.bathrooms} bathroom{stay.bathrooms !== 1 && <span>s</span>}
                </p>
                <p className='stay-rating'>
                    🟊 {stayService.calculateAverageRating(stay).toFixed(1)} •{' '}
                    <span>{stay.reviews.length} reviews</span>
                </p>
            </section>

            <section className='hostedBy'>
                <div className='hostedBy-img'>
                    <Avatar alt='Remy Sharp' src={hostAvatarUrl || stay.host.pictureUrl} />
                </div>
                <div className='hostedBy-name'>
                    <h2>{stay.host.fullname}</h2>
                    <p>{stay.hostingYears} years hosting</p>
                </div>
            </section>

            <section className='guest-experiences'>
                <div className='box box1'>
                    <div className='svg-container'>
                        <img src={key} alt='' />
                    </div>
                    <div className='box-text'>
                        <h2>Great check-in experience</h2>
                        <p>
                            95% of recent guests gave the check-in process a 5-star rating
                        </p>
                    </div>
                </div>

                <div className='box box2'>
                    <div className='svg-container'>
                        <img src={chat} alt='' />
                    </div>
                    <div className='box-text'>
                        <h2>Great communication</h2>
                        <p>
                            100% of recent guests rated Cristina 5-star in communication.
                        </p>
                    </div>
                </div>

                <div className='box box3'>
                    <div className='svg-container'>
                        <img src={locationImg} alt='' />
                    </div>
                    <div className='box-text'>
                        <h2>Great location</h2>
                        <p>100% of recent guests gave the location a 5-star rating.</p>
                    </div>
                </div>
            </section>

            <section className='stay-descripiton'>{stay.summary}</section>
            <section className='stay-amenities'>
                <h4>What this place offers</h4>
                <div className='amenities-container'>
                    {AMENTITIES.map((amentitie, index) => (
                        <div className="icons-wrap" key={index}>
                            <span className={`label-icon`}>
                                {labelsSvg[amentitie.svg] ? React.createElement(labelsSvg[amentitie.svg]) : ''}
                            </span>
                            <span className="label-title">
                                {amentitie.title}
                            </span>
                        </div>
                    ))}
                </div>

            </section>
        </>
    )
}