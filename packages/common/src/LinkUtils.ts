export function getWhatsAppLinkWithText(
  text: string,
  phoneNumber: string = ""
) {
  const WHATSAPP_LINK = "https://wa.me/972" + (phoneNumber || "0587100571");
  return `${WHATSAPP_LINK}?text=${text}`;
}

export function getPhoneCall(phoneNumber: string) {
  const PHONE_NUMBER = `tel:+${phoneNumber}`;
  return `${PHONE_NUMBER}`;
}
