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
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  try {
    let phoneDigits = formData.phone.replace(/[^+\d]/g, "");
    if (!phoneDigits.startsWith("+")) {
      phoneDigits = `+${phoneDigits}`;
    }

    const contactSearchRes = await fetch(`${baseUrl}/crm.contact.list.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filter: { PHONE: phoneDigits },
        select: ["ID", "NAME"],
      }),
    });

    const contactSearchResult = await contactSearchRes.json();
    const existingContact = contactSearchResult.result?.[0];
    let contactId: number;

    if (existingContact) {
      contactId = existingContact.ID;
    } else {
      const contactCreateRes = await fetch(`${baseUrl}/crm.contact.add.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            NAME: formData.name,
            PHONE: [{ VALUE: phoneDigits, VALUE_TYPE: "MOBILE" }],
          },
        }),
      });

      const contactCreateResult = await contactCreateRes.json();

      if (contactCreateResult.error) {
        console.error("Contact create error:", contactCreateResult.error_description);
        return false;
      }

      contactId = contactCreateResult.result;
    }

    const titlePrefix = existingContact ? "Повторная заявка" : "Новый клиент";
    const dealPayload = {
      fields: {
        TITLE: `${titlePrefix} — ${formData.name}`,
        CONTACT_ID: contactId,
        PHONE: [{ VALUE: phoneDigits, VALUE_TYPE: "MOBILE" }],
        SOURCE_ID: "19",
        CATEGORY_ID: 0,
        STAGE_ID: "UC_TCCXFR",
        ...(formData.utm_source && { UTM_SOURCE: formData.utm_source }),
        ...(formData.utm_medium && { UTM_MEDIUM: formData.utm_medium }),
        ...(formData.utm_campaign && { UTM_CAMPAIGN: formData.utm_campaign }),
        ...(formData.utm_term && { UTM_TERM: formData.utm_term }),
        ...(formData.utm_content && { UTM_CONTENT: formData.utm_content }),
      },
    };

    const dealRes = await fetch(`${baseUrl}/crm.deal.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dealPayload),
    });

    const dealResult = await dealRes.json();

    if (dealResult.error) {
      console.error("Deal error:", dealResult.error_description);
      return false;
    }

    const dealId = dealResult.result;

    const commentText = `${existingContact ? `⚠️ Повторная заявка\n` : ""}📝 Новая заявка с сайта
👤 Имя: ${formData.name}
📞 Телефон: ${phoneDigits}
🌐 Источник: ${formData.utm_source || "неизвестен"}
📢 Канал: ${formData.utm_medium || "неизвестен"}
🎯 Кампания: ${formData.utm_campaign || "неизвестен"}
🔍 Ключевое слово: ${formData.utm_term || "неизвестен"}
🧩 Контент: ${formData.utm_content || "неизвестен"}
📄 Страница: ${typeof window !== "undefined" ? window.location.href : "неизвестен"}
📅 Дата и время: ${new Date().toLocaleString("ru-RU")}`;

    await fetch(`${baseUrl}/crm.timeline.comment.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          ENTITY_ID: dealId,
          ENTITY_TYPE: "deal",
          COMMENT: commentText,
        },
      }),
    });

    return true;
  }
  catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
};
