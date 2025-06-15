import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FormModal } from "./../components/Modal";
import BenefitsImage1 from "@/assets/benefits-img1.png";
import BenefitsImage2 from "@/assets/benefits-img2.png";
import BenefitsImage3 from "@/assets/benefits-img3.png";
import BenefitsImage4 from "@/assets/benefits-img4.png";
import BenefitsImage5 from "@/assets/benefits-img5.png";
import Container from "@/components/Container";

const benefitsImages = [
  BenefitsImage1,
  BenefitsImage2,
  BenefitsImage3,
  BenefitsImage4,
  BenefitsImage5,
];

const Benefits = () => {

  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="text-white py-10"
    >
      <Container className="flex flex-col items-center gap-10">

        <div className="w-full flex flex-wrap justify-center gap-6">
          {benefitsImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]"
            >
              <img
                src={item}
                alt={`Benefit ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
        <FormModal>
          <Button
            size="lg"
            variant="destructive"
            className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] rounded-2xl bg-[#FD902B] hover:bg-amber-600 text-white text-base sm:text-lg md:text-xl py-5 sm:py-6 lg:py-7"
          >
            {t("button.consultationButton")}
          </Button>
        </FormModal>
      </Container>
    </motion.div>
  );
};

export default Benefits;
