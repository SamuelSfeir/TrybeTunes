import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import './index.css';

function Search() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [artistName, setArtistName] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [noAlbumsFound, setNoAlbumsFound] = useState(false);

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsButtonDisabled(inputValue.length < 2);
    setArtistName(inputValue);
  };

  const handleSearchClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const albumsData = await searchAlbumsAPI(artistName);

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
    }
  };

  return (
    <div className="container-search">
      <form onSubmit={ handleSearchClick }>
        <label>
          Nome do artista
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

      {searchResult && <p>{searchResult}</p>}
      {noAlbumsFound ? (
        <p>Nenhum álbum foi encontrado</p>
      ) : (
        <ul className="album-list">
          {albums.map((album) => (
            <li className="album-item" key={ album.collectionId }>
              <Link to={ `/album/${album.collectionId}` } className="album-link">
                <img
                  src={ album.artworkUrl100 }
                  alt={ `Capa do álbum ${album.collectionName}` }
                  className="album-image"
                />
                <div className="album-details">
                  <h3>{album.collectionName}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
