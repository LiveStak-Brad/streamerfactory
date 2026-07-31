/**
 * Workspace overview — preview only. Never syncs creator metric rows.
 */
import type { PageParseContext, PageParseResult } from "../pageSpecs/types";

export function parseWorkspacePage(_ctx: PageParseContext): PageParseResult {
  return {
    rows: [],
    liveRows: [],
    headersFound: _ctx.headersFound,
    metricsAvailable: [],
  };
}
