import { stayService } from '../../services/stay.service.js';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { StarRating } from './StarRating.jsx'


export function StayReviews({ stay, avatarUrls }) {
    const [reviewsToShow, setReviewsToShow] = useState(6);


    return (

        <section className='stay-reviews'>
            <h2>
                🟊 {stayService.calculateAverageRating(stay).toFixed(1)} • {stay.reviews.length} {' '} 
                review
                {stay.reviews.length !== 1 && <span>s</span>}
            </h2>

            <div className='reviews'>
                {stay.reviews.slice(0, reviewsToShow).map((review, index) => {

                    return (
                        <div className='review' key={index}>
                            <div className='review-by'>
                                <span>
                                    <Avatar
                                        className='avatar'
                                        alt={review.by.fullname}
                                        src={avatarUrls[index]}
                                    />
                                    <h3 className='name'>{review.by.fullname}</h3>
                                </span>

                                <span>
                                    <StarRating rate={review.rate} />
                                    <p className='review-date'>
                                        {new Date(review.at).toLocaleString('en', { month: 'short' })}{' '}{''}
                                        {new Date(review.at).getFullYear()}
                                    </p>
                                </span>
                            </div>
                            <p className='text'>{review.txt}</p>
                        </div>
                    );
                })}
                {stay.reviews.length > reviewsToShow && (
                    <button className='showMore-btn' onClick={() => setReviewsToShow(reviewsToShow + 5)}>
                        Show More Reviews
                    </button>
                )}
            </div>
        </section>


    )

}