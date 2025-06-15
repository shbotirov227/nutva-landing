import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { toast } from "react-toastify";
import PhoneField from "@/components/PhoneField";
import { FormInputWrapper } from "@/components/FormInputWrapper";
import { sendToBitrix } from "@/lib/sendToBitrix";
// import { sendFormData } from "@/lib/sendFormData";

const FormSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode] = useState("+998");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const { t } = useTranslation();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let digitsOnly = e.target.value.replace(/\D/g, "");
  //   const cleanedCountryCode = countryCode.replace(/\D/g, "");

  //   if (!digitsOnly.startsWith(cleanedCountryCode)) {
  //     digitsOnly = cleanedCountryCode + digitsOnly;
  //   }

  //   digitsOnly = digitsOnly.slice(0, cleanedCountryCode.length + 9);
  //   const dynamicMask = `${countryCode} (99) 999-99-99`;
  //   const masked = mask(digitsOnly, dynamicMask);

  //   setPhone(masked);
  // };

  // const handleFocus = () => {
  //   if (phone.trim() === "") {
  //     setPhone(`${countryCode} `);
  //   }
  // };

  // const handleBlur = () => {
  //   const digitsOnly = phone.replace(/\D/g, "");
  //   const cleanedCountryCode = countryCode.replace(/\D/g, "");

  //   if (
  //     digitsOnly === "" ||
  //     digitsOnly === cleanedCountryCode ||
  //     (digitsOnly.startsWith(cleanedCountryCode) &&
  //       digitsOnly.length <= cleanedCountryCode.length + 1)
  //   ) {
  //     setPhone("");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const digitsOnly = phone.replace(/\D/g, "");
    const cleanedCode = countryCode.replace(/\D/g, "");
    const phoneLength = digitsOnly.length - cleanedCode.length;

    const isNameEmpty = !trimmedName;
    const isPhoneInvalid = !digitsOnly || phoneLength < 9;

    if (isNameEmpty && isPhoneInvalid) {
      toast.error(t("form.fillAllFields") || "Barcha maydonlarni to'ldiring");
      setErrors({
        name: t("form.errors.nameRequired"),
        phone: t("form.errors.phoneRequired"),
      });
      return;
    }

    if (isNameEmpty) {
      const nameError = t("form.errors.nameRequired") || "Ism kiritilishi shart";
      toast.error(nameError);
      setErrors({ name: nameError });
      return;
    }

    if (isPhoneInvalid) {
      const phoneError =
        t("form.errors.phoneRequired") || "Telefon raqami to'liq bo'lishi kerak";
      toast.error(phoneError);
      setErrors({ phone: phoneError });
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const result = await sendToBitrix({
      name: trimmedName,
      phone,
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_term: searchParams.get("utm_term") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
    });
    if (result) {
      toast.success(t("form.success") || "Buyurtma muvaffaqiyatli yuborildi");
      setName("");
      setPhone("");

      console.log("Success", result);
    } else {
      toast.error("Ma'lumot yuborishda xatolik yuz berdi");
    }

    setErrors({});
    // toast.success(t("form.success") || "Buyurtma muvaffaqiyatli qabul qilindi");
    // setName("");
    // setPhone("");
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-white text-2xl"
    >
      <section id="form-section" className="w-full py-10 pb-56">
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

              <FormInputWrapper error={errors.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.input.name")}
                  className={`px-5 py-4 rounded-xl text-[#6F6F6F] text-[15px] sm:text-base md:text-[17px] font-bold bg-white outline-none border-2 ${errors.name ? "border-red-500" : "border-transparent"
                    } focus:shadow-[0_0_10px_rgba(0,0,0,0.1),_0_0_10px_rgba(0,0,0,0.7)] transition-all`}
                />
              </FormInputWrapper>

              <FormInputWrapper error={errors.phone}>
                <PhoneField
                  placeholder={t("form.input.phone")}
                  phone={phone}
                  setPhone={setPhone}
                  setErrors={setErrors}
                  errors={errors}
                />
              </FormInputWrapper>

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
