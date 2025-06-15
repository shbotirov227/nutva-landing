import { useTranslation } from "react-i18next";
import Container from "@/components/Container";
import ParasiteImage1 from "@/assets/parasite-img1.png";
import ParasiteImage2 from "@/assets/parasite-img2.png";
import ParasiteImage3 from "@/assets/parasite-img3.png";
import ParasiteImage4 from "@/assets/parasite-img4.png";
import ParasiteImage5 from "@/assets/parasite-img5.png";
import { motion } from "framer-motion";

const ParasitesSection = () => {
  const { t } = useTranslation();

  const parasitesData = [
    {
      id: 1,
      image: ParasiteImage1,
      title: t("parasite.1.title"),
      subtitle: t("parasite.1.subtitle")
    },
    {
      id: 2,
      image: ParasiteImage2,
      title: t("parasite.2.title"),
      subtitle: t("parasite.2.subtitle")
    },
    {
      id: 3,
      image: ParasiteImage3,
      title: t("parasite.3.title"),
      subtitle: t("parasite.3.subtitle")
    },
    {
      id: 4,
      image: ParasiteImage4,
      title: t("parasite.4.title"),
      subtitle: t("parasite.4.subtitle")
    },
    {
      id: 5,
      image: ParasiteImage5,
      title: t("parasite.5.title"),
      subtitle: t("parasite.5.subtitle")
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-white text-2xl"
    >
      <Container className="flex flex-col items-center my-10 py-10 max-lg:my-0 max-lg:py-5">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4C2003] text-center">
          {t("parasite.title")}
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-10 w-full">
          {parasitesData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="
                flex flex-col items-center text-center gap-4
                p-4 rounded-xl
                w-full sm:w-[47%] lg:w-[30%] min-h-[300px]
              "
            >
              <img
                src={item.image}
                alt={`item ${index + 1}`}
                className="w-45 h-45 object-contain"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-[#4C2003]">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-[#4C2003] font-medium">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </motion.div>
  );
};

export default ParasitesSection;
