import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
// import { mask } from "remask";
import { toast } from "react-toastify";
import { FormInputWrapper } from "./FormInputWrapper";
import PhoneField from "./PhoneField";

type FormModalProps = {
  children: React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>;
};

export function FormModal({ children }: FormModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [countryCode] = React.useState("+998");
  const [errors, setErrors] = React.useState<{ name?: string; phone?: string }>({});
  const { t } = useTranslation();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const rawValue = e.target.value;
  //   let digitsOnly = rawValue.replace(/\D/g, "");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    setErrors({});
    toast.success(t("form.success") || "Buyurtma muvaffaqiyatli qabul qilindi");
    setName("");
    setPhone("");
  };


  const trigger = React.cloneElement(children, {
    onClick: () => setIsOpen(true),
  });

  const inputSharedStyle = "!w-full !px-10 !py-6 !border-[#FD902B] sm:px-5 sm:py-3 rounded-xl text-[#6F6F6F] text-[15px] font-bold bg-white outline-none border-2 focus:!shadow-[0_0_10px_rgba(253,144,43,0.8)] transition-all";

  return (
    <>
      {trigger}

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 !z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="!z-50 bg-white text-black rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-xl mx-auto p-6 sm:p-8 md:p-10 border-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="text-center text-xl sm:text-2xl text-[#4C2003] font-bold">
                  {t("formModal.title")}
                </h2>
                <p className="text-center text-sm sm:text-base text-[#4C2003] font-semibold mt-2">
                  {t("formModal.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <FormInputWrapper
                  error={errors.name}
                  className="flex flex-col gap-1"
                >
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("form.input.name")}
                    className="w-full px-4 py-4 sm:px-5 sm:py-3 rounded-xl text-[#6F6F6F] text-[15px] font-bold bg-white outline-none border-2 border-[#FD902B] focus:shadow-[0_0_10px_rgba(253,144,43,0.8)] transition-all"
                  />
                </FormInputWrapper>

                <FormInputWrapper
                  error={errors.phone}
                  className="flex flex-col gap-1 border-[#FD902B]"
                >
                  <PhoneField
                    placeholder={t("form.input.phone")}
                    phone={phone}
                    setPhone={setPhone}
                    setErrors={setErrors}
                    className={inputSharedStyle}
                  />
                </FormInputWrapper>

                <div className="flex flex-row items-center justify-between gap-3 mt-2">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-4 sm:py-5 bg-gray-100 hover:bg-gray-600 hover:text-white border border-gray-600 rounded-lg cursor-pointer"
                  >
                    {t("button.cancelButton")}
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1 py-4 sm:py-5 bg-[#FD902B] hover:bg-amber-600 text-white rounded-lg cursor-pointer"
                  >
                    {t("button.formButton")}
                  </Button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
