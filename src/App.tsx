import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';

function App() {
  const handleLoginSuccess = () => {
    // Lógica para redirecionar ou realizar outras ações após o login bem-sucedido
    console.log('Login bem-sucedido! Redirecionando...');
  };

  return (
    <Routes>
      <Route index element={ <Login onLoginSuccess={ handleLoginSuccess } /> } />
    </Routes>
  );
}

export default App;
