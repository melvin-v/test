import React from 'react';
import './ParkingPanel.css';

const ParkingPanel = () => {
    const numberOfVehicles = 20;
    const availableSpaces = 30;
    const occupancyPercentage = (numberOfVehicles / (numberOfVehicles + availableSpaces)) * 100;
    const externalUsersPercentage = 70;
    const vehiclesEntered = 50;
    const vehiclesExited = 40;

    return (
        <div className="parking-panel">
            <h3>Monitoreo del Parqueo</h3>
            <div className="statistic-item">
                <strong>Número de vehículos dentro:</strong> {numberOfVehicles}
            </div>
            <div className="statistic-item">
                <strong>Espacios disponibles:</strong> {availableSpaces}
            </div>
            <div className="statistic-item">
                <strong>Ocupación:</strong> {occupancyPercentage.toFixed(2)}%
            </div>
            <div className="statistic-item">
                <strong>Porcentaje de usuarios externos:</strong> {externalUsersPercentage}%
            </div>
            <div className="statistic-item">
                <strong>Número de vehículos que han ingresado hoy:</strong> {vehiclesEntered}
            </div>
            <div className="statistic-item">
                <strong>Número de vehículos que han salido hoy:</strong> {vehiclesExited}
            </div>
        </div>
    );
};

export default ParkingPanel;
