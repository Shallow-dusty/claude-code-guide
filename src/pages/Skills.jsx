import { PageHeader, Section, Callout, Code } from '../components'

function ScopePyramid() {
  const levels = [
    { name: 'Enterprise', desc: '组织内所有用户', color: '#f85149', w: 35 },
    { name: 'Personal', desc: '你的所有项目', color: '#d29922', w: 55 },
    { name: 'Project', desc: '当前项目', color: '#3fb950', w: 75 },
    { name: 'Plugin', desc: '插件命名空间', color: '#8b949e', w: 95 },
  ]
  return (
    <div className="flex flex-col items-center gap-1 py-4">
      <div className="text-[10px] text-[#f85149] mb-1">← 最高优先级</div>
      {levels.map(l => (
        <div key={l.name} className="relative group w-full flex justify-center">
          <div className="h-10 rounded-md flex items-center justify-center gap-3 px-4 transition-all group-hover:scale-[1.02]"
            style={{ width: `${l.w}%`, background: `${l.color}10`, border: `1px solid ${l.color}30` }}>
            <span className="text-xs font-mono font-semibold" style={{ color: l.color }}>{l.name}</span>
            <span className="text-[10px] text-[#8b949e]">{l.desc}</span>
          </div>
        </div>
      ))}
      <div className="text-[10px] text-[#8b949e] mt-1">最低优先级 →</div>
    </div>
  )
}

function InvocationFlow() {
  const renderFlow = (items, label, color) => (
    <div>
      <div className="text-xs font-semibold mb-2" style={{ color }}>{label}</div>
      <div className="flex items-center gap-0 overflow-x-auto pb-1">
        {items.map((s, i) => (
          <div key={i} className="flex items-center shrink-0">
            <div className="w-28 p-2.5 rounded-lg border bg-[#161b22] text-center" style={{ borderColor: `${s.color}30` }}>
              <div className="text-[10px] font-semibold" style={{ color: s.color }}>{s.label}</div>
              <div className="text-[9px] text-[#8b949e] mt-0.5">{s.sub}</div>
            </div>
            {i < items.length - 1 && (
              <svg width="20" height="16" className="shrink-0 mx-0.5">
                <path d="M2 8 L15 8 M12 4 L17 8 L12 12" fill="none" stroke="#30363d" strokeWidth="1.2" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="space-y-5">
      {renderFlow([
        { label: '用户输入', sub: '/deploy prod', color: '#58a6ff' },
        { label: 'Skill 加载', sub: 'SKILL.md 全文', color: '#bc8cff' },
        { label: '执行指令', sub: '按步骤运行', color: '#3fb950' },
      ], '手动调用 /command', '#3fb950')}
      {renderFlow([
        { label: '用户消息', sub: '"帮我部署"', color: '#58a6ff' },
        { label: 'description 匹配', sub: 'Claude 判断', color: '#d29922' },
        { label: 'Skill 加载', sub: 'SKILL.md 全文', color: '#bc8cff' },
        { label: '执行指令', sub: '按步骤运行', color: '#3fb950' },
      ], 'Claude 自动触发', '#d29922')}
    </div>
  )
}

function FrontmatterVisual() {
  const fields = [
    { key: 'name', val: 'deploy', desc: '/slash-command 名' },
    { key: 'description', val: '"部署应用..."', desc: 'Claude 自动触发依据' },
    { key: 'allowed-tools', val: 'Bash(npm *)', desc: '免审批工具' },
    { key: 'context', val: 'fork', desc: '独立子 agent 运行' },
    { key: 'agent', val: 'general-purpose', desc: 'fork 时的 agent 类型' },
    { key: 'disable-model-invocation', val: 'true', desc: '禁止 Claude 自动调用' },
  ]
  return (
    <div className="rounded-xl border border-[#30363d] overflow-hidden">
      <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs text-[#8b949e] font-mono">SKILL.md frontmatter</div>
      <div className="p-4 bg-[#0d1117] space-y-1">
        <div className="text-xs text-[#8b949e] font-mono">---</div>
        {fields.map(f => (
          <div key={f.key} className="flex items-center gap-2 group">
            <span className="text-xs font-mono text-[#bc8cff]">{f.key}:</span>
            <span className="text-xs font-mono text-[#e6edf3]">{f.val}</span>
            <span className="text-[9px] text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity ml-auto">{f.desc}</span>
          </div>
        ))}
        <div className="text-xs text-[#8b949e] font-mono">---</div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <div>
      <PageHeader title="Skills 系统" desc="可复用的工作流定义。通过 SKILL.md 描述，支持手动和自动两种调用方式。" badge="Skills" />
      <Section title="Scope 优先级金字塔">
        <p className="text-xs text-[#8b949e] mb-2">同名 Skill 存在时，上层覆盖下层。Plugin 使用独立命名空间不冲突。</p>
        <ScopePyramid />
      </Section>
      <Section title="调用流程对比">
        <InvocationFlow />
        <Callout type="tip">手动调用适合有副作用的操作（部署、提交）。自动触发适合知识类 Skill。</Callout>
      </Section>
      <Section title="SKILL.md 结构">
        <p className="text-xs text-[#8b949e] mb-3">悬停字段查看说明。</p>
        <FrontmatterVisual />
      </Section>
      <Section title="存储路径">
        <Code lang="Skill 文件位置">{`~/.claude/skills/<name>/SKILL.md    # Personal scope
.claude/skills/<name>/SKILL.md      # Project scope
<plugin>/skills/<name>/SKILL.md     # Plugin scope`}</Code>
      </Section>
    </div>
  )
}