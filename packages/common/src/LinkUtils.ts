export function getWhatsAppLinkWithText(text: string) {
  const WHATSAPP_LINK = "https://wa.me/9720587100571";
  return `${WHATSAPP_LINK}?text=${text}`;
}

export function getPhoneCall(phoneNumber: string) {
  const PHONE_NUMBER = `tel:+${phoneNumber}`;
  return `${PHONE_NUMBER}`;
}
