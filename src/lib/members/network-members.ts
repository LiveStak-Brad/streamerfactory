/** Public directory: TikTok handles (@username) and display names as shown to the network. */
export type NetworkMember = {
  /** TikTok handle without @ — used in https://www.tiktok.com/@handle */
  username: string;
  /** Profile display name (may include emoji / unicode). */
  displayName: string;
  /** Backstage / Creator Network table photo (same source as /rankings). */
  avatarUrl?: string | null;
};

/** Synced to TikTok Creator Network eligible roster (29 active members). */
export const NETWORK_MEMBERS: readonly NetworkMember[] = [
  { username: "sunshine42882", displayName: "SunShine[SF]" },
  { username: "high.blondie", displayName: "high.blondie [SF]" },
  { username: "jasmine_wren", displayName: "🖤 Wrenny 🖤 [SF]" },
  { username: "cj_allycat93", displayName: "Allyson [SF]" },
  { username: "royaltystr8", displayName: "TheQueenVibes 🔥 FF 🔥 LL..." },
  { username: "ruthie8910", displayName: "Ruthie [SF]" },
  { username: "rosysmokes", displayName: "🌹 Rosy Smokes💨" },
  { username: "daddyslittlemonster87", displayName: "𝔇𝔞𝔡𝔡𝔶𝔰 𝔏𝔦𝔱𝔱𝔩𝔢 𝔐𝔬𝔫𝔰𝔱𝔢𝔯" },
  { username: "_sahm_251_2", displayName: "Rebecca Martin (SF)" },
  { username: "browneyedbrat6", displayName: "💜 🌹 BrownEyedBrat [SF]..." },
  { username: "deeindabox", displayName: "👑 💎 ⚡ Dee ⚡ 💎 👑 [SF]" },
  { username: "lilyunginn225", displayName: "Lilyunginn" },
  { username: "rissa7683", displayName: "🌹 🖤 𝓡𝓲𝓼𝓼𝓪 🖤 🌹 \"SF\"" },
  { username: "bettsmart633", displayName: "bettsmart633" },
  { username: "choppaboiofficial45p", displayName: "Just a chill blazer 💨 🌷" },
  { username: "silvanita4444", displayName: "silvanita4444 [SF]" },
  { username: "jennyrn55", displayName: "Jenny [SF]" },
  { username: "ciraantequera131", displayName: "Cira 131 (SF)" },
  { username: "ashley8178", displayName: "Ashley💋 [SF]" },
  { username: "amylong86", displayName: "amylong86" },
  { username: "gonx_missouri_mom", displayName: "⚔️Ladypurplerose [SF]⚔️" },
  { username: "blazinbaby420", displayName: "blazinbaby420[SF]" },
  { username: "bigmommagapo", displayName: "BigmommaGapo ☯️ G7" },
  { username: "bugzyboy.j", displayName: "Joshua Daugherty SF" },
  { username: "judy_132", displayName: "judy_132" },
  { username: "nyla.williams8", displayName: "nylawilliams53" },
  { username: "melissaholmig41998", displayName: "melissaholmig41998" },
  { username: "brittanykavanagh09", displayName: "Brittany Kavanagh [SF]" },
] as const;

export function memberProfileUrl(username: string): string {
  const handle = username.trim().replace(/^@+/, "");
  return `https://www.tiktok.com/@${handle}`;
}
