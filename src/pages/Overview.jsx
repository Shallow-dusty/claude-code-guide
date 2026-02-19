import { PageHeader, Section, Code, Table, Badge, ScopeChain, Callout } from '../components'
import { Link } from 'react-router-dom'

export default function Overview() {
  return (
    <div>
      <PageHeader
        title="Claude Code 配置体系"
        desc="Claude Code 是一个可扩展的 AI 开发平台。其配置体系由功能层和打包层两部分构成，理解它们的关系是掌握整个系统的关键。"
        badge="v2.1.45"
      />

      <Section title="整体架构">
        <Code lang="架构图">
{`功能层（独立存在，也可被 Plugin 打包）
├── MCP 系统      → 给 Claude 接入外部工具（数据库、API、浏览器）
├── Skills 系统   → 定义可复用的工作流（/slash-command）
├── Hooks 系统    → 在操作前后插入自定义逻辑
└── 持久化记忆    → 让 Claude 跨会话记住上下文

打包层
└── Plugin 系统   → 将上述功能打包成可分发单元`}
        </Code>
        <Callout type="info">
          Plugin 不是独立的功能系统，而是打包容器。MCP、Skills、Hooks 可以独立存在，也可以被 Plugin 打包后分发。
        </Callout>
      </Section>

      <Section title="各系统速览">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { to: '/mcp', title: 'MCP 系统', desc: '外部工具接入协议。分 stdio（本地进程）和 http（远程服务器）两种传输类型，有 local/project/user 三级 scope。', color: '#58a6ff' },
            { to: '/skills', title: 'Skills 系统', desc: '可复用工作流，通过 SKILL.md 定义。有 Enterprise/Personal/Project/Plugin 四级 scope，同名时高优先级覆盖。', color: '#3fb950' },
            { to: '/plugins', title: 'Plugin 系统', desc: '打包容器，可包含 .mcp.json、skills/、hooks/、agents/ 四种组件。通过 enabledPlugins 控制是否生效。', color: '#d29922' },
            { to: '/hooks', title: 'Hooks 系统', desc: '事件驱动的自定义逻辑。在 PreToolUse、PostToolUse、SessionStart 等事件触发时执行 shell 命令。', color: '#bc8cff' },
            { to: '/config', title: '配置文件', desc: '系统由多个配置文件协同工作：settings.json、.claude.json、installed_plugins.json 等各司其职。', color: '#f85149' },
            { to: '/memory', title: '持久化记忆', desc: 'CLAUDE.md（用户写给 Claude 的指令）+ MEMORY.md（Claude 自动写的笔记，200 行上限）。', color: '#79c0ff' },
          ].map(({ to, title, desc, color }) => (
            <Link key={to} to={to} className="block p-4 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#58a6ff]/40 transition-colors group">
              <div className="text-sm font-semibold mb-1.5 group-hover:text-[#58a6ff] transition-colors" style={{ color }}>{title}</div>
              <div className="text-xs text-[#8b949e] leading-relaxed">{desc}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Scope 体系对比">
        <Callout type="warn">
          三个系统各有独立的 scope 体系，语义不同，不要混淆。
        </Callout>
        <Table
          headers={['系统', 'Scope 层级', 'Scope 语义']}
          rows={[
            ['MCP', 'local > project > user', '优先级覆盖（同名时高优先级赢）'],
            ['Skills', 'Enterprise > Personal > Project > Plugin', '优先级覆盖（同名时高优先级赢）'],
            ['Plugin', 'user / project', '生效范围（决定在哪些目录下加载）'],
          ]}
        />
      </Section>
    </div>
  )
}
