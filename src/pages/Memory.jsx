import { PageHeader, Section, Code, Table, Callout } from '../components'

export default function Memory() {
  return (
    <div>
      <PageHeader
        title="持久化记忆系统"
        desc="让 Claude 跨会话记住上下文。由两部分构成：用户主动写的指令（CLAUDE.md）和 Claude 自动写的笔记（MEMORY.md）。"
        badge="Memory"
      />

      <Section title="两种记忆类型">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-xs font-semibold text-[#58a6ff] mb-2">CLAUDE.md — 用户指令</div>
            <ul className="text-xs text-[#8b949e] space-y-1.5">
              <li>• 用户手动编写</li>
              <li>• 告诉 Claude 如何工作</li>
              <li>• 无行数限制</li>
              <li>• 会话开始时自动加载</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-xs font-semibold text-[#3fb950] mb-2">MEMORY.md — Claude 笔记</div>
            <ul className="text-xs text-[#8b949e] space-y-1.5">
              <li>• Claude 自动写入</li>
              <li>• 记录跨会话的发现</li>
              <li>• 200 行上限（超出截断）</li>
              <li>• 自动加载到 system prompt</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="CLAUDE.md 层级">
        <Table
          headers={['文件位置', '生效范围', '典型内容']}
          rows={[
            ['~/.claude/CLAUDE.md', '所有项目（全局）', '用户偏好、工作方式、工具链说明'],
            ['<project>/CLAUDE.md', '当前项目', '项目架构、代码规范、注意事项'],
            ['.claude/rules/*.md', '补充规则（v2.0.64+）', '条件性规则、场景特定指令'],
          ]}
        />
        <Callout type="warn">
          已知 Bug（#26160）：上下文压缩（compaction）后 CLAUDE.md 内容可能丢失。建议将关键规则也写入 MEMORY.md 或 rules/ 目录。
        </Callout>
      </Section>

      <Section title="MEMORY.md 存储位置">
        <Code>
{`~/.claude/projects/<路径哈希>/memory/MEMORY.md

例如家目录（/home/user）对应：
~/.claude/projects/-home-user/memory/MEMORY.md`}
        </Code>
        <p className="text-sm text-[#8b949e]">每个工作目录有独立的 MEMORY.md。Claude 在发现值得记录的信息时会自动更新它。</p>
      </Section>

      <Section title="MEMORY.md 最佳实践">
        <Table
          headers={['应该记录', '不应该记录']}
          rows={[
            ['稳定的模式和约定', '当前任务的临时状态'],
            ['关键架构决策和文件路径', '可能不完整的信息'],
            ['用户工作流偏好', '与 CLAUDE.md 重复的内容'],
            ['常见问题的解决方案', '推测性或未验证的结论'],
          ]}
        />
        <Callout type="tip">
          MEMORY.md 超过 200 行后会被截断。建议将详细内容写入独立的 topic 文件（如 debugging.md），在 MEMORY.md 中只保留链接引用。
        </Callout>
      </Section>
    </div>
  )
}
