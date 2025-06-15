import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { mask } from "remask";
import axios from "axios";

const FormSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+998");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const { t } = useTranslation();

  useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then((res) => {
        const code = res.data.country_calling_code;
        if (code) setCountryCode(code);
      })
      .catch((err) => {
        console.error("IP orqali aniqlashda xatolik:", err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    let digitsOnly = rawValue.replace(/\D/g, "");

    const cleanedCountryCode = countryCode.replace(/\D/g, "");
    if (!digitsOnly.startsWith(cleanedCountryCode)) {
      digitsOnly = cleanedCountryCode + digitsOnly;
    }

    digitsOnly = digitsOnly.slice(0, cleanedCountryCode.length + 9);

    const dynamicMask = `${countryCode} (99) 999-99-99`;
    const masked = mask(digitsOnly, dynamicMask);

    setPhone(masked);
  };

  const handleFocus = () => {
    if (phone.trim() === "") {
      setPhone(`${countryCode} `);
    }
  };

  const handleBlur = () => {
    const digitsOnly = phone.replace(/\D/g, "");
    const cleanedCountryCode = countryCode.replace(/\D/g, "");

    if (
      digitsOnly === "" ||
      digitsOnly === cleanedCountryCode ||
      digitsOnly.startsWith(cleanedCountryCode) &&
      digitsOnly.length <= cleanedCountryCode.length + 1
    ) {
      setPhone("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = t("form.errors.nameRequired") || "Ism kiritilishi kerak";
    }

    const digitsOnly = phone.replace(/\D/g, "");
    const cleanedCode = countryCode.replace(/\D/g, "");
    const phoneLength = digitsOnly.length - cleanedCode.length;

    if (!digitsOnly || phoneLength < 9) {
      newErrors.phone = t("form.errors.phoneRequired") || "To‘liq telefon raqam kiritilishi kerak";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Yuborildi:", { name, phone });
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
              <div className="w-full sm:w-[48%] flex flex-col gap-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.input.name")}
                  className={`px-5 py-4 rounded-xl text-[#6F6F6F] text-[15px] sm:text-base md:text-[17px] font-bold bg-white outline-none border-2 ${errors.name ? "border-red-500" : "border-transparent"
                    } focus:shadow-[0_0_10px_rgba(0,0,0,0.1),_0_0_10px_rgba(0,0,0,0.15)] transition-all`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm font-bold">{errors.name}</p>
                )}
              </div>

              <div className="w-full sm:w-[48%] flex flex-col gap-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={t("form.input.phone")}
                  className={`px-5 py-4 rounded-xl text-[#6F6F6F] text-[15px] sm:text-base md:text-[17px] font-bold bg-white outline-none border-2 ${errors.phone ? "border-red-500" : "border-transparent"
                    } focus:shadow-[0_0_10px_rgba(0,0,0,0.1),_0_0_10px_rgba(0,0,0,0.15)] transition-all`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm font-bold">{errors.phone}</p>
                )}
              </div>

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
