import { renderShareImage } from "@/lib/og/render-share-image";

export const alt = "Streamer Factory — TikTok LIVE creator agency";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  return renderShareImage();
}
