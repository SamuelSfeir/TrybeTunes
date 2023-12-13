// ProfileEdit.tsx
import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../../services/userAPI';
import './ProfileEdit.css';

function ProfileEdit() {
  const [userData, setUserData] = useState<any>(null); // Ajuste conforme sua API retorna
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

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Adicione a lógica para enviar os dados do formulário para a API de atualização
    try {
      // Atualiza o usuário com os dados do formulário
      await updateUser(userData);
      // Redireciona para a página de perfil
      window.location.href = '/profile';
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }
  };

  const handleInputChange = (
    event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUserData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      {isLoading && <p>Carregando...</p>}
      {!isLoading && userData && (
        <form onSubmit={ handleFormSubmit }>
          <label className="form-label">
            Nome:
            <input
              className="form-input"
              type="text"
              name="name"
              value={ userData.name }
              onChange={ handleInputChange }
              required
            />
          </label>
          <label className="form-label">
            Email:
            <input
              className="form-input"
              type="email"
              name="email"
              value={ userData.email }
              onChange={ handleInputChange }
              required
            />
          </label>
          <label className="form-label">
            Descrição:
            <textarea
              className="form-textarea"
              name="description"
              value={ userData.description }
              onChange={ handleInputChange }
              required
            />
          </label>
          <button className="form-button" type="submit">
            Salvar
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileEdit;
