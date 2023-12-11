import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import './index.css';

type LoginProps = {
  onLoginSuccess: () => void;
};

function Login({ onLoginSuccess }: LoginProps) {
  // Cria o estado para controlar o valor do input, validacoes e loading
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await createUser({ name: username });

      // Chama a função de callback para lidar com o sucesso do login
      onLoginSuccess();

      // Navegar para a rota /search diretamente, sem esperar
      navigate('/search');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setIsLoading(false);
      // Lidar com erros, se necessário
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setUsername(inputValue);

    // Habilitar o botão apenas se o nome tiver 3 ou mais caracteres
    setIsButtonDisabled(inputValue.length < 3);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        {/* Input para o nome de usuário */}
        <label>
          Nome de usuário:
          <input
            type="text"
            value={ username }
            data-testid="login-name-input"
            onChange={ handleUsernameChange }
          />
        </label>

        {isLoading ? (
          <p className="loading-message">Carregando...</p>
        ) : (
          <button
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        )}
      </form>
    </div>
  );
}

export default Login;
