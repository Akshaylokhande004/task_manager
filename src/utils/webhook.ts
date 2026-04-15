import axios from "axios";
export const sendWebhook = async (
  payload: any,
  retries = 3
) : Promise<void> => {
  try {
    await axios.post(process.env.WEBHOOK_URL!, payload);
    console.log("✅ Webhook sent");
  } catch (error) {
    if (retries > 0) {
      console.log(`🔁 Retrying webhook... (${retries})`);

      setTimeout(() => {
        sendWebhook(payload, retries - 1);
      }, (4 - retries) * 1000); // 1s, 2s delay
    } else {
      console.error("❌ Webhook failed after retries");
    }
  }
};