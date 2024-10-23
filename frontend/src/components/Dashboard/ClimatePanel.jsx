import React, { useState } from 'react';
import './ClimatePanel.css';

const ClimatePanel = () => {
    const [temperature] = useState(15);
    const [humidity] = useState(60);

    const getTemperatureClass = () => {
        if (temperature < 15) return 'cold';
        if (temperature < 20) return 'cool';
        if (temperature < 25) return 'warm';
        return 'hot';
    };

    const getHumidityClass = () => {
        if (humidity < 40) return 'low-humidity';
        if (humidity < 70) return 'medium-humidity';
        return 'high-humidity';
    };

    const renderSVG = () => {
        const svgStyle = {
            transition: 'transform 0.3s ease',
        };

        if (temperature < 15) {
            return (
                <svg id="cold-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="blue" />
                    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20">Frío</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        } else if (temperature < 20) {
            return (
                <svg id="cool-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="lightblue" />
                    <text x="50" y="55" textAnchor="middle" fill="black" fontSize="20">Fresco</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        } else if (temperature < 25) {
            return (
                <svg id="warm-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="orange" />
                    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20">Cálido</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        } else {
            return (
                <svg id="hot-svg" style={svgStyle} width="100" height="100">
                    <circle cx="50" cy="50" r="40" fill="red" />
                    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20">Caliente</text>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        from="1"
                        to="1.1"
                        dur="0.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </svg>
            );
        }
    };


    return (
        <div className="climate-panel">
            <div className={`weather time-morning ${getTemperatureClass()}`}>
                <div className="content">
                    <h3>Temperatura</h3>
                    <div className={`temperature-display ${getTemperatureClass()}`}>
                        <div className="degrees">{temperature}°</div>
                    </div>
                </div>
            </div>
            <div className={`weather time-day ${getHumidityClass()}`}>
                <div className="content">
                    <h3>Humedad</h3>
                    <div className={`humidity-display ${getHumidityClass()}`}>
                        <div className="humidity">{humidity}%</div>
                    </div>
                </div>
            </div>
            <div className="svg-container">
                {renderSVG()}
            </div>
        </div>
    );
};

export default ClimatePanel;
