import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  const handleLoginSuccess = () => {
    // Lógica para redirecionar ou realizar outras ações após o login bem-sucedido
    console.log('Login bem-sucedido! Redirecionando...');
  };

  return (
    <Routes>
      <Route index element={ <Login onLoginSuccess={ handleLoginSuccess } /> } />
      <Route path="search" element={ <Search /> } />
    </Routes>
  );
}

export default App;
