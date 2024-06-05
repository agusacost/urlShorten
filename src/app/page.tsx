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

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard
        .writeText("http://localhost:3000/shortUrl/" + shortUrl)
        .then();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-6xl font-semibold mb-10 text-blue-500">Short URL</h1>
      <div className="border-2 border-blue-500 rounded-md shadow-sm p-24 flex flex-col items-center justify-center">
        <div className="mb-10">
          <h2 className="font-semibold text-2xl text-blue-400">
            Paste your URL to be shortened
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
          <input
            type="text"
            ref={inputRef}
            placeholder="Paste your URL here"
            className="shadow appearance-none border-2  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline">
            Shorten
          </button>
        </form>
        <div>
          {shortUrl && (
            <div className="text-center mt-4">
              <span
                className="text-blue-300 font-bold cursor-pointer"
                onClick={handleCopy}
              >
                Short URL: http://localhost:3000/shortUrl/{shortUrl}
              </span>
              <br />
              <span className="text-slate-400 text-sm">
                *Click on link to copy on clipboard
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
