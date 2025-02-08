import { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });

      const result = await response.json();
      onUpload(result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file}>
        Upload {progress > 0 && `(${progress}%)`}
      </button>
    </div>
  );
}
