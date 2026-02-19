import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, Wrench, Layers, Puzzle, Zap, FileText, Brain, Home } from 'lucide-react'
import Overview from './pages/Overview'
import MCP from './pages/MCP'
import Skills from './pages/Skills'
import Plugins from './pages/Plugins'
import Hooks from './pages/Hooks'
import ConfigFiles from './pages/ConfigFiles'
import Memory from './pages/Memory'

const nav = [
  { to: '/', icon: Home, label: '概览', end: true },
  { to: '/mcp', icon: Wrench, label: 'MCP 系统' },
  { to: '/skills', icon: Layers, label: 'Skills 系统' },
  { to: '/plugins', icon: Puzzle, label: 'Plugin 系统' },
  { to: '/hooks', icon: Zap, label: 'Hooks 系统' },
  { to: '/config', icon: FileText, label: '配置文件' },
  { to: '/memory', icon: Brain, label: '持久化记忆' },
]

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-[#161b22] border-r border-[#30363d] z-30 flex flex-col transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4 border-b border-[#30363d]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#58a6ff]/20 flex items-center justify-center text-[#58a6ff] text-xs font-bold">CC</div>
            <div>
              <div className="text-sm font-semibold text-[#e6edf3]">Claude Code</div>
              <div className="text-xs text-[#8b949e]">配置体系指南</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-[#58a6ff]/15 text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'}`
              }
              onClick={onClose}>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-[#30363d] text-xs text-[#8b949e]">基于 Claude Code v2.1.45</div>
      </aside>
    </>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#0d1117]">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex-1 lg:ml-60 flex flex-col">
          <header className="lg:hidden sticky top-0 z-10 bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-[#8b949e] hover:text-[#e6edf3]"><Menu size={20} /></button>
            <span className="text-sm font-medium text-[#e6edf3]">Claude Code 配置体系指南</span>
          </header>
          <main className="flex-1 p-6 lg:p-10 max-w-4xl w-full">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/mcp" element={<MCP />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/plugins" element={<Plugins />} />
              <Route path="/hooks" element={<Hooks />} />
              <Route path="/config" element={<ConfigFiles />} />
              <Route path="/memory" element={<Memory />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
