// Shared UI components

export function PageHeader({ title, desc, badge }) {
  return (
    <div className="mb-8">
      {badge && <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 mb-3">{badge}</span>}
      <h1 className="text-2xl font-bold text-[#e6edf3] mb-2">{title}</h1>
      <p className="text-[#8b949e] leading-relaxed">{desc}</p>
    </div>
  )
}

export function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-base font-semibold text-[#e6edf3] mb-4 pb-2 border-b border-[#21262d]">{title}</h2>
      {children}
    </section>
  )
}

export function Code({ children, lang = '' }) {
  return (
    <div className="rounded-lg border border-[#30363d] overflow-hidden mb-4">
      {lang && <div className="px-4 py-1.5 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e] font-mono">{lang}</div>}
      <pre className="p-4 bg-[#0d1117] text-sm text-[#e6edf3] font-mono overflow-x-auto leading-relaxed whitespace-pre">{children}</pre>
    </div>
  )
}

export function Table({ headers, rows }) {
  return (
    <div className="rounded-lg border border-[#30363d] overflow-hidden mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#161b22] border-b border-[#30363d]">
            {headers.map(h => <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wide">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#21262d] last:border-0 hover:bg-[#161b22]/50">
              {row.map((cell, j) => <td key={j} className="px-4 py-2.5 text-[#e6edf3]">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Badge({ color = 'blue', children }) {
  const colors = {
    blue: 'bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/20',
    green: 'bg-[#3fb950]/10 text-[#3fb950] border-[#3fb950]/20',
    orange: 'bg-[#d29922]/10 text-[#d29922] border-[#d29922]/20',
    purple: 'bg-[#bc8cff]/10 text-[#bc8cff] border-[#bc8cff]/20',
    red: 'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/20',
  }
  return <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-mono border ${colors[color]}`}>{children}</span>
}

export function Callout({ type = 'info', children }) {
  const styles = {
    info: 'border-[#58a6ff]/30 bg-[#58a6ff]/5 text-[#58a6ff]',
    warn: 'border-[#d29922]/30 bg-[#d29922]/5 text-[#d29922]',
    tip: 'border-[#3fb950]/30 bg-[#3fb950]/5 text-[#3fb950]',
  }
  return (
    <div className={`rounded-lg border p-4 mb-4 text-sm leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  )
}

export function ScopeChain({ items }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className={`px-3 py-1.5 rounded-md text-xs font-mono border ${item.active ? 'bg-[#58a6ff]/15 text-[#58a6ff] border-[#58a6ff]/30' : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'}`}>
            {item.label}
          </span>
          {i < items.length - 1 && <span className="text-[#8b949e] text-xs">›</span>}
        </span>
      ))}
      <span className="text-xs text-[#8b949e] ml-1">（左高右低）</span>
    </div>
  )
}
