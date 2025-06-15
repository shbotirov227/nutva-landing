import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import RedirectToLang from "@/components/RedirectToLang.tsx";
import SuccessPage from "@/components/SuccessPage.tsx";
import App from "./App.tsx";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import "./i18n.ts";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToLang />} />
        <Route path="/:lang" element={<App />} />
        <Route path="/:lang/success" element={<SuccessPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </BrowserRouter>
  </StrictMode>,
)
