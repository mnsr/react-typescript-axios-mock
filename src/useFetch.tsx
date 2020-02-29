import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface IUseFetch {
  response: any;
  loading: boolean;
  error: boolean;
}

const useFetch = (url: string, run: boolean): IUseFetch => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (run && mounted) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(url);
          if (response.status === 200 && !signal.aborted) {
            setResponse(response.data);
          }
        } catch (err) {
          console.log(err);
          if (!signal.aborted) {
            setResponse(err);
            setError(true);
          }
        } finally {
          if (!signal.aborted) {
            setLoading(false);
          }
        }
      };
      fetchData();
    }

    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [run, url]);

  return { response, loading, error };
};

export default useFetch;
