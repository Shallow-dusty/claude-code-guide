import { PageHeader, Section, Callout, Code } from '../components'

function FileMap() {
  const files = [
    { path: '~/.claude/settings.json', role: '全局设置', items: ['enabledPlugins', 'permissions', 'hooks', 'language'], color: '#58a6ff', scope: 'global' },
    { path: '~/.claude.json', role: 'MCP 注册表', items: ['user scope MCP', 'local scope MCP（按项目路径）'], color: '#3fb950', scope: 'global' },
    { path: '~/.claude/plugins/installed_plugins.json', role: '插件注册表', items: ['已安装插件路径', '版本', 'scope'], color: '#d29922', scope: 'global' },
    { path: '.claude/settings.json', role: '项目设置', items: ['项目 MCP', '权限覆盖'], color: '#bc8cff', scope: 'project' },
    { path: '~/.claude/CLAUDE.md', role: '全局用户指令', items: ['对所有项目生效'], color: '#79c0ff', scope: 'global' },
    { path: '<project>/CLAUDE.md', role: '项目用户指令', items: ['仅当前项目'], color: '#79c0ff', scope: 'project' },
    { path: '~/.claude/projects/.../MEMORY.md', role: 'Claude 自动记忆', items: ['200 行上限', '自动写入'], color: '#f85149', scope: 'auto' },
  ]

  const scopeColors = { global: '#58a6ff', project: '#3fb950', auto: '#d29922' }
  const scopeLabels = { global: '全局', project: '项目', auto: '自动' }

  return (
    <div className="space-y-2">
      {files.map(f => (
        <div key={f.path} className="rounded-lg border bg-[#161b22] overflow-hidden group hover:border-opacity-60 transition-all"
          style={{ borderColor: `${f.color}25` }}>
          <div className="flex items-center gap-3 px-4 py-2.5">
            {/* scope 标签 */}
            <span className="text-[9px] px-1.5 py-0.5 rounded shrink-0 font-mono"
              style={{ background: `${scopeColors[f.scope]}15`, color: scopeColors[f.scope], border: `1px solid ${scopeColors[f.scope]}25` }}>
              {scopeLabels[f.scope]}
            </span>
            {/* 文件路径 */}
            <code className="text-[11px] font-mono font-semibold flex-1 truncate" style={{ color: f.color }}>{f.path}</code>
            {/* 角色 */}
            <span className="text-[10px] text-[#8b949e] shrink-0">{f.role}</span>
          </div>
          {/* 展开内容 */}
          <div className="px-4 pb-2.5 flex flex-wrap gap-1.5">
            {f.items.map(item => (
              <span key={item} className="text-[9px] px-1.5 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#21262d]">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PriorityDiagram() {
  const chains = [
    {
      system: 'MCP', color: '#58a6ff',
      levels: ['local（projects.<路径>）', 'project（.claude/settings.json）', 'user（mcpServers 顶层）'],
    },
    {
      system: 'Skills', color: '#3fb950',
      levels: ['Enterprise', 'Personal', 'Project', 'Plugin'],
    },
    {
      system: 'Plugin', color: '#d29922',
      levels: ['user = 所有项目', 'project = 指定路径', 'local = 本机此项目'],
    },
  ]

  return (
    <div className="space-y-4">
      {chains.map(c => (
        <div key={c.system}>
          <div className="text-xs font-semibold mb-1.5" style={{ color: c.color }}>{c.system}</div>
          <div className="flex items-center gap-0 overflow-x-auto pb-1">
            {c.levels.map((l, i) => (
              <div key={i} className="flex items-center shrink-0">
                <div className="px-3 py-1.5 rounded-md text-[10px] font-mono border"
                  style={{
                    borderColor: i === 0 ? `${c.color}50` : `${c.color}20`,
                    background: i === 0 ? `${c.color}15` : `${c.color}05`,
                    color: i === 0 ? c.color : '#8b949e',
                  }}>{l}</div>
                {i < c.levels.length - 1 && <span className="text-[10px] text-[#30363d] mx-1">›</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ConfigFiles() {
  return (
    <div>
      <PageHeader title="配置文件全景" desc="所有配置文件的作用、scope 和关系。" badge="Config" />
      <Section title="文件地图">
        <p className="text-xs text-[#8b949e] mb-3">按 scope 分类，展示每个文件的职责。</p>
        <FileMap />
      </Section>
      <Section title="优先级链">
        <p className="text-xs text-[#8b949e] mb-3">左侧 = 最高优先级。</p>
        <PriorityDiagram />
      </Section>
      <Section title="settings.json 结构">
        <Code lang="~/.claude/settings.json">{`{
  "enabledPlugins": { "context7@claude-plugins-official": true },
  "permissions": { "allow": ["Bash(git *)", "WebSearch"], "deny": [] },
  "hooks": { "SessionStart": [...], "PreToolUse": [...] },
  "language": "zh-CN"
}`}</Code>
        <Callout type="info">settings.json 支持热重载（v1.0.90+），修改后无需重启。</Callout>
      </Section>
    </div>
  )
}