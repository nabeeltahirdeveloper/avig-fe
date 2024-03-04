import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [url, setUrl] = useState('')
  const [docxHtml, setDocxHtml] = useState('')
  const [isResult, setIsResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [docxPath, setDocxPath] = useState('')



  const analyze = async () => {
    setIsLoading(true)
    const response = await axios.post('http://127.0.0.1:8000/transcribe', { url })
    console.log(response)
    setDocxHtml(response?.data?.htmlData)
    setDocxPath(response?.data?.docx)
    setIsResult(true)
    setIsLoading(false)
  }


  return (
    <div className="App">
      {
        isResult ?
          <div className='result-container'>
            <button
            style={{
              alignSelf: 'flex-start',
              marginLeft: 20,
              width: 100,
              height: 30,
              color: 'white',
              backgroundColor: 'black',
              border: 'none',
              borderRadius: 5
            }}
            onClick={()=>{
              setIsResult(false)
              setUrl('')
            
            }}
            >
              Back
            </button>
            <h3>
              Result
            </h3>
            <div dangerouslySetInnerHTML={{ __html: docxHtml }} />

            <a href={`http://127.0.0.1:8000/${docxPath}`
            } 
            target='_blank'
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              width: 100,
              height: 30,
              color: 'white',
              backgroundColor: 'black',
              border: 'none',
              borderRadius: 5,
              textAlign: 'center',
              marginTop: 20,
              textDecoration: 'none',
              paddingTop: 10
            }}
            
            >Download</a>

          </div>
          :
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            gap: '20px'
          }}>
            {
              isLoading ? <div>
              <svg viewBox="25 25 50 50">
    <circle r="20" cy="50" cx="50"></circle>
  </svg>
              </div>
              : <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: '20px'
              }}>
                <input style={{
              width: 300,
              height: 30,
              borderRadius: 5


            }}
            placeholder='Enter the URL from Youtube video'
              type="text" onChange={(e) => { setUrl(e.target.value) }} value={url} />
            <button 
            style={{
              width: 100,
              height: 30,
              color: 'white',
              backgroundColor: 'black',
              border: 'none',
              borderRadius: 5
            }}
            onClick={analyze} >Analyze</button>
              </div>
            }
            

            

          </div>
      }

    </div>
  );
}

export default App;
