import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import MaskedInput from "react-text-mask";
import Container from "../components/Container";

type PhoneInputMaskProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const PhoneInputMask = ({ value, onChange, placeholder }: PhoneInputMaskProps) => {
  return (
    <MaskedInput
      mask={[
        "+",
        "9",
        "9",
        "8",
        " ",
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      guide={false}
      value={value}
      onChange={onChange}
      render={(ref, props) => (
        <input
          {...props}
          ref={ref as React.Ref<HTMLInputElement>}
          placeholder={placeholder}
          className="w-full sm:w-[48%] px-5 py-4 rounded-xl text-[#6F6F6F] text-[15px] sm:text-base md:text-[17px] font-bold bg-white outline-none border-none focus:shadow-[0_0_10px_rgba(0,0,0,0.1),_0_0_10px_rgba(0,0,0,0.15)] transition-all"
        />
      )}
    />
  );
};

const FormSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-white text-2xl"
    >
      <section className="w-full py-10 pb-16">
        <Container>
          <div className="bg-[#FD902B] rounded-3xl shadow-xl px-4 sm:px-8 md:px-14 lg:px-20 py-10 max-w-[95%] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
            <h2 className="text-white text-[24px] sm:text-[32px] md:text-[36px] font-bold text-center mb-3">
              {t("form.title")}
            </h2>
            <h4 className="text-white text-[16px] sm:text-[20px] md:text-[22px] font-semibold text-center mb-8">
              {t("form.subtitle")}
            </h4>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-5 sm:gap-6 md:gap-7 justify-center px-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("form.input.name")}
                className="w-full sm:w-[48%] px-5 py-4 rounded-xl text-[#6F6F6F] text-[15px] sm:text-base md:text-[17px] font-bold bg-white outline-none border-none focus:shadow-[0_0_10px_rgba(0,0,0,0.1),_0_0_10px_rgba(0,0,0,0.15)] transition-all"
              />

              <PhoneInputMask
                value={phone}
                placeholder={t("form.input.phone")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              />

              <Button
                type="submit"
                size={"lg"}
                className="w-full sm:w-[48%] text-[#FD902B] bg-white font-bold text-lg px-6 py-7 rounded-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer"
              >
                {t("button.formButton")}
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </motion.div>
  );
};

export default FormSection;
