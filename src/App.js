import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [url, setUrl] = useState('')
  const [docxHtml, setDocxHtml] = useState('')
  


  const analyze = async () => {
    const response = await axios.post('http://127.0.0.1:8000/transcribe', {url})
    console.log(response)
    setDocxHtml(response?.data?.htmlData)
  }


  return (
    <div className="App">
      <input type="text" onChange={(e)=>{setUrl(e.target.value)}} value={url} />
      <button onClick={analyze} >Analyze</button>
      <div dangerouslySetInnerHTML={{ __html: docxHtml }} />
    </div>
  );
}

export default App;
