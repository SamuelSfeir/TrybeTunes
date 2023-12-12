import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { SongType, AlbumType } from '../../types';
import MusicCard from '../MusicCard';
import './index.css';

function Album() {
  const { id } = useParams<{ id?: string }>();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [artistName, setArtistName] = useState<string | undefined>(undefined);
  const [albumName, setAlbumName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        if (id) {
          setIsLoading(true);

          // Faz a requisição à API para obter as músicas do álbum
          const musicsData: (AlbumType | SongType)[] = await getMusics(id);

          // Filtra as músicas da lista, se houver
          const songs = musicsData.filter((item) => 'trackName' in item) as SongType[];

          // Obtém o nome do artista do primeiro álbum
          const firstAlbum = musicsData.find((item) => 'collectionName' in item) as
          AlbumType;
          const artist = firstAlbum?.artistName;
          const album = firstAlbum?.collectionName;

          // Atualiza os estados com os nomes do artista e do álbum
          setArtistName(artist);
          setAlbumName(album);

          // Atualiza o estado com as músicas obtidas
          setMusics(songs);
        }
      } catch (error) {
        console.error('Erro ao obter músicas do álbum:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Chama a função para obter as músicas quando o componente é montado
    fetchMusics();
  }, [id]);

  return (
    <div className="container-album">
      {/* Exibe o nome do artista */}
      {artistName && <p data-testid="artist-name">{artistName}</p>}

      {/* Exibe o nome do álbum */}
      {albumName && <p data-testid="album-name">{albumName}</p>}

      <h2>Músicas do Álbum</h2>

      {/* Exibe a mensagem "Carregando..." durante o carregamento */}
      {isLoading && <p className="loading-message">Carregando...</p>}

      {/* Exibe a lista de músicas após o carregamento */}
      {!isLoading && (
        <div className="music-list">
          {musics.map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
