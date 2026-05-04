/*
Build a custom hook called useFetch<T> that:

- Accepts a url string as a parameter
- Returns three values: data, loading, and error
- data starts as null and updates when the fetch resolves
- loading starts as true and flips to false when the fetch completes
- error starts as null and updates if the fetch fails


Build a ProductList component that:

- Uses your useFetch hook to fetch from this URL: https://fakestoreapi.com/products
- Shows a "Loading..." message while loading
- Shows an error message if the fetch fails
- Renders a list of product names once data loads
*/

import { useEffect, useState } from "react";

/*
Shape of objet in the API 
{
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
*/

/* 
import { useState, useEffect } from "react";

// Manages fetching, loading, and error states for a given URL
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API calling logic, managing loading and error states
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
*/

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [url]);
  return { data, loading, error };
}

export default function ProductList() {
  const { data, loading, error } = useFetch<Product[]>(
    `https://fakestoreapi.com/products`,
  );

  return (
    <>
      {error && `Error: unable to fetch data: ${error}`}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data && data.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
      )}
    </>
  );
}
