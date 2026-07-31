import type { PrintBlock } from "@/lib/streameru-library/types";

function FillLine({ label, rows = 1 }: { label: string; rows?: number }) {
  return (
    <div className="su-print-fill">
      <p className="su-print-fill-label">{label}</p>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="su-print-line" />
      ))}
    </div>
  );
}

export function PrintBlockView({ block }: { block: PrintBlock }) {
  switch (block.type) {
    case "intro":
      return <p className="su-print-intro">{block.text}</p>;
    case "callout":
      return (
        <aside className="su-print-callout" role="note">
          {block.text}
        </aside>
      );
    case "checkbox_list":
      return (
        <section className="su-print-section">
          {block.title ? <h3 className="su-print-h3">{block.title}</h3> : null}
          <ul className="su-print-checks">
            {block.items.map((item) => (
              <li key={item}>
                <span className="su-print-box" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    case "fill_lines":
      return (
        <section className="su-print-section">
          {block.title ? <h3 className="su-print-h3">{block.title}</h3> : null}
          <div className="su-print-fills">
            {block.lines.map((line) => (
              <FillLine key={line.label} label={line.label} rows={line.rows} />
            ))}
          </div>
        </section>
      );
    case "table":
      return (
        <section className="su-print-section">
          {block.title ? <h3 className="su-print-h3">{block.title}</h3> : null}
          {block.hint ? <p className="su-print-hint">{block.hint}</p> : null}
          <table className="su-print-table">
            <thead>
              <tr>
                {block.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: block.rows }, (_, ri) => (
                <tr key={ri}>
                  {block.columns.map((col) => (
                    <td key={`${ri}-${col}`}>&nbsp;</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    case "timed_segments":
      return (
        <section className="su-print-section">
          {block.title ? <h3 className="su-print-h3">{block.title}</h3> : null}
          <ol className="su-print-segments">
            {block.segments.map((seg) => (
              <li key={seg.label}>
                <div className="su-print-seg-meta">
                  <span className="su-print-seg-time">{seg.minutes}</span>
                  <span className="su-print-seg-label">{seg.label}</span>
                </div>
                <p className="su-print-seg-prompt">{seg.prompt}</p>
                <div className="su-print-line su-print-line-short" />
              </li>
            ))}
          </ol>
        </section>
      );
    case "notes":
      return (
        <section className="su-print-section">
          <h3 className="su-print-h3">{block.title ?? "Notes"}</h3>
          <div className="su-print-fills">
            {Array.from({ length: block.lines ?? 4 }, (_, i) => (
              <div key={i} className="su-print-line" />
            ))}
          </div>
        </section>
      );
    default:
      return null;
  }
}
