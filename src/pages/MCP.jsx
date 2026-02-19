import { PageHeader, Section, Callout, Code } from '../components'

function TransportCompare() {
  const types = [
    {
      name: 'stdio', label: '本地进程', color: '#3fb950',
      traits: ['启动本地子进程', '通过 stdin/stdout 通信', '随 Claude Code 退出而终止', '需要本地安装依赖'],
      example: 'npx @playwright/mcp',
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <rect x="8" y="6" width="24" height="28" rx="3" fill="none" stroke="#3fb950" strokeWidth="1.5" />
          <line x1="14" y1="14" x2="26" y2="14" stroke="#3fb950" strokeWidth="1" opacity="0.5" />
          <line x1="14" y1="19" x2="22" y2="19" stroke="#3fb950" strokeWidth="1" opacity="0.5" />
          <line x1="14" y1="24" x2="24" y2="24" stroke="#3fb950" strokeWidth="1" opacity="0.5" />
          <circle cx="30" cy="30" r="6" fill="#0d1117" stroke="#3fb950" strokeWidth="1.5" />
          <text x="30" y="33" textAnchor="middle" fill="#3fb950" fontSize="8" fontFamily="monospace">$</text>
        </svg>
      ),
    },
    {
      name: 'http', label: '远程服务', color: '#58a6ff',
      traits: ['连接远程 HTTP 端点', '通过 HTTP/SSE 通信', '服务独立运行', '无需本地依赖'],
      example: 'https://mcp.cloudflare.com',
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <circle cx="20" cy="20" r="14" fill="none" stroke="#58a6ff" strokeWidth="1.5" />
          <ellipse cx="20" cy="20" rx="7" ry="14" fill="none" stroke="#58a6ff" strokeWidth="0.8" opacity="0.4" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="#58a6ff" strokeWidth="0.8" opacity="0.4" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {types.map(t => (
        <div key={t.name} className="rounded-xl border p-5 bg-[#161b22] relative overflow-hidden"
          style={{ borderColor: `${t.color}30` }}>
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5" style={{ background: t.color }} />
          <div className="flex items-center gap-3 mb-4">
            {t.icon}
            <div>
              <div className="text-sm font-bold" style={{ color: t.color }}>{t.name}</div>
              <div className="text-[10px] text-[#8b949e]">{t.label}</div>
            </div>
          </div>
          <div className="space-y-1.5 mb-3">
            {t.traits.map((tr, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#8b949e]">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: t.color }} />
                {tr}
              </div>
            ))}
          </div>
          <code className="text-[10px] px-2 py-1 rounded bg-[#0d1117] block" style={{ color: `${t.color}99` }}>{t.example}</code>
        </div>
      ))}
    </div>
  )
}

function ScopeStack() {
  const layers = [
    { name: 'local', file: '~/.claude.json → projects.<路径>', desc: '仅本机此项目', color: '#f85149', z: 3 },
    { name: 'project', file: '.claude/settings.json', desc: '项目所有协作者', color: '#d29922', z: 2 },
    { name: 'user', file: '~/.claude.json → mcpServers', desc: '你的所有项目', color: '#58a6ff', z: 1 },
  ]

  return (
    <div className="space-y-3 max-w-md mx-auto py-4">
      {layers.map((l, i) => (
        <div key={l.name} className="relative group">
          {i < layers.length - 1 && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 text-[10px] text-[#8b949e]">▼ 覆盖</div>
          )}
          <div className="rounded-lg border p-4 transition-all group-hover:translate-x-1"
            style={{ borderColor: `${l.color}40`, background: `linear-gradient(135deg, ${l.color}08, ${l.color}03)` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                  style={{ background: `${l.color}20`, color: l.color }}>{l.z}</div>
                <span className="text-sm font-mono font-semibold" style={{ color: l.color }}>{l.name}</span>
              </div>
              <span className="text-[10px] text-[#8b949e]">{l.desc}</span>
            </div>
            <div className="mt-2 text-[10px] font-mono text-[#8b949e] pl-8">{l.file}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AuthFlow() {
  const methods = [
    { type: 'stdio', auth: '本地凭证', desc: '读取 ~/.config 或环境变量中的 API Key', color: '#3fb950' },
    { type: 'http', auth: 'OAuth 2.0', desc: '浏览器跳转授权，token 存储在 ~/.claude.json', color: '#58a6ff' },
    { type: 'http', auth: 'Header Token', desc: '在 headers 中携带 API Key', color: '#d29922' },
  ]

  return (
    <div className="space-y-2">
      {methods.map((m, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[#30363d] bg-[#161b22]">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded shrink-0"
            style={{ background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}30` }}>{m.type}</span>
          <div className="flex-1">
            <div className="text-xs font-semibold text-[#e6edf3]">{m.auth}</div>
            <div className="text-[10px] text-[#8b949e]">{m.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MCP() {
  return (
    <div>
      <PageHeader title="MCP 系统" desc="Model Context Protocol — 给 Claude 接入外部工具的标准协议。" badge="MCP" />
      <Section title="传输类型对比"><TransportCompare /></Section>
      <Section title="Scope 优先级堆叠">
        <p className="text-xs text-[#8b949e] mb-3">同名 MCP 存在时，高层覆盖低层。数字越大 = 优先级越高。</p>
        <ScopeStack />
        <Callout type="info">Plugin 提供的 MCP 独立管理，不在此优先级链中。禁用插件即失效。</Callout>
      </Section>
      <Section title="认证方式"><AuthFlow /></Section>
      <Section title="配置示例">
        <Code lang="~/.claude.json">{`{
  "mcpServers": {
    "playwright": { "type": "stdio", "command": "npx", "args": ["@playwright/mcp@latest"] },
    "cloudflare": { "type": "http", "url": "https://bindings.mcp.cloudflare.com/mcp" }
  }
}`}</Code>
      </Section>
    </div>
  )
}