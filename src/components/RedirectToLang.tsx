import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RedirectToLang() {
  const navigate = useNavigate()

  useEffect(() => {
    const userLang = navigator.language.startsWith('ru') ? 'ru' : 'uz'
    navigate(`/${userLang}`, { replace: true })
  }, [])

  return null
}
