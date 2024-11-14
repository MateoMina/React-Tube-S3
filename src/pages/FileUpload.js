// client/src/pages/FileUpload.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/upload', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error al obtener archivos:', error);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUploadedFiles();
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };

  const renderFile = (file) => {
    const fileUrl = file.fileUrl;
    const fileType = fileUrl.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      return <img src={fileUrl} alt={file.fileName} className="w-48 h-48 object-cover" />;
    } else if (['mp4', 'webm', 'ogg'].includes(fileType)) {
      return <video controls className="w-48 h-48"><source src={fileUrl} type={`video/${fileType}`} /></video>;
    } else {
      return (
        <div className="flex items-center space-x-2">
          <span className="material-icons text-gray-500">insert_drive_file</span>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            {file.fileName}
          </a>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Subir archivo</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Subir
        </button>
      </form>
      <h3 className="text-xl font-bold mb-4">Archivos subidos:</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uploadedFiles.map((file, index) => (
          <li key={index} className="border p-2 rounded">
            {renderFile(file)}
            <p className="text-center mt-2">{file.fileName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
