import { loadApiConfig } from "./config";
/** Build Cookie header from Streamer Factory session cookies (not TikTok). */
async function cookieHeaderFor(baseUrl) {
    try {
        const url = new URL(baseUrl);
        const cookies = await chrome.cookies.getAll({ url: `${url.origin}/` });
        if (cookies.length === 0)
            return undefined;
        return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
    }
    catch {
        return undefined;
    }
}
async function apiFetch(path, init) {
    const { apiBaseUrl } = await loadApiConfig();
    const cookie = await cookieHeaderFor(apiBaseUrl);
    const headers = {
        Accept: "application/json",
        ...init?.headers,
    };
    if (cookie)
        headers.Cookie = cookie;
    const res = await fetch(`${apiBaseUrl}${path}`, {
        ...init,
        headers,
        credentials: "include",
    });
    const json = (await res.json());
    if (!res.ok) {
        throw new Error(json.error ?? `Request failed (${res.status})`);
    }
    return json;
}
export async function fetchMe() {
    return apiFetch("/api/extension/me");
}
export async function postImport(payload) {
    return apiFetch("/api/extension/tiktok-network/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}
