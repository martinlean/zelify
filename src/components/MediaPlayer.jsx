import { useState, useEffect } from 'react';

export default function MediaPlayer({ media }) {
  const [currentMedia, setCurrentMedia] = useState(media[0]);

  const renderMedia = () => {
    switch (currentMedia.type) {
      case 'video':
        return (
          <video controls>
            <source src={currentMedia.url} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        );
      case 'audio':
        return (
          <audio controls>
            <source src={currentMedia.url} type="audio/mpeg" />
            Seu navegador não suporta áudio.
          </audio>
        );
      case 'pdf':
        return (
          <iframe
            src={currentMedia.url}
            title="PDF Viewer"
            width="100%"
            height="500px"
          />
        );
      case 'image':
        return <img src={currentMedia.url} alt="Conteúdo" />;
      default:
        return <p>Tipo de mídia não suportado.</p>;
    }
  };

  return (
    <div className="media-player">
      <div className="main-media">{renderMedia()}</div>
      <div className="media-thumbnails">
        {media.map((item) => (
          <div
            key={item.id}
            className={`thumbnail ${item.id === currentMedia.id ? 'active' : ''}`}
            onClick={() => setCurrentMedia(item)}
          >
            {item.type === 'image' ? (
              <img src={item.url} alt="Thumbnail" />
            ) : (
              <div className="icon">
                {item.type === 'video' && '▶️'}
                {item.type === 'audio' && '🎵'}
                {item.type === 'pdf' && '📄'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
