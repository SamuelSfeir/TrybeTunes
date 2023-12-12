import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import './index.css';

function Search() {
  // Estados para controlar o nome do artista, desabilitar botão, resultado da busca, álbuns e mensagem de nenhum álbum
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [artistName, setArtistName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [noAlbumsFound, setNoAlbumsFound] = useState(false);

  // Função para lidar com a mudança no input do nome do artista
  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Habilitar o botão apenas se o nome tiver 2 ou mais caracteres
    setIsButtonDisabled(inputValue.length < 2);
    setArtistName(inputValue);
  };

  // Função para lidar com o clique no botão de pesquisa
  const handleSearchClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Busca álbuns da API com base no nome do artista
      const albumsData = await searchAlbumsAPI(artistName);
      console.log('Álbuns encontrados:', albumsData);

      // Verifica se a busca retornou algum álbum
      if (albumsData.length === 0) {
        setNoAlbumsFound(true);
      } else {
        setSearchResult(`Resultado de álbuns de: ${artistName}`);
        setAlbums(albumsData);
        setNoAlbumsFound(false);
        setArtistName('');
      }
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
      // Lidar com erros, se necessário
    }
  };

  return (
    <div className="container-search">
      <form onSubmit={ handleSearchClick }>
        <label>
          Nome do artista:
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artistName }
            onChange={ handleArtistChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ isButtonDisabled }
          type="submit"
        >
          Pesquisar
        </button>
      </form>

      {searchResult && (
        <p>{searchResult}</p>
      )}
      {noAlbumsFound ? (
        <p>Nenhum álbum foi encontrado</p>
      ) : (
        /* Exibe a lista de álbuns se houver algum */
        albums.length > 0 && (
          <div>
            <h3>Álbuns:</h3>
            <ul>
              {/* Mapeia cada álbum na lista */}
              {albums.map((album) => (
                <li key={ album.collectionId }>
                  {/* Link para a rota do álbum */}
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    {/* Exibe o nome do álbum */}
                    {album.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default Search;
