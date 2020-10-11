import React from 'react';
import PropTypes from 'prop-types';

import './Suggestions.css';

const Suggestions = ({ suggestions }) => {
    return (
        <>
            <ul className="suggestions">
            {suggestions.map((suggestion, idx) => (
                <li
                  className="suggestions__element"
                  key={idx}
                >
                  { suggestion }
                </li>
            ))}
            </ul>
        </>
    )
};

Suggestions.propTypes = {
    suggestions: PropTypes.array,
}

export default Suggestions;
