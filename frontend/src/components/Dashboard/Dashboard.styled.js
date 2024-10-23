import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  outline: none;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

export const Panel = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const LogoutButton = styled.button`
  padding: 10px;
  background-color: #dc3545; /* Color rojo para el logout */
  border: none;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px; /* Margen inferior para separar del panel */
  
  &:hover {
    background-color: #c82333; /* Color más oscuro al pasar el mouse */
  }
`;
