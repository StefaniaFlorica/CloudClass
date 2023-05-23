import { useState, useEffect } from "react";

export const useLocalState = (defaultValue, key) => {
  // const [value,setValue] =useState();
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    if (value === null) {
      // Remove the item from the local storage if the value is null
      localStorage.removeItem(key);
    } else {
      // Store the value in the local storage
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};
