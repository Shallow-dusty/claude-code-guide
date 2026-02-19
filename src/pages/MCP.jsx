import { PageHeader, Section, Code, Table, Badge, ScopeChain, Callout } from '../components'

export default function MCP() {
  return (
    <div>
      <PageHeader
        title="MCP 系统"
        desc="Model Context Protocol — 让 Claude 接入外部工具的标准协议。2024-11-25 由 Anthropic 发布，设计目标是成为 AI 与外部系统之间的「USB-C 标准」。"
        badge="MCP"
      />

      <Section title="传输类型">
        <p className="text-sm text-[#8b949e] mb-4">MCP 有两种传输方式，决定了工具运行在哪里：</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-sm font-semibold text-[#3fb950] mb-2">stdio — 本地进程</div>
            <div className="text-xs text-[#8b949e] mb-3">Claude Code 在本地启动子进程，通过 stdin/stdout 通信。进程随 Claude Code 启动/退出。</div>
            <Code lang="配置示例">
{`{
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"],
    "env": { "KEY": "value" }
  }
}`}
            </Code>
            <div className="text-xs text-[#8b949e]">适用：需要访问本地资源（浏览器、文件系统）</div>
          </div>
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-sm font-semibold text-[#58a6ff] mb-2">http — 远程服务器</div>
            <div className="text-xs text-[#8b949e] mb-3">Claude Code 直接请求远程 URL。服务器由第三方托管，本地无需运行任何进程。</div>
            <Code lang="配置示例">
{`{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/",
    "headers": {
      "Authorization": "Bearer \${TOKEN}"
    }
  }
}`}
            </Code>
            <div className="text-xs text-[#8b949e]">适用：服务方托管了服务器（Cloudflare、GitHub）</div>
          </div>
        </div>
      </Section>

      <Section title="Scope 层级">
        <p className="text-sm text-[#8b949e] mb-3">同名 MCP 存在时，高优先级覆盖低优先级：</p>
        <ScopeChain items={[
          { label: 'local', active: true },
          { label: 'project', active: false },
          { label: 'user', active: false },
        ]} />
        <Table
          headers={['Scope', '存储位置', '说明']}
          rows={[
            ['local', '~/.claude.json → projects.<路径>.mcpServers', '最高优先级，可覆盖插件 MCP'],
            ['project', '.claude/settings.json → mcpServers', '项目级别，或插件提供的 MCP（等价优先级）'],
            ['user', '~/.claude.json → mcpServers（顶层）', '最低优先级，对所有项目生效'],
          ]}
        />
        <Callout type="tip">
          插件的 MCP 等价于 project scope 优先级。因此 local scope 的同名 MCP 可以覆盖插件配置——这是修复插件默认行为的标准方式。
        </Callout>
      </Section>

      <Section title="认证方式">
        <Table
          headers={['方式', '适用场景', '示例']}
          rows={[
            ['无认证', '公开端点', 'Cloudflare 三个 MCP'],
            ['Header Token', 'HTTP 类型 + Bearer Token', 'GitHub MCP'],
            ['env 环境变量', 'stdio 类型 + AK/SK', '阿里云 MCP'],
          ]}
        />
        <Callout type="warn">
          env 字段中的凭证会以明文存储在 ~/.claude.json 中，注意文件权限保护。
        </Callout>
      </Section>

      <Section title="来源分类">
        <Table
          headers={['来源', '存储位置', '管理方式']}
          rows={[
            ['插件提供', '插件缓存目录的 .mcp.json', '随插件启用/禁用自动生效'],
            ['手动配置', '~/.claude.json 或 .claude/settings.json', '直接编辑或 claude mcp add'],
          ]}
        />
      </Section>
    </div>
  )
}
