import React from 'react'

export function ButtonHover({ buttonContent }) {

    return (
        <div className="btn-container-with-style">
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