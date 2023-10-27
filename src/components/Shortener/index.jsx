
import React, { useState } from 'react';
import axios from 'axios';
import Main from '../Main';
import styles from './styles.module.css'



const Shortener = () => {
  const [longURL, setLongURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [error, setError] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');


  // Define BASE_URL here
  const BASE_URL = 'https://url-shortner-server-n8nj.onrender.com';

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleShortenClick = () => {
    if (!isValidURL(longURL)) {
      setError('Invalid URL. Please enter a valid URL.');
      return;
    }
    const userId= localStorage.getItem("userId");
    const data = { originalUrl: longURL,userId };

    axios
      .post(`https://url-shortner-server-n8nj.onrender.com/shorten`, data)
      .then((response) => {
        console.log('Response from backend:', response);

        setShortenedURL(response.data.shortUrl);
        setLongURL('');
      })
      .catch((error) => {
        console.log('Error from backend:', error);

        setError('Failed to shorten the URL.');
        console.error(error);
      });
  };

  const handleCopyClick = () => {
    const textArea = document.createElement('textarea');
    textArea.value = `${BASE_URL}/${shortenedURL}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('URL Copied Succesfully');
    setCopyButtonText('Copied');
    setShortenedURL('')
  };

  return (
    <>
     <Main />
     <h1 className={styles.h1}>Welcome to URL Shortener Application</h1>
    <div className={styles.container}>
     
      <h2>Make the long URL into Short URL here</h2>
       <div>
      <input
        type="text"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Enter the long URL"
      />
      <button className={styles.button} onClick={handleShortenClick}>Click to Short the URL</button>
      </div>
      {shortenedURL && (
    <div className={styles.shorturl}>
      <a className={styles.a} href={`${BASE_URL}/${shortenedURL}`} target='_blank'>
        {`${BASE_URL}/${shortenedURL}`}
      </a>
      <button className={styles.copy} onClick={handleCopyClick} disabled={setCopyButtonText === 'Copied'}>
      Copy
      </button>
    </div>
  )}
      {error && <p className={ styles.error}>Error: {error}</p>}
    </div>
    </>
  );
};

export default Shortener;
