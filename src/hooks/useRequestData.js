import { useState, useEffect } from "react";
import axios from "axios";

export function useRequestData(url, config, initialState) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    axios.get(url, config).then((response) => {
      setData(response.data);
    });
  }, [config, url]);

  return data;
}
