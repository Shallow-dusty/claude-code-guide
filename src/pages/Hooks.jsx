import { PageHeader, Section, Code, Table, Callout } from '../components'

export default function Hooks() {
  return (
    <div>
      <PageHeader
        title="Hooks 系统"
        desc="事件驱动的自定义逻辑。在 Claude Code 操作的关键节点插入 shell 命令，实现自动化工作流。"
        badge="Hooks"
      />

      <Section title="事件类型">
        <Table
          headers={['事件', '触发时机', '典型用途']}
          rows={[
            ['PreToolUse', '工具调用前', '拦截危险操作、记录审计日志'],
            ['PostToolUse', '工具调用后', '自动格式化、触发测试'],
            ['SessionStart', '会话开始时', '注入上下文、初始化环境'],
            ['Stop', '主线程停止时', '清理资源、发送通知'],
            ['SubagentStop', '子 agent 停止时', '汇总子任务结果'],
            ['PreCompact', '上下文压缩前', '保存重要信息'],
          ]}
        />
      </Section>

      <Section title="配置格式">
        <Code lang="~/.claude/settings.json">
{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '即将执行 Bash 命令' >> ~/audit.log"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/session-init.sh",
            "once": true
          }
        ]
      }
    ]
  }
}`}
        </Code>
      </Section>

      <Section title="关键配置项">
        <Table
          headers={['字段', '说明']}
          rows={[
            ['matcher', '匹配工具名（如 "Bash"、"Write"），空则匹配所有'],
            ['type', '目前只有 "command"'],
            ['command', '要执行的 shell 命令'],
            ['once: true', '每次会话只执行一次（v2.1.0+）'],
          ]}
        />
      </Section>

      <Section title="Hook 与 Skill 的区别">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-xs font-semibold text-[#bc8cff] mb-2">Hooks</div>
            <ul className="text-xs text-[#8b949e] space-y-1">
              <li>• 事件驱动，自动触发</li>
              <li>• 执行 shell 命令</li>
              <li>• 用于监控、拦截、自动化</li>
              <li>• 用户不可见（后台运行）</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-xs font-semibold text-[#3fb950] mb-2">Skills</div>
            <ul className="text-xs text-[#8b949e] space-y-1">
              <li>• 手动或 Claude 触发</li>
              <li>• 执行 Claude 指令</li>
              <li>• 用于工作流、任务模板</li>
              <li>• 用户可见（/ 菜单）</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Hooks 存储位置">
        <Table
          headers={['位置', '生效范围']}
          rows={[
            ['~/.claude/settings.json → hooks', '全局，所有项目'],
            ['.claude/settings.json → hooks', '当前项目'],
            ['SKILL.md frontmatter → hooks', 'Skill 激活期间'],
          ]}
        />
        <Callout type="warn">
          Plugin 提供的 Hooks 随插件禁用而失效。如果发现会话启动时有异常输出，检查是否有遗留的 Hook 配置（如 ~/.claude/hooks/ 目录）。
        </Callout>
      </Section>
    </div>
  )
}
