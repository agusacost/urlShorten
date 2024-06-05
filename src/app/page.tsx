"use client";
import { useState, useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = inputRef.current?.value;
    await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShortUrl(data.shortUrl);
      });
  };
  return (
    <div>
      <h1>Url shortener</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} placeholder="url" />
        <button>Acortar</button>
      </form>
      <span className="">{shortUrl}</span>
    </div>
  );
}
