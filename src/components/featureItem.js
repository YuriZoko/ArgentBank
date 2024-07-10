import React from 'react';
import PropTypes from 'prop-types';
import '../css/main.css';

const FeatureItem = ({ icon, title, description }) => (
  <div className="feature-item">
    <img src={icon} alt="Feature Icon" className="feature-icon" />
    <h3 className="feature-item-title">{title}</h3>
    <p>{description}</p>
  </div>
);

FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureItem;