import { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../utils/api'

const useGetData = (endPoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${base_url}${endPoint}`);
        setData(resp.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, [endPoint]);

  return { data, error, loading };
};

export default useGetData;
