import Home from './components/Home';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const fetchPdfs = async () => {
      const res = await axios.get(`http://127.0.0.1:3001/api/pdfs?search=${searchTerm}`);
      setPdfs(res.data);
    };
    fetchPdfs();
  }, [searchTerm]);
  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/pdfs" element ={<FileList pdfs={pdfs}/>}/>
          <Route path="/upload" element ={<FileUpload/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
