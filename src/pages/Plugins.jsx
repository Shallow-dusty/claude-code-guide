import { PageHeader, Section, Callout } from '../components'

function ComponentBreakdown() {
  const components = [
    { name: '.mcp.json', desc: 'MCP 服务器', color: '#58a6ff', icon: '⚡' },
    { name: 'skills/', desc: '工作流定义', color: '#3fb950', icon: '📋' },
    { name: 'hooks/', desc: '事件拦截', color: '#bc8cff', icon: '🪝' },
    { name: 'agents/', desc: 'Agent 配置', color: '#d29922', icon: '🤖' },
    { name: 'commands/', desc: '旧式 Skills', color: '#8b949e', icon: '📁' },
    { name: '.lsp.json', desc: 'LSP 服务器', color: '#79c0ff', icon: '🔤' },
  ]
  return (
    <div className="rounded-xl border-2 border-dashed border-[#d29922]/40 p-6 bg-[#d29922]/[0.02]">
      <div className="text-center mb-5">
        <span className="text-xs font-semibold text-[#d29922] bg-[#d29922]/10 px-3 py-1 rounded-full border border-[#d29922]/20">Plugin 容器</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {components.map(c => (
          <div key={c.name} className="p-3 rounded-lg border bg-[#161b22] text-center group hover:scale-105 transition-transform"
            style={{ borderColor: `${c.color}25` }}>
            <div className="text-lg mb-1">{c.icon}</div>
            <div className="text-[11px] font-mono font-semibold" style={{ color: c.color }}>{c.name}</div>
            <div className="text-[9px] text-[#8b949e] mt-0.5">{c.desc}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4 text-[10px] text-[#8b949e]">每个组件都是可选的 — 一个插件可以只包含其中一种</div>
    </div>
  )
}

function ScopeVisual() {
  const scopes = [
    { name: 'user', file: '~/.claude/settings.json', desc: '你的所有项目', icon: '👤', git: undefined },
    { name: 'project', file: '.claude/settings.json', desc: '仓库所有协作者', icon: '📂', git: true },
    { name: 'local', file: '.claude/settings.local.json', desc: '仅本机此项目', icon: '💻', git: false },
  ]
  return (
    <div className="space-y-3">
      {scopes.map(s => (
        <div key={s.name} className="flex items-center gap-4 p-3 rounded-lg border border-[#30363d] bg-[#161b22]">
          <div className="text-xl shrink-0">{s.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[#d29922]">{s.name}</span>
              {s.git !== undefined && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${s.git ? 'bg-[#3fb950]/10 text-[#3fb950]' : 'bg-[#f85149]/10 text-[#f85149]'}`}>
                  {s.git ? '提交到 git' : 'gitignored'}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#8b949e] mt-0.5 truncate">{s.file}</div>
          </div>
          <div className="text-[10px] text-[#8b949e] shrink-0">{s.desc}</div>
        </div>
      ))}
    </div>
  )
}

function PluginLifecycle() {
  const steps = [
    { label: '安装', sub: 'claude plugin add', color: '#58a6ff' },
    { label: '缓存', sub: '~/.claude/plugins/cache/', color: '#8b949e' },
    { label: '启用', sub: 'enabledPlugins: true', color: '#3fb950' },
    { label: '加载', sub: 'MCP/Skills/Hooks 生效', color: '#d29922' },
  ]
  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center shrink-0">
          <div className="w-32 p-3 rounded-lg border bg-[#161b22] text-center" style={{ borderColor: `${s.color}30` }}>
            <div className="text-xs font-semibold" style={{ color: s.color }}>{s.label}</div>
            <div className="text-[9px] text-[#8b949e] mt-1 font-mono">{s.sub}</div>
          </div>
          {i < steps.length - 1 && (
            <svg width="24" height="16" className="shrink-0 mx-1">
              <path d="M2 8 L18 8 M14 4 L20 8 L14 12" fill="none" stroke="#30363d" strokeWidth="1.2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Plugins() {
  return (
    <div>
      <PageHeader title="Plugin 系统" desc="打包容器 — 将 MCP、Skills、Hooks、Agents 组合成可分发单元。" badge="Plugin" />
      <Section title="插件组件分解"><ComponentBreakdown /></Section>
      <Section title="插件 Scope">
        <ScopeVisual />
        <Callout type="tip">个人开发者推荐 user scope。团队共享用 project scope。local scope 适合本机专属覆盖。</Callout>
      </Section>
      <Section title="插件生命周期">
        <PluginLifecycle />
        <Callout type="warn">从 enabledPlugins 移除只是禁用，不删除缓存。插件 MCP 独立管理，不在 local/project/user scope 链中。</Callout>
      </Section>
    </div>
  )
}