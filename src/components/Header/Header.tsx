import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';

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
        <p data-testid="header-user-name">
          Bem-vindo,
          {' '}
          {userName}
          !
        </p>
      )}

      {/* Links de navegação */}
      <NavLink to="/search" data-testid="link-to-search">
        Search
      </NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">
        Favorites
      </NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">
        Profile
      </NavLink>
    </header>
  );
}

export default Header;
