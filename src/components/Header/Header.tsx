import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import './index.css';

function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Faz a requisição à API para obter o nome da pessoa logada
        const user = await getUser();
        // Atualiza o estado com o nome obtido
        setUserName(user.name);
      } catch (error) {
        console.error('Erro ao obter nome do usuário:', error);
      } finally {
        // Marca o carregamento como concluído, independentemente do resultado
        setIsLoading(false);
      }
    };

    // Chama a função para obter o nome quando o componente é montado
    fetchUserName();
  }, []);

  return (
    <header data-testid="header-component">
      {/* Exibe a mensagem "Carregando..." durante o carregamento */}
      {isLoading && <p>Carregando...</p>}

      {/* Exibe o nome do usuário se disponível */}
      {userName && (
        <p data-testid="header-user-name" className="nome">
          Bem-vindo,
          {' '}
          {userName}
          !
        </p>
      )}

      {/* Links de navegação */}
      <div className="navbar">
        <NavLink to="/search" data-testid="link-to-search" className="white-link">
          Search
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile" className="white-link">
          Profile
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
