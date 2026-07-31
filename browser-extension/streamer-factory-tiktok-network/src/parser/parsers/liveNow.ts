import { extractLiveNowRowsFromPage } from "../extractLiveNow";
import { collectLiveParseDebug } from "../live-parse-debug";
import type { PageParseContext, PageParseResult } from "../pageSpecs/types";

export function parseLiveNowPage(ctx: PageParseContext): PageParseResult & {
  liveParseDebug?: ReturnType<typeof collectLiveParseDebug>;
} {
  const liveRows = extractLiveNowRowsFromPage(ctx.doc);
  return {
    rows: [],
    liveRows,
    headersFound: ctx.headersFound,
    metricsAvailable: liveRows.length > 0 ? ["live_presence", "viewer_count", "live_started"] : [],
    liveParseDebug: liveRows.length === 0 ? collectLiveParseDebug(ctx.doc) : undefined,
  };
}
