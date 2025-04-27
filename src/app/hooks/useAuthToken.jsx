import { useState, useEffect } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    const storedId = localStorage.getItem('id');
    if (storedId) {
      setId(storedId);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return {
    token,
    id,
    getToken, 
  };
};

export default useAuthToken;
