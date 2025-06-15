export async function sendFormData(data: {
  name: string;
  phone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    if (data.utm_source) formData.append("utm_source", data.utm_source);
    if (data.utm_medium) formData.append("utm_medium", data.utm_medium);
    if (data.utm_campaign) formData.append("utm_campaign", data.utm_campaign);
    if (data.utm_term) formData.append("utm_term", data.utm_term);
    if (data.utm_content) formData.append("utm_content", data.utm_content);

    const response = await fetch(import.meta.env.VITE_REACT_APP_BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Yuborishda xatolik yuz berdi");
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
