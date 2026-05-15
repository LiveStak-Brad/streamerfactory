/** Public directory: TikTok handles (@username) and display names as shown to the network. */
export type NetworkMember = {
  /** TikTok handle without @ — used in https://www.tiktok.com/@handle */
  username: string;
  /** Profile display name (may include emoji / unicode). */
  displayName: string;
};

export const NETWORK_MEMBERS: readonly NetworkMember[] = [
  { username: "_sahm_251_2", displayName: "Rebecca Martin" },
  { username: "robertljterryjr", displayName: "RobertTerry45 {SF}" },
  { username: "kimberly.clarke396", displayName: "kimberly1972" },
  { username: "choppaboiofficial45p", displayName: "Just a chill blazer 💨 🤘 🔥" },
  { username: "nyla.williams8", displayName: "nylawilliams55" },
  { username: "bigmommagapo", displayName: "BigmommaGapo ☯️ G7" },
  { username: "jennyrn55", displayName: "Jenny {SF}" },
  { username: "deeindabox", displayName: "🕊️ Dee 🕊️" },
  { username: "skyywalker87", displayName: "Skyy Walker {SF}" },
  { username: "brittanykavanagh09", displayName: "Brittany Kavanagh {SF}" },
  { username: "lilyunginn225", displayName: "Lilyunginn" },
  { username: "blazinbaby420", displayName: "blazinbaby420{SF}" },
  { username: "ashley8178", displayName: "Ashley💋 {SF}" },
  { username: "royaltystr8", displayName: "TheQueenVibes 🔥 FF 🔥 LL.." },
  { username: "gonx_missouri_mom", displayName: "❌Ladypurplerose {SF}❌" },
  { username: "daddyslittlemonster87", displayName: "𝔇𝔞𝔡𝔡𝔶𝔰 𝔏𝔦𝔱𝔱𝔩𝔢 𝔐𝔬𝔫𝔰𝔱𝔢𝔯" },
  { username: "browneyedbrat6", displayName: "🤎 🌹 BrownEyedBrat {SF}..." },
  { username: "cj_allycat93", displayName: "Allyson {SF}" },
  { username: "rissa7683", displayName: "🦋 💜 ℳ𝒶𝓇𝒾𝓈𝓈𝒶 💜 🦋" },
  { username: "silvanita4444", displayName: "silvanita4444 {SF}" },
  { username: "high.blondie", displayName: "high.blondie {SF}" },
  { username: "jasmine_wren", displayName: "🤍 Wrenny 🤍 {SF}" },
  { username: "ruthie8910", displayName: "Ruthie {SF}" },
  { username: "rosysmokes", displayName: "🌹 Rosy Smokes💨" },
  { username: "ciraantequera131", displayName: "Cira 131 {SF}" },
  { username: "sunshine42882", displayName: "SunShine{SF}" },
  { username: "tricioxv3", displayName: "tricioxv3" },
  { username: "bugzyboy.j", displayName: "bugzyboy.j" },
  { username: "pettynay._", displayName: "pettynay._" },
] as const;

export function memberProfileUrl(username: string): string {
  const handle = username.trim().replace(/^@+/, "");
  return `https://www.tiktok.com/@${handle}`;
}
