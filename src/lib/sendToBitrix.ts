type FormDataType = {
  name: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export const sendToBitrix = async (formData: FormDataType) => {

  const payload = {
    fields: {
      TITLE: `${formData.name} - ${formData.phone}`,
      NAME: formData.name,
      PHONE: [{ VALUE: formData.phone, VALUE_TYPE: "MOBILE" }],
      ...(formData.utm_source && { UTM_SOURCE: formData.utm_source }),
      ...(formData.utm_medium && { UTM_MEDIUM: formData.utm_medium }),
      ...(formData.utm_campaign && { UTM_CAMPAIGN: formData.utm_campaign }),
      ...(formData.utm_term && { UTM_TERM: formData.utm_term }),
      ...(formData.utm_content && { UTM_CONTENT: formData.utm_content }),
    },
  };

  try {
    const response = await fetch(import.meta.env.VITE_REACT_APP_BASE_URL + "/crm.deal.add.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.error) {
      console.error("Bitrix error:", result.error_description);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
};
