import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorPage from "./AuthorPage";
import ArtistPage from "./ArtistPage";
import SpiritualPage from "./SpiritualPage"; 
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/author" element={<AuthorPage />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/spiritual" element={<SpiritualPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
