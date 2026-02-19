import { PageHeader, Section, Callout } from '../components'

const lifecycle = [
  { event: 'SessionStart', desc: '会话开始', phase: 'init', color: '#3fb950' },
  { event: 'UserPromptSubmit', desc: '用户发送消息', phase: 'input', color: '#58a6ff' },
  { event: 'PreToolUse', desc: '工具调用前', phase: 'tool', color: '#bc8cff' },
  { event: 'PermissionRequest', desc: '请求权限', phase: 'tool', color: '#d29922' },
  { event: 'PostToolUse', desc: '工具调用成功', phase: 'tool', color: '#3fb950' },
  { event: 'PostToolUseFailure', desc: '工具调用失败', phase: 'tool', color: '#f85149' },
  { event: 'SubagentStart', desc: '子 Agent 启动', phase: 'agent', color: '#79c0ff' },
  { event: 'SubagentStop', desc: '子 Agent 停止', phase: 'agent', color: '#79c0ff' },
  { event: 'TeammateIdle', desc: '团队成员空闲', phase: 'agent', color: '#79c0ff' },
  { event: 'TaskCompleted', desc: '任务完成', phase: 'agent', color: '#3fb950' },
  { event: 'Notification', desc: '系统通知', phase: 'misc', color: '#8b949e' },
  { event: 'PreCompact', desc: '上下文压缩前', phase: 'misc', color: '#d29922' },
  { event: 'Stop', desc: '主线程停止', phase: 'end', color: '#f85149' },
  { event: 'SessionEnd', desc: '会话结束', phase: 'end', color: '#f85149' },
]

const phases = {
  init: { label: '初始化', color: '#3fb950' },
  input: { label: '用户输入', color: '#58a6ff' },
  tool: { label: '工具执行', color: '#bc8cff' },
  agent: { label: 'Agent 协作', color: '#79c0ff' },
  misc: { label: '系统事件', color: '#8b949e' },
  end: { label: '会话结束', color: '#f85149' },
}

function Timeline() {
  let lastPhase = ''
  return (
    <div className="relative ml-4">
      {/* 时间轴线 */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[#3fb950] via-[#bc8cff] to-[#f85149]" />

      {lifecycle.map((e, i) => {
        const showPhase = e.phase !== lastPhase
        lastPhase = e.phase
        const ph = phases[e.phase]
        return (
          <div key={e.event}>
            {showPhase && (
              <div className="flex items-center gap-3 ml-8 mt-4 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: ph.color }}>{ph.label}</span>
                <div className="flex-1 h-px" style={{ background: `${ph.color}20` }} />
              </div>
            )}
            <div className="flex items-center gap-4 py-1.5 group">
              {/* 节点 */}
              <div className="relative z-10 w-7 h-7 rounded-full border-2 bg-[#0d1117] flex items-center justify-center shrink-0 transition-transform group-hover:scale-125"
                style={{ borderColor: e.color }}>
                <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
              </div>
              {/* 内容 */}
              <div className="flex-1 flex items-baseline gap-3">
                <code className="text-xs font-mono font-semibold" style={{ color: e.color }}>{e.event}</code>
                <span className="text-[11px] text-[#8b949e]">{e.desc}</span>
              </div>
              {/* 序号 */}
              <span className="text-[10px] text-[#30363d] font-mono shrink-0">{String(i + 1).padStart(2, '0')}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function HookFlow() {
  const steps = [
    { label: '事件触发', sub: 'PreToolUse / SessionStart / ...', color: '#58a6ff' },
    { label: 'matcher 匹配', sub: '匹配工具名（空=全部）', color: '#bc8cff' },
    { label: '执行 command', sub: 'shell 命令', color: '#3fb950' },
    { label: '结果反馈', sub: 'stdout → Claude 上下文', color: '#d29922' },
  ]
  return (
    <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center shrink-0">
          <div className="w-36 p-3 rounded-lg border bg-[#161b22] text-center"
            style={{ borderColor: `${s.color}30` }}>
            <div className="text-xs font-semibold" style={{ color: s.color }}>{s.label}</div>
            <div className="text-[10px] text-[#8b949e] mt-1">{s.sub}</div>
          </div>
          {i < steps.length - 1 && (
            <svg width="28" height="20" className="shrink-0 mx-1">
              <path d="M2 10 L22 10 M18 5 L24 10 L18 15" fill="none" stroke="#30363d" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

function StorageMap() {
  const locations = [
    { path: '~/.claude/settings.json → hooks', scope: '全局', color: '#58a6ff', w: 100 },
    { path: '.claude/settings.json → hooks', scope: '项目', color: '#3fb950', w: 70 },
    { path: 'SKILL.md frontmatter → hooks', scope: 'Skill 激活期间', color: '#bc8cff', w: 45 },
  ]
  return (
    <div className="space-y-2">
      {locations.map((l, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 rounded-md flex items-center px-3 text-xs font-mono"
            style={{
              width: `${l.w}%`,
              background: `${l.color}10`,
              border: `1px solid ${l.color}25`,
              color: l.color,
            }}>
            {l.path}
          </div>
          <span className="text-[10px] text-[#8b949e] shrink-0">{l.scope}</span>
        </div>
      ))}
    </div>
  )
}

export default function Hooks() {
  return (
    <div>
      <PageHeader
        title="Hooks 系统"
        desc="事件驱动的自定义逻辑。14 个事件覆盖会话完整生命周期。"
        badge="Hooks"
      />

      <Section title="会话生命周期时间轴">
        <p className="text-xs text-[#8b949e] mb-4">从会话开始到结束，14 个事件按触发顺序排列。悬停查看详情。</p>
        <Timeline />
      </Section>

      <Section title="Hook 执行流程">
        <HookFlow />
      </Section>

      <Section title="存储位置与生效范围">
        <StorageMap />
        <Callout type="warn">
          Plugin 提供的 Hooks 随插件禁用而失效。
        </Callout>
      </Section>
    </div>
  )
}
