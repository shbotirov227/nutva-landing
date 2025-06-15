import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectToLang() {
  const navigate = useNavigate();

  useEffect(() => {
  const preferredLang = navigator.languages.find(l =>
    l.startsWith('ru') || l.startsWith('uz')
  );
  const selectedLang = preferredLang?.startsWith('ru') ? 'ru' : 'uz';
  navigate(`/${selectedLang}`, { replace: true });
}, []);


  return null;
}

