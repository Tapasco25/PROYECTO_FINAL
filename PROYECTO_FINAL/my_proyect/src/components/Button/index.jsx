import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ color, size, shadows, className, children }) => {
    const buttonStyles = {
        backgroundColor: color,
        fontSize: size,
        boxShadow: shadows,
    };

    return (
        <button className={className} style={buttonStyles}>
            {children}
        </button>
    );
};

Button.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    shadows: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    color: 'blue',
    size: '16px',
    shadows: 'none',
    className: '',
};

export default Button;