import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Container from "../components/Container";
import DoctorImage from "../assets/recommendation-img.png";

const RecommendationSection = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-white py-10"
    >
      <Container>
        <div className="bg-[#FD902B] rounded-4xl shadow-xl overflow-hidden flex flex-col md:flex-row md:items-center md:max-w-4xl lg:max-w-5xl mx-auto">
          
          <div className="md:w-[40%] w-full flex justify-center items-center p-6 !pb-0 !pl-0 max-[767px]:!pl-8 md:p-8">
            <img
              src={DoctorImage}
              alt="Doctor"
              className="w-full max-w-[300px] md:max-w-[260px] lg:max-w-[350px] xl:max-w-[400px] h-auto object-contain"
            />
          </div>

          <div className="md:w-[60%] w-full px-6 py-6 md:py-12 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-snug">
              {t("recommendation.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl font-medium text-white leading-relaxed">
              {t("recommendation.subtitle")}
            </p>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default RecommendationSection;
