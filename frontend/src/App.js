import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios aquí
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './components/Authentication/Login';
import ClimatePanel from './components/Dashboard/ClimatePanel';
import ParkingPanel from './components/Dashboard/ParkingPanel';
import UsersPanel from './components/Dashboard/UsersPanel';
import { DashboardContainer, Tabs, Tab, Panel, LogoutButton } from './components/Dashboard/Dashboard.styled';

function App() {
  const [activeTab, setActiveTab] = useState('climate');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [climateData, setClimateData] = useState(null); // Para almacenar los datos del clima

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('climate');
  };

  // Función para obtener datos del clima
  const fetchClimateData = async () => {
    try {
      const response = await axios.get('URL_DE_TU_API_DE_CLIMA'); // Cambia esto por la URL real
      setClimateData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del clima:', error);
    }
  };

  // Llama a fetchClimateData cuando el componente se monte
  useEffect(() => {
    if (isAuthenticated) {
      fetchClimateData();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <GlobalStyles />
      <h1>Sistema de Parqueo Inteligente</h1>

      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <DashboardContainer>
          <Tabs>
            <Tab active={activeTab === 'climate'} onClick={() => handleTabChange('climate')}>
              Clima
            </Tab>
            <Tab active={activeTab === 'parking'} onClick={() => handleTabChange('parking')}>
              Parqueo
            </Tab>
            <Tab active={activeTab === 'users'} onClick={() => handleTabChange('users')}>
              Usuarios
            </Tab>
          </Tabs>
          <Panel>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            {activeTab === 'climate' && <ClimatePanel data={climateData} />} {/* Pasa los datos al componente */}
            {activeTab === 'parking' && <ParkingPanel />}
            {activeTab === 'users' && <UsersPanel />}
          </Panel>
        </DashboardContainer>
      )}
    </div>
  );
}

export default App;
