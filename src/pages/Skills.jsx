import { PageHeader, Section, Code, Table, Badge, ScopeChain, Callout } from '../components'

export default function Skills() {
  return (
    <div>
      <PageHeader
        title="Skills 系统"
        desc="可复用的工作流定义。通过 SKILL.md 文件描述，支持 /slash-command 手动调用或 Claude 自动触发。v2.1.3 后与 Slash Commands 合并为统一概念。"
        badge="Skills"
      />

      <Section title="Scope 层级">
        <p className="text-sm text-[#8b949e] mb-3">同名 Skill 存在时，高优先级覆盖低优先级：</p>
        <ScopeChain items={[
          { label: 'Enterprise', active: false },
          { label: 'Personal', active: true },
          { label: 'Project', active: false },
          { label: 'Plugin', active: false },
        ]} />
        <Table
          headers={['Scope', '路径', '生效范围']}
          rows={[
            ['Enterprise', 'managed settings', '组织内所有用户'],
            ['Personal', '~/.claude/skills/<name>/SKILL.md', '你的所有项目'],
            ['Project', '.claude/skills/<name>/SKILL.md', '当前项目'],
            ['Plugin', '<plugin>/skills/<name>/SKILL.md', '插件启用的地方'],
          ]}
        />
        <Callout type="info">
          Plugin Skills 使用 <code className="text-xs bg-[#21262d] px-1 rounded">plugin-name:skill-name</code> 命名空间，不与其他层级冲突。
        </Callout>
      </Section>

      <Section title="SKILL.md 结构">
        <Code lang="SKILL.md 示例">
{`---
name: deploy
description: 部署应用到生产环境。当用户说"部署"或"上线"时触发。
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(git *)
context: fork
agent: general-purpose
---

部署步骤：
1. 运行测试套件
2. 构建应用
3. 推送到部署目标
4. 验证部署成功`}
        </Code>
      </Section>

      <Section title="Frontmatter 字段参考">
        <Table
          headers={['字段', '说明', '默认值']}
          rows={[
            ['name', 'Skill 名称，即 /slash-command 名', '目录名'],
            ['description', '触发描述，Claude 用此判断何时自动调用', '第一段内容'],
            ['disable-model-invocation', '设为 true 则只能手动调用，Claude 不会自动触发', 'false'],
            ['user-invocable', '设为 false 则不出现在 / 菜单，仅 Claude 可调用', 'true'],
            ['allowed-tools', '此 Skill 激活时无需审批即可使用的工具', '—'],
            ['context', '设为 fork 则在独立子 agent 中运行', '—'],
            ['agent', 'context: fork 时使用的 agent 类型', 'general-purpose'],
            ['hooks', 'Skill 生命周期内的 Hooks 配置', '—'],
          ]}
        />
      </Section>

      <Section title="调用方式">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-xs font-semibold text-[#3fb950] mb-2">手动调用</div>
            <Code>{`/deploy production
/fix-issue 123
/migrate-component SearchBar React Vue`}</Code>
            <div className="text-xs text-[#8b949e]">适合有副作用的操作（部署、提交）</div>
          </div>
          <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]">
            <div className="text-xs font-semibold text-[#58a6ff] mb-2">Claude 自动触发</div>
            <div className="text-xs text-[#8b949e] mb-2">Claude 根据 description 判断是否调用。Skill 描述始终在上下文中，完整内容在调用时加载。</div>
            <div className="text-xs text-[#8b949e]">适合知识类 Skill（API 规范、代码风格）</div>
          </div>
        </div>
      </Section>

      <Section title="参数语法">
        <Table
          headers={['语法', '含义']}
          rows={[
            ['$ARGUMENTS', '所有参数'],
            ['$ARGUMENTS[0] 或 $0', '第一个参数'],
            ['$ARGUMENTS[1] 或 $1', '第二个参数'],
            ['${CLAUDE_SESSION_ID}', '当前会话 ID'],
          ]}
        />
      </Section>
    </div>
  )
}
