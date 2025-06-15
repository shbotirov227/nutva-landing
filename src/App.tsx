import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import HeroSection from "@/containers/HeroSection";
import Simptoms from "@/containers/Simptoms";
import CardSection from "@/containers/CardSection";
import Benefits from "@/containers/Benefits";
import ParasitesSection from "@/containers/ParasitesSection";
import RecommendationSection from "@/containers/RecommendationSection";
import FormSection from "@/containers/FormSection";
import { motion } from "framer-motion";

function App() {

  const { lang } = useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    const langCode = lang ?? i18n.language
    if (langCode && ['uz', 'ru'].includes(langCode)) {
      i18n.changeLanguage(langCode)
    } else {
      i18n.changeLanguage('uz')
    }
  }, [lang, i18n])

  return (
    <div className="App bg-[#FFF3D9]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-white text-2xl"
      >

        <HeroSection />
        <Simptoms />
        <CardSection />
        <Benefits />
        <ParasitesSection />
        <RecommendationSection />
        <FormSection />
      </motion.div>
    </div>
  )
}

export default App
