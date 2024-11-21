import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileExplorer = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    fetchAllFiles();
  }, []);

  useEffect(() => {
    const results = files.filter(file =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFiles(results);
  }, [searchTerm, files]);

  const fetchAllFiles = async () => {
    try {
      const response = await axios.get('https://react-tube-s3.vercel.app/api/upload/all');
      setFiles(response.data);
      setFilteredFiles(response.data); // Inicialmente mostrar todos los archivos
    } catch (error) {
      console.error('Error al obtener archivos:', error);
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
      <h2 className="text-2xl font-bold mb-4">Explorar archivos</h2>
      <input
        type="text"
        placeholder="Buscar archivos por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFiles.map((file, index) => (
          <li key={index} className="border p-2 rounded">
            {renderFile(file)}
            <p className="text-center mt-2">{file.fileName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
