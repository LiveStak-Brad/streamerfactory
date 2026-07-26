import { deepQueryAll } from "./dom-deep";
import { elementVisibleText } from "./live-card-stats";
import { enumerateDocuments } from "./enumerate-documents";

const AT_TRUNCATED =
  /(?:^|[\s\n\r(])(@[_]?[a-z0-9][a-z0-9._]{2,26})(?:…|\.{2,3}|\u2026)/gi;

export type LiveParseDebug = {
  documentsScanned: number;
  bodyChars: number;
  atTruncatedInBody: number;
  creatorIdMentions: number;
  titleWithHandle: number;
  bodySnippet: string;
};

export function collectLiveParseDebug(doc: Document = document): LiveParseDebug {
  const docs = enumerateDocuments(doc);
  let bodyChars = 0;
  let atTruncatedInBody = 0;
  let creatorIdMentions = 0;
  let titleWithHandle = 0;
  let bodySnippet = "";

  for (const d of docs) {
    const body = elementVisibleText(d.body ?? d.documentElement);
    bodyChars += body.length;
    if (!bodySnippet && body.length > 0) {
      bodySnippet = body.slice(0, 280).replace(/\s+/g, " ");
    }

    AT_TRUNCATED.lastIndex = 0;
    atTruncatedInBody += [...body.matchAll(AT_TRUNCATED)].length;
    creatorIdMentions += (body.match(/(?:creator\s*)?id\s*[:#]?\s*\d{4,}/gi) ?? []).length;

    for (const el of deepQueryAll(d, "[title]")) {
      const t = el.getAttribute("title") ?? "";
      if (/^[a-z0-9._]{2,24}$/i.test(t.trim())) titleWithHandle += 1;
    }
  }

  return {
    documentsScanned: docs.length,
    bodyChars,
    atTruncatedInBody,
    creatorIdMentions,
    titleWithHandle,
    bodySnippet,
  };
}
