import React from 'react'

export function ButtonHover({ buttonContent, onSubmit }) {
    const handleClick = (event) => {
        if (onSubmit) {
            onSubmit(event);
        }
    };

    return (
        <div className="btn-container-with-style" onClick={handleClick}>
            {[...Array(99)].map((_, index) => (
                <div key={index} className="cell"></div>
            ))}
            <div className="content">
                <button className="action-btn">
                    <span className="span-btn">{buttonContent}</span>
                </button>
            </div>
        </div>
    )
}