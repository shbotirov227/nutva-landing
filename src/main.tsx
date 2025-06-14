import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RedirectToLang from "./components/RedirectToLang.tsx";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToLang />} />
        <Route path="/:lang" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
