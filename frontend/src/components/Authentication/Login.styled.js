import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: 'BurbankSmall-Medium', Arial, sans-serif; /* Aplicar la fuente aquí */
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'BurbankSmall-Medium', Arial, sans-serif; /* Aplicar la fuente aquí */
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'BurbankSmall-Medium', Arial, sans-serif; /* Aplicar la fuente aquí */
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: #fff;
  cursor: pointer;
  font-family: 'BurbankSmall-Medium', Arial, sans-serif; /* Aplicar la fuente aquí */
  &:hover {
    background-color: #0056b3;
  }
`;
