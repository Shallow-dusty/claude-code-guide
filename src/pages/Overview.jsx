import { Link } from 'react-router-dom'
import { PageHeader, Section, Callout } from '../components'

const systems = [
  { id: 'mcp', label: 'MCP', sub: '外部工具接入', color: '#58a6ff', to: '/mcp', x: 50, y: 8 },
  { id: 'skills', label: 'Skills', sub: '工作流定义', color: '#3fb950', to: '/skills', x: 88, y: 50 },
  { id: 'hooks', label: 'Hooks', sub: '事件拦截', color: '#bc8cff', to: '/hooks', x: 50, y: 92 },
  { id: 'plugins', label: 'Plugin', sub: '打包分发', color: '#d29922', to: '/plugins', x: 12, y: 50 },
]

function ArchDiagram() {
  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square mb-8">
      {/* 连接线 SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {systems.map(s => (
          <line key={s.id} x1="50" y1="50" x2={s.x} y2={s.y}
            stroke={s.color} strokeWidth="0.3" strokeDasharray="1.5 1" opacity="0.5" />
        ))}
        {/* Plugin 到其他三个的虚线（打包关系） */}
        {['mcp', 'skills', 'hooks'].map(id => {
          const t = systems.find(s => s.id === id)
          return (
            <line key={`p-${id}`} x1={12} y1={50} x2={t.x} y2={t.y}
              stroke="#d29922" strokeWidth="0.15" strokeDasharray="0.8 0.8" opacity="0.25" />
          )
        })}
        {/* 中心光晕 */}
        <circle cx="50" cy="50" r="12" fill="url(#glow)" />
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#58a6ff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* 中心节点 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-28 h-28 rounded-full border-2 border-[#58a6ff]/40 bg-[#0d1117] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(88,166,255,0.15)]">
          <div className="text-lg font-bold text-[#e6edf3]">Claude</div>
          <div className="text-xs text-[#58a6ff]">Code</div>
        </div>
      </div>

      {/* 四个系统节点 */}
      {systems.map(s => (
        <Link key={s.id} to={s.to}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <div className="px-4 py-3 rounded-xl border bg-[#161b22] transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
            style={{ borderColor: `${s.color}40`, boxShadow: `0 0 0 0 ${s.color}00` }}>
            <div className="text-sm font-bold text-center" style={{ color: s.color }}>{s.label}</div>
            <div className="text-[10px] text-[#8b949e] text-center whitespace-nowrap">{s.sub}</div>
          </div>
        </Link>
      ))}

      {/* Plugin 打包标注 */}
      <div className="absolute left-[5%] top-[34%] text-[9px] text-[#d29922]/50 -rotate-12">可打包 ↗</div>
      <div className="absolute left-[5%] top-[62%] text-[9px] text-[#d29922]/50 rotate-12">可打包 ↘</div>
    </div>
  )
}

function ScopeCompare() {
  const scopes = [
    {
      system: 'MCP', color: '#58a6ff',
      levels: [
        { name: 'local', desc: '项目+本机', w: 40 },
        { name: 'project', desc: '项目级', w: 65 },
        { name: 'user', desc: '全局', w: 90 },
      ]
    },
    {
      system: 'Skills', color: '#3fb950',
      levels: [
        { name: 'Enterprise', desc: '组织', w: 30 },
        { name: 'Personal', desc: '个人', w: 50 },
        { name: 'Project', desc: '项目', w: 70 },
        { name: 'Plugin', desc: '插件', w: 90 },
      ]
    },
    {
      system: 'Plugin', color: '#d29922',
      levels: [
        { name: 'user', desc: '所有项目', w: 50 },
        { name: 'project', desc: '当前项目', w: 75 },
        { name: 'local', desc: '本机此项目', w: 100 },
      ]
    },
  ]

  return (
    <div className="space-y-6">
      {scopes.map(s => (
        <div key={s.system}>
          <div className="text-xs font-semibold mb-2" style={{ color: s.color }}>{s.system} Scope</div>
          <div className="space-y-1.5">
            {s.levels.map((l, i) => (
              <div key={l.name} className="flex items-center gap-3">
                <div className="relative h-7 rounded-md flex items-center px-3 text-xs font-mono transition-all"
                  style={{
                    width: `${l.w}%`,
                    background: `${s.color}${i === 0 ? '25' : '10'}`,
                    border: `1px solid ${s.color}${i === 0 ? '50' : '20'}`,
                    color: i === 0 ? s.color : '#8b949e',
                  }}>
                  {l.name}
                  {i === 0 && <span className="ml-auto text-[10px] opacity-60">← 最高优先级</span>}
                </div>
                <span className="text-[10px] text-[#8b949e] shrink-0">{l.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Overview() {
  return (
    <div>
      <PageHeader
        title="Claude Code 配置体系"
        desc="四大系统的关系与层级一览。"
        badge="v2.1.45"
      />

      <Section title="架构关系图">
        <p className="text-xs text-[#8b949e] text-center mb-4">点击节点进入详情 · Plugin 可打包其他三个系统</p>
        <ArchDiagram />
        <Callout type="info">
          MCP、Skills、Hooks 是独立功能系统。Plugin 是打包容器，将它们组合成可分发单元。
        </Callout>
      </Section>

      <Section title="Scope 层级对比">
        <p className="text-xs text-[#8b949e] mb-4">三个系统各有独立的 scope 体系。条越窄 = 优先级越高。</p>
        <ScopeCompare />
      </Section>
    </div>
  )
}
