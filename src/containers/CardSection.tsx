import { useTranslation } from "react-i18next";
import CardImage from "@/assets/product-img.png";
import Container from "@/components/Container";
import { Card, CardContent, CardDescription, CardTitle } from "../components/ui/card";
import { motion } from "framer-motion";

const CardSection = () => {

  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-white text-2xl"
    >
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 md:px-6 lg:px-8 z-1 relative md:!my-0">
        <Card className="w-full md:w-[70%] lg:w-[70%] xl:w-[55%] sm:w-[100%] bg-[#FD902B] border-none shadow-lg p-6 md:p-8 rounded-2xl max-[768px]:!p-12 !pr-25">
          <CardContent className="flex flex-col gap-4">
            <CardTitle className="text-white text-4xl sm:text-3xl max-[768px]:text-center md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              {t("card.title")}
            </CardTitle>
            <CardDescription className="text-white text-lg max-[768px]:text-center sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
              {t("card.subtitle")}
            </CardDescription>
          </CardContent>
        </Card>
        <div className="w-full lg:w-[35%] md:w-[45%] mt-6 md:mt-0 md:absolute md:right-0 lg:right-10 sm:w-[70%] max-[650px]:w-[70%]">
          <img src={CardImage} alt="Gelmin Kids" className="w-full h-auto object-contain" />
        </div>
      </Container>
    </motion.div>
  )
}

export default CardSection;