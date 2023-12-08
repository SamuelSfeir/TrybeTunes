import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';

function App() {
  const handleLoginSuccess = () => {
    // Lógica para redirecionar ou realizar outras ações após o login bem-sucedido
    console.log('Login bem-sucedido! Redirecionando...');
  };

  return (
    <Routes>
      <Route index element={ <Login onLoginSuccess={ handleLoginSuccess } /> } />
      <Route path="search" element={ <Search /> } />
      <Route path="album/:id" element={ <Album /> } />
    </Routes>
  );
}

export default App;
