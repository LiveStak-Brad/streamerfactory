import { deleteTikTokConnectionByOpenId } from "@/lib/tiktok/db";

export type TikTokWebhookPayload = {
  client_key?: string;
  event?: string;
  create_time?: number;
  user_openid?: string;
  content?: string;
};

/**
 * Side effects for TikTok webhook events after HMAC verification succeeded.
 * Do not call on unverified requests.
 */
export async function handleVerifiedTikTokWebhookPayload(payload: TikTokWebhookPayload): Promise<void> {
  const event = payload.event;
  const openId = typeof payload.user_openid === "string" ? payload.user_openid.trim() : "";

  console.info("[tiktok webhook] verified event", { event, openId: openId ? `${openId.slice(0, 8)}…` : "" });

  if (event === "authorization.removed" && openId) {
    try {
      const del = await deleteTikTokConnectionByOpenId(openId);
      if (!del.ok) {
        console.error("[tiktok webhook] delete connection failed", del.error);
      }
    } catch (e) {
      console.error("[tiktok webhook] delete connection threw", e);
    }
  }
}
