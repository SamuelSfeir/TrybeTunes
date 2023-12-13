// Profile.tsx
import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import './Profile.css'; // Importe o arquivo de estilo

function Profile() {
  const [userData, setUserData] = useState<any>(null); // Pode ajustar o tipo conforme sua API retorna
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userResponse = await getUser();
        setUserData(userResponse);
      } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      {isLoading && <p>Carregando...</p>}
      {!isLoading && userData && (
        <div className="profile-info">
          <p>{`Nome: ${userData.name}`}</p>
          <p>{`Email: ${userData.email}`}</p>
          <p>{`Descrição: ${userData.description}`}</p>
          <a href="/profile/edit" className="edit-profile-link">
            Editar perfil
          </a>
        </div>
      )}
    </div>
  );
}

export default Profile;
