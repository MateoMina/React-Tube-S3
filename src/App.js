// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FileUpload from './pages/FileUpload';
import FileExplorer from './pages/FileExplorer';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload/all" element={<FileExplorer />} />
          <Route path="/upload" element={<PrivateRoute><FileUpload /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;