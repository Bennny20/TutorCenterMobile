import { useState, useEffect } from "react";
import axios from "axios";
import { HOST_API } from "../../constants/index";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(HOST_API.local + `/api/tutor`);
      setData(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
  };
  return { data, isLoading, error, refetch };
};

export default useFetch;
