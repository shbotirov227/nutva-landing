import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Image1 from "@/assets/simptom-img1.png";
import Image2 from "@/assets/simptom-img2.png";
import Image3 from "@/assets/simptom-img3.png";
import Container from "@/components/Container";

const Simptoms = () => {
  const { t } = useTranslation();

  const simptomsData = [
    {
      title: t("simptom.1"),
      image: Image1,
    },
    {
      title: t("simptom.2"),
      image: Image2,
    },
    {
      title: t("simptom.3"),
      image: Image3,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-white py-10"
    >
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 justify-center items-center">
          {simptomsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-white text-2xl"
            >
              <div
                className="flex flex-col items-center text-center gap-4 sm:gap-6 max-w-[300px] w-full mx-auto"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-contain"
                />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#F36E00] leading-snug">
                  {item.title}
                </h1>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.div>
  );
};

export default Simptoms;
