import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://localhost:3001';

// axios.interceptors.request.use(
//   config => {
//     const { origin } = new URL(config.url as string);
//     const allowedOrigins = [apiUrl];
//     const token = localStorage.getItem('token');
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

axios.defaults.withCredentials = true;

type Food = {
  id: number
  description: string
}

function App() {
  // const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [fetchError, setFetchError] = useState<any>(null);
  
  const getJwt = async () => {
    const { data } = await axios.get(`${apiUrl}/jwt`);
    // localStorage.setItem('token', data.token);
    setJwt(data.token);
  };

  const getFoods = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/foods`);
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err);
    }
  };
  
  return (
    <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>
          Get Foods
        </button>
        <ul>
          {foods.map((food, i) => (
            <li>{food.description}</li>
          ))}
        </ul>
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>
    </>
  );
}
export default App;