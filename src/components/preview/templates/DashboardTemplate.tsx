import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, Users, BarChart3, Settings, 
  Search, Bell, MoreVertical, ArrowUpRight, 
  ArrowDownRight, Plus, Download, Mail
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { DeviceType } from '@/src/lib/store';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

export default function DashboardTemplate({ device }: { device?: DeviceType }) {
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';

  return (
    <div className="flex h-full font-sans bg-[var(--preview-bg,var(--bg-app))] text-[var(--text-primary)] transition-colors duration-500 overflow-hidden">
      {/* Sidebar */}
      {!isMobile && (
        <aside className="w-64 border-r border-[var(--border-main)] bg-[var(--bg-surface)] hidden lg:flex flex-col p-6 gap-8">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--preview-primary)] flex items-center justify-center text-white">
              <LayoutDashboard size={18} fill="currentColor" />
            </div>
            Pulse
          </div>
          
          <nav className="flex-1 space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Overview', active: true },
              { icon: Users, label: 'Customers' },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Mail, label: 'Messages' },
              { icon: Settings, label: 'Settings' },
            ].map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  item.active 
                    ? 'bg-[var(--preview-primary)] text-white shadow-lg shadow-[var(--preview-primary)]/20' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            ))}
          </nav>

          <div className="p-4 rounded-2xl bg-[var(--preview-gradient)] text-white space-y-3 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Pro Plan</p>
              <p className="text-xs font-bold leading-relaxed mt-1">Get advanced insights and unlimited storage.</p>
              <button className="mt-3 w-full py-2 bg-white text-[var(--preview-primary)] rounded-lg text-[10px] font-black uppercase tracking-widest">
                Upgrade
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="h-20 border-b border-[var(--border-main)] bg-[var(--bg-surface)] px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics..." 
                className="w-full bg-[var(--bg-elevated)] border-none rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 ring-[var(--preview-primary)]/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-main)] text-[var(--text-secondary)] relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--preview-accent)] border-2 border-[var(--bg-surface)]" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--preview-primary)] to-[var(--preview-accent)] p-0.5">
              <div className="w-full h-full rounded-[9px] bg-[var(--bg-surface)] flex items-center justify-center font-black text-[var(--preview-primary)]">
                JD
              </div>
            </div>
          </div>
        </header>

        <div className={cn(
          "p-8 grid gap-6",
          isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-12"
        )}>
          {/* Stats Grid */}
          <div className={cn(
            "grid gap-6",
            isMobile ? "grid-cols-1" : isTablet ? "col-span-2 grid-cols-2" : "col-span-12 grid-cols-4"
          )}>
            {[
              { label: 'Total Revenue', value: '$128,430', growth: '+12.5%', up: true },
              { label: 'Active Users', value: '43,210', growth: '+3.2%', up: true },
              { label: 'Conversion Rate', value: '3.42%', growth: '-0.8%', up: false },
              { label: 'Sessions', value: '12:43', growth: '+5.4%', up: true },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-[var(--app-shadow)]" style={{ borderRadius: 'var(--app-radius)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 p-8 bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-[var(--app-shadow)] space-y-6" style={{ borderRadius: 'var(--app-radius)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black tracking-tight">Revenue Overview</h3>
                  <p className="text-xs font-medium text-[var(--text-secondary)]">Weekly performance tracking</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[var(--bg-elevated)] text-[10px] font-black uppercase tracking-widest" style={{ borderRadius: 'calc(var(--app-radius) / 2)' }}>Week</button>
                  <button className="px-4 py-2 bg-[var(--preview-primary)] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[var(--preview-primary)]/20" style={{ borderRadius: 'calc(var(--app-radius) / 2)' }}>Month</button>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--preview-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--preview-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-main)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-secondary)' }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-surface)', 
                        borderColor: 'var(--border-main)',
                        borderRadius: 'var(--app-radius)',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--preview-primary)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-[var(--app-shadow)] space-y-6" style={{ borderRadius: 'var(--app-radius)' }}>
              <h3 className="text-lg font-black tracking-tight">Active Sessions</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={100}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-main)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-secondary)' }}
                      dy={10}
                    />
                    <Tooltip 
                      cursor={{ fill: 'var(--bg-elevated)' }}
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-surface)', 
                        borderColor: 'var(--border-main)',
                        borderRadius: 'var(--app-radius)',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }} 
                    />
                    <Bar dataKey="value" fill="var(--preview-accent)" radius={[6, 6, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-[var(--app-shadow)]" style={{ borderRadius: 'var(--app-radius)' }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black tracking-tight">Recent Transactions</h3>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--preview-primary)]">
                View All <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Design Subscription', date: 'Oct 24, 2023', amount: '-$49.00', status: 'Completed', icon: '🎨' },
                { name: 'Stripe Payout', date: 'Oct 22, 2023', amount: '+$1,240.00', status: 'Pending', icon: '💰' },
                { name: 'Apple Cloud Storage', date: 'Oct 21, 2023', amount: '-$9.99', status: 'Completed', icon: '☁️' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 transition-colors group hover:bg-[var(--bg-elevated)]" style={{ borderRadius: 'calc(var(--app-radius) / 1.5)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--bg-elevated)] flex items-center justify-center text-xl" style={{ borderRadius: 'calc(var(--app-radius) / 2)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-emerald-500' : ''}`}>{item.amount}</p>
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
