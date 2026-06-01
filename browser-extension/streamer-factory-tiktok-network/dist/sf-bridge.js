"use strict";
(() => {
  // src/sf-bridge.ts
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "SF_FETCH") {
      void (async () => {
        const requestUrl = message.url ?? message.path;
        if (!requestUrl) {
          sendResponse({ ok: false, error: "Missing request URL." });
          return;
        }
        try {
          const res = await fetch(requestUrl, {
            method: message.method ?? "GET",
            credentials: "include",
            redirect: "manual",
            headers: {
              Accept: "application/json",
              ...message.body ? { "Content-Type": "application/json" } : {}
            },
            body: message.body
          });
          const text = await res.text();
          const trimmed = text.trim();
          if (trimmed.startsWith("<") || res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
            sendResponse({
              ok: false,
              status: res.status,
              text: trimmed.slice(0, 500),
              error: "Not signed in on this tab. Reload thestreamerfactory.com, then try again."
            });
            return;
          }
          const data = JSON.parse(trimmed);
          if (!res.ok) {
            const err = data?.error ?? `Request failed (${res.status})`;
            sendResponse({ ok: false, status: res.status, error: err });
            return;
          }
          sendResponse({ ok: true, data });
        } catch (e) {
          sendResponse({
            ok: false,
            error: e instanceof Error ? e.message : "Site fetch failed."
          });
        }
      })();
      return true;
    }
    if (message?.type === "SF_PING") {
      sendResponse({ ok: true });
      return true;
    }
    return false;
  });
})();
