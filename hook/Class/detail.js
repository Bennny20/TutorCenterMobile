import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (item) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      //https://tc-837o.onrender.com/api/tutor
      const res = await axios.get(
        `https://tutor-center.onrender.com/request/${id}`
      );
      setData(res.data);
      console.log("Class detail: ", data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // console.error(error);
    fetchData();
    console.log(isLoading);
  }, []);

  const refetch = () => {
    setIsLoading(true);
  };
  return { data, isLoading, error, refetch };
};

export default useFetch;
