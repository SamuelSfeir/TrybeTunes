import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import Album from './components/Album/Album';
import Favorites from './components/Favorites/Favorites';
import Layout from './components/Layout/Layout';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';

function App() {
  const handleLoginSuccess = () => {
    // Lógica para redirecionar ou realizar outras ações após o login bem-sucedido
    console.log('Login bem-sucedido! Redirecionando...');
  };

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Login onLoginSuccess={ handleLoginSuccess } /> } />
        <Route path="search" element={ <Search /> } />
        <Route path="album/:id" element={ <Album /> } />
        <Route path="favorites" element={ <Favorites /> } />
        <Route path="profile" element={ <Profile /> } />
        <Route path="profile/edit" element={ <ProfileEdit /> } />
      </Route>
    </Routes>
  );
}

export default App;
