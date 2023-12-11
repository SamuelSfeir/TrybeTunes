import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      {/* Garante que o Header não seja renderizado pelo '/' */}
      {!isHomePage && <Header />}
      <Outlet />
    </div>
  );
}

export default Layout;
