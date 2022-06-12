import { useState, useEffect } from "react";
import "./App.css";

import Gif from "./components/Gif";
import Form from "./components/Form";

export default function App() {
  const [gifSrc, setGifSrc] = useState({});

  const key = "W9ThL38OlmMnIif0P13v036495Y4OMVA";

  const makeApiCall = async () => {
    const gifSrc = `https://api.giphy.com/v1/gifs/random?api_key=${key}`;
    try {
      const res = await fetch(gifSrc);
      const json = await res.json();
      console.log("makeApiCall", json.data);
      setGifSrc({ image_url: json.data.images.downsized_large.url });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    makeApiCall();
  }, []);

  const handleSubmit = async (val) => {
    if (val) {
      const gifSrc = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${val}&limit=1`;
      const res = await fetch(gifSrc);
      const json = await res.json();
      console.log("handleSumbit", json.data[0].images.downsized_large.url);
      setGifSrc({ image_url: json.data[0].images.downsized_large.url });
    } else {
      makeApiCall();
    }
  };

  return (
    <div className="App">
      <h1>Giphy</h1>
      <Form handleSubmit={handleSubmit} />
      <br />
      <br />
      {gifSrc.image_url ? (
        <Gif gifSrc={gifSrc} />
      ) : (
        <h2>Pull random gifs from Giphy</h2>
      )}
    </div>
  );
}
