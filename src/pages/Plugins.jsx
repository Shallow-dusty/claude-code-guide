import { PageHeader, Section, Code, Table, Callout } from '../components'

export default function Plugins() {
  return (
    <div>
      <PageHeader
        title="Plugin 系统"
        desc="打包容器，将 MCP、Skills、Hooks、Agents 打包成可分发单元。Plugin 本身不是独立功能，而是组织和分发其他功能的载体。"
        badge="Plugin"
      />

      <Section title="插件包结构">
        <Code lang="插件目录结构">
{`<plugin-name>/
├── .claude-plugin/
│   └── plugin.json      # 元数据（可选）：名称、描述、作者
├── .mcp.json            # MCP 配置（可选）
├── .lsp.json            # LSP 服务器配置（可选）
├── skills/              # Skills 文件（可选，新式）
│   └── <skill-name>/
│       └── SKILL.md
├── commands/            # Skills 文件（可选，旧式 Markdown）
├── hooks/               # Hooks 配置（可选）
│   └── hooks.json
└── agents/              # Agents 配置（可选）`}
        </Code>
        <Callout type="info">
          一个插件可以只包含其中一种组件。例如 playwright 插件只有 .mcp.json，frontend-design 插件只有 skills/。
        </Callout>
      </Section>

      <Section title="插件 Scope">
        <p className="text-sm text-[#8b949e] mb-3">插件的 scope 决定生效范围（非优先级覆盖）：</p>
        <Table
          headers={['Scope', '配置文件', '生效范围', '提交到 git？']}
          rows={[
            ['user（默认）', '~/.claude/settings.json', '你的所有项目', '否'],
            ['project', '.claude/settings.json', '仓库所有协作者', '是'],
            ['local', '.claude/settings.local.json', '仅本机此项目', '否（gitignored）'],
          ]}
        />
        <Callout type="tip">
          个人开发者推荐 user scope。团队共享插件用 project scope（提交到版控）。local scope 适合本机专属覆盖。
        </Callout>
      </Section>

      <Section title="插件存储结构">
        <Code lang="~/.claude/plugins/ 目录">
{`~/.claude/plugins/
├── installed_plugins.json     # 注册表：已安装插件的路径、版本、scope
├── blocklist.json             # 黑名单
├── known_marketplaces.json    # 已知插件市场
└── cache/
    └── claude-plugins-official/
        ├── context7/
        │   ├── 8deab8460a9d/  # 旧版本（.orphaned_at 标记）
        │   ├── 2cd88e7947b7/  # 旧版本
        │   └── 261ce4fba4f2/  # 当前版本（git commit SHA 命名）
        ├── github/
        ├── playwright/
        └── frontend-design/`}
        </Code>
        <p className="text-sm text-[#8b949e]">每个插件保留多个历史版本。<code className="text-xs bg-[#21262d] px-1 rounded">.orphaned_at</code> 文件标记该版本已被新版本取代但保留缓存。</p>
      </Section>

      <Section title="启用与禁用">
        <p className="text-sm text-[#8b949e] mb-3">通过 <code className="text-xs bg-[#21262d] px-1 rounded">~/.claude/settings.json</code> 的 enabledPlugins 字段控制：</p>
        <Code lang="~/.claude/settings.json">
{`{
  "enabledPlugins": {
    "context7@claude-plugins-official": true,
    "github@claude-plugins-official": true,
    "frontend-design@claude-plugins-official": true
    // playwright 不在此处 = 已禁用（但仍已安装）
  }
}`}
        </Code>
        <Callout type="warn">
          从 enabledPlugins 移除插件只是禁用，不会删除缓存文件。插件的 MCP、Skills 等全部失效。
        </Callout>
      </Section>

      <Section title="插件 MCP 的加载方式">
        <p className="text-sm text-[#8b949e] mb-3">插件提供的 MCP 由插件系统独立管理，不映射到 local/project/user 任何一个 scope：</p>
        <Code>
{`插件 MCP（独立管理，随插件启用/禁用）
user scope MCP（~/.claude.json 顶层）
local scope MCP（~/.claude.json projects.<路径>）`}
        </Code>
        <Callout type="warn">
          官方文档说明插件 MCP 与用户配置的 MCP 行为相同，但不通过 /mcp 命令管理。当插件默认配置不适合当前环境时，推荐禁用插件并用 user scope MCP 替代。
        </Callout>
      </Section>
    </div>
  )
}
