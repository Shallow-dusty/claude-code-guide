import { PageHeader, Section, Callout, Code } from '../components'

function MemoryCompare() {
  const types = [
    {
      name: 'CLAUDE.md', sub: '用户指令', color: '#58a6ff', icon: '📝',
      traits: [
        { label: '作者', value: '用户手动编写' },
        { label: '目的', value: '告诉 Claude 如何工作' },
        { label: '行数限制', value: '无' },
        { label: '加载时机', value: '会话开始时' },
      ],
    },
    {
      name: 'MEMORY.md', sub: 'Claude 笔记', color: '#3fb950', icon: '🧠',
      traits: [
        { label: '作者', value: 'Claude 自动写入' },
        { label: '目的', value: '记录跨会话发现' },
        { label: '行数限制', value: '200 行（超出截断）' },
        { label: '加载时机', value: '注入 system prompt' },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {types.map(t => (
        <div key={t.name} className="rounded-xl border p-5 bg-[#161b22] relative overflow-hidden"
          style={{ borderColor: `${t.color}30` }}>
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-5" style={{ background: t.color }} />
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">{t.icon}</div>
            <div>
              <div className="text-sm font-bold font-mono" style={{ color: t.color }}>{t.name}</div>
              <div className="text-[10px] text-[#8b949e]">{t.sub}</div>
            </div>
          </div>
          <div className="space-y-2">
            {t.traits.map(tr => (
              <div key={tr.label} className="flex items-center justify-between">
                <span className="text-[10px] text-[#8b949e]">{tr.label}</span>
                <span className="text-[11px] text-[#e6edf3]">{tr.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function HierarchyVisual() {
  const levels = [
    { path: '~/.claude/CLAUDE.md', scope: '全局', color: '#58a6ff', w: 100 },
    { path: '<project>/CLAUDE.md', scope: '项目', color: '#3fb950', w: 70 },
    { path: '.claude/rules/*.md', scope: '补充规则', color: '#bc8cff', w: 45 },
  ]

  return (
    <div className="space-y-2">
      {levels.map(l => (
        <div key={l.path} className="flex items-center gap-3">
          <div className="h-8 rounded-md flex items-center px-3 text-xs font-mono"
            style={{ width: `${l.w}%`, background: `${l.color}10`, border: `1px solid ${l.color}25`, color: l.color }}>
            {l.path}
          </div>
          <span className="text-[10px] text-[#8b949e] shrink-0">{l.scope}</span>
        </div>
      ))}
    </div>
  )
}

function BestPractice() {
  const dos = ['稳定的模式和约定', '关键架构决策和文件路径', '用户工作流偏好', '常见问题的解决方案']
  const donts = ['当前任务的临时状态', '可能不完整的信息', '与 CLAUDE.md 重复的内容', '推测性或未验证的结论']

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-lg border border-[#3fb950]/25 bg-[#3fb950]/[0.03] p-4">
        <div className="text-xs font-semibold text-[#3fb950] mb-2">应该记录</div>
        {dos.map(d => (
          <div key={d} className="flex items-center gap-2 text-xs text-[#8b949e] py-0.5">
            <span className="text-[#3fb950]">✓</span> {d}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-[#f85149]/25 bg-[#f85149]/[0.03] p-4">
        <div className="text-xs font-semibold text-[#f85149] mb-2">不应该记录</div>
        {donts.map(d => (
          <div key={d} className="flex items-center gap-2 text-xs text-[#8b949e] py-0.5">
            <span className="text-[#f85149]">✗</span> {d}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Memory() {
  return (
    <div>
      <PageHeader title="持久化记忆系统" desc="让 Claude 跨会话记住上下文。" badge="Memory" />
      <Section title="两种记忆对比"><MemoryCompare /></Section>
      <Section title="CLAUDE.md 层级">
        <p className="text-xs text-[#8b949e] mb-3">条越宽 = 生效范围越广。</p>
        <HierarchyVisual />
      </Section>
      <Section title="MEMORY.md 最佳实践"><BestPractice /></Section>
      <Section title="存储位置">
        <Code lang="MEMORY.md 路径">{`~/.claude/projects/<路径哈希>/memory/MEMORY.md

例如家目录（/home/user）对应：
~/.claude/projects/-home-user/memory/MEMORY.md`}</Code>
        <Callout type="tip">超过 200 行会被截断。详细内容写入独立 topic 文件，MEMORY.md 中只保留链接。</Callout>
      </Section>
    </div>
  )
}