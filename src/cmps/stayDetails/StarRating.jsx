
export function StarRating({ rate }) {
    const roundedRate = Math.round(rate);

    const stars = Array.from({ length: 5 }, (_, index) => (
        <span
            key={index}
            className={`star ${index < roundedRate ? 'filled' : ''}`}
        >
            ★
        </span>
    ));

    return (
        <div className="star-rating">
            {stars}
        </div>
    );
};