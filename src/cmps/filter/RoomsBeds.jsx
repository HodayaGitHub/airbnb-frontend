import React from 'react';

export function RoomsBeds({ category, selectedRoomFilters, handleRoomFilterClick }) {
    const numbers = Array.from({ length: 8 }, (_, index) => index + 1)
    
    return (
        <>

            <div className="rooms-option">
                <span className="first-item">{category}</span>
                <span className="second-item">
                    <button
                        onClick={(event) => handleRoomFilterClick(event, category, 'Any')}
                        className={selectedRoomFilters === 'Any' ? 'selected' : ''}>
                        Any
                    </button>

                    {numbers.map((number) => (
                        <button
                            key={number}
                            onClick={(event) => handleRoomFilterClick(event, category, number)}
                            className={selectedRoomFilters === number ? 'selected' : ''}
                        >
                            {number}
                        </button>
                    ))}

                </span>
            </div>
        </>
    );
}

