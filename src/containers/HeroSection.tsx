import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import ProductImage from "@/assets/product-img.png";
import HeroBg from "@/assets/hero-bg.png";
import { FormModal } from "@/components/Modal";

const HeroSection = () => {
  const { t } = useTranslation();

  // const scrollToForm = () => {
  //   const element = document.getElementById("form-section");
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-no-repeat bg-center border-0"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >

      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <Container className="flex flex-col lg:flex-row items-center justify-between max-[650px]:justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-15 sm:py-12 lg:py-16 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mx-auto
          max-[650px]:flex-col max-[650px]:gap-10"
        >
          <div className="w-full max-[650px]:w-full flex justify-center lg:justify-start">
            <img
              src={ProductImage}
              alt="Gelmin Kids"
              className="w-full h-auto max-w-[200px] max-[650px]:max-w-[70%] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px] drop-shadow-2xl object-contain"
            />
          </div>

          <div className="w-full max-[650px]:w-full">
            <Card
              className="p-4 max-[650px]:py-15 sm:p-6 md:p-15 lg:p-10 xl:p-12 rounded-xl sm:rounded-2xl shadow-xl text-center lg:text-left border-none mb-4 sm:mb-6 lg:mb-8"
              style={{
                backgroundColor: "rgba(235, 170, 79, 0.4)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
              }}
            >
              <CardContent className="p-0 space-y-3 sm:space-y-4 lg:space-y-20">
                <CardTitle className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight sm:leading-snug">
                  {t("heroTitle")}
                </CardTitle>
                <CardDescription className="!text-white text-muted-foreground font-medium sm:font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  {t("heroSubtitle")}
                </CardDescription>
              </CardContent>
            </Card>

            <FormModal>
              <Button
                className="w-full bg-[#FD902B] hover:bg-amber-600 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl py-7 sm:py-4 md:py-6 lg:py- xl:py-7 px-6 sm:px-8 shadow-xl rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer font-semibold"
                size="lg"
                variant="destructive"
              >
                {t("button.heroButton")}
              </Button>
            </FormModal>
          </div>
        </Container>
      </motion.div>
    </section>
  );
};

export default HeroSection;
