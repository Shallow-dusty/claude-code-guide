import { PageHeader, Section, Code, Table, Callout } from '../components'

export default function ConfigFiles() {
  return (
    <div>
      <PageHeader
        title="配置文件全景"
        desc="Claude Code 的配置分散在多个文件中，各司其职。理解每个文件的作用是排查问题的基础。"
        badge="Config"
      />

      <Section title="文件总览">
        <Table
          headers={['文件', '作用', '修改方式']}
          rows={[
            ['~/.claude/settings.json', '全局设置：enabledPlugins、permissions、hooks', '直接编辑 / /permissions'],
            ['~/.claude.json', 'MCP 注册表：user scope + local scope（按项目路径）', '直接编辑 / claude mcp add'],
            ['~/.claude/plugins/installed_plugins.json', '插件注册表：已安装插件的路径、版本、scope', '由 claude plugin 命令管理'],
            ['.claude/settings.json', '项目级设置：项目 MCP、权限覆盖', '直接编辑'],
            ['~/.claude/CLAUDE.md', '全局用户指令（对所有项目生效）', '手动编辑'],
            ['<project>/CLAUDE.md', '项目用户指令（仅当前项目）', '手动编辑'],
            ['~/.claude/projects/.../MEMORY.md', 'Claude 自动记忆（200 行上限）', 'Claude 自动写入'],
          ]}
        />
      </Section>

      <Section title="~/.claude/settings.json">
        <Code lang="结构示例">
{`{
  "enabledPlugins": {
    "context7@claude-plugins-official": true,
    "github@claude-plugins-official": true
  },
  "permissions": {
    "allow": ["Bash(git *)", "WebSearch"],
    "deny": []
  },
  "hooks": {
    "SessionStart": [ ... ],
    "PreToolUse": [ ... ]
  },
  "language": "zh-CN"
}`}
        </Code>
        <Callout type="info">
          settings.json 支持热重载（v1.0.90+），修改后无需重启 Claude Code 即可生效。
        </Callout>
      </Section>

      <Section title="~/.claude.json">
        <Code lang="结构示例">
{`{
  "mcpServers": {
    // user scope：对所有项目生效
    "cloudflare-bindings": {
      "type": "http",
      "url": "https://bindings.mcp.cloudflare.com/mcp"
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--config", "~/.config/playwright-mcp.json"]
    }
  },
  "projects": {
    "/home/user/my-project": {
      "mcpServers": {
        // local scope：仅对此路径生效，优先级高于 user scope 和插件
        "playwright": { ... }
      }
    }
  }
}`}
        </Code>
      </Section>

      <Section title="配置优先级总结">
        <Code>
{`MCP 优先级：
  local（projects.<路径>.mcpServers）
    > project（.claude/settings.json 或插件）
    > user（mcpServers 顶层）

Skills 优先级：
  Enterprise > Personal > Project > Plugin

Plugin 生效范围：
  user scope = 所有项目
  project scope = 指定路径`}
        </Code>
      </Section>

      <Section title="settings.json 的目录遍历">
        <Callout type="tip">
          Claude Code 启动时会从当前目录向上遍历，加载所有父目录中的 .claude/settings.json。因此绑定到家目录的 project scope 插件，在所有子目录中都会生效。
        </Callout>
      </Section>
    </div>
  )
}
