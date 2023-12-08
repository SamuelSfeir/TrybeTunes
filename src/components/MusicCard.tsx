import React, { useState } from 'react';
import checkedHeartImage from '../images/checked_heart.png';
import emptyHeartImage from '../images/empty_heart.png';

type MusicCardProps = {
  trackName: string;
  previewUrl: string;
  trackId: number;
};

function MusicCard({ trackName, previewUrl, trackId }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCheckboxChange = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio controls data-testid="audio-component">
        <source src={ previewUrl } type="audio/mp3" />
        Your browser does not support the audio tag.
        {/* faixa de legenda vazia */}
        <track kind="captions" />
      </audio>

      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <img src={ isFavorite ? checkedHeartImage : emptyHeartImage } alt="favorite" />
        <input
          id={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ isFavorite }
          onChange={ handleCheckboxChange }
        />
      </label>

    </div>
  );
}

export default MusicCard;
