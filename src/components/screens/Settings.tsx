import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, Save, Bell, Shield, Smartphone, Globe, Palette, Sun, Moon, Layers, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useUser } from '@/src/contexts/UserContext';
import { useDesignData } from '@/src/contexts/DesignDataContext';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [exportFormat, setExportFormat] = useState('HEX');
  const [aiModel, setAiModel] = useState('Gemini 3 Flash');
  const { theme, toggleTheme } = useTheme();
  const { userName, setUserName } = useUser();
  const { likedGradients, unlikeGradient } = useDesignData();
  const [tempName, setTempName] = useState(userName);

  const tabs = [
    { id: 'General', icon: Globe },
    { id: 'Appearance', icon: Palette },
    { id: 'Liked Gradients', icon: Layers }
  ];

  const handleSave = () => {
    setUserName(tempName);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a3a6ff', '#49339d', '#ffffff']
    });
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto w-full h-full flex flex-col gap-10 overflow-y-auto custom-scrollbar transition-colors duration-300">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[var(--border-main)] pb-8 transition-colors duration-300 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--text-primary)]">Settings</h1>
          <p className="text-xs md:text-sm text-[var(--text-secondary)]">Configure your design environment and AI preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          className="w-full md:w-auto bg-[#a3a6ff] text-[#0f00a4] px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-2xl active:scale-95"
        >
          <Save size={18} />
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Sidebar Tabs */}
        <div className="md:col-span-3 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 md:w-full flex items-center justify-center md:justify-start gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-main)] shadow-xl" 
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-main)]"
              )}
            >
              <tab.icon size={18} className={activeTab === tab.id ? "text-[#a3a6ff]" : ""} />
              {tab.id}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="md:col-span-9 bg-[var(--bg-surface)] backdrop-blur-3xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[var(--border-main)] shadow-2xl space-y-10 transition-colors duration-300 mb-12 lg:mb-0">
          <AnimatePresence mode="wait">
            {activeTab === 'General' && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#a3a6ff]">Profile Integrity</h3>
                  <div className="bg-[var(--bg-elevated)] p-6 rounded-2xl border border-[var(--border-main)] space-y-4">
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Workspace Identity</label>
                       <input 
                         type="text"
                         value={tempName}
                         onChange={(e) => setTempName(e.target.value)}
                         placeholder="Enter your name"
                         className="bg-[var(--bg-app)] border border-[var(--border-main)] text-sm font-bold text-[var(--text-primary)] rounded-xl px-4 py-3 outline-none focus:border-[#a3a6ff] transition-all"
                       />
                       <p className="text-[10px] text-[var(--text-secondary)] opacity-60 font-medium">This name will be visible across your designer workspace.</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#a3a6ff]">Export Preferences</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['HEX', 'RGB', 'HSL'].map((format) => (
                      <button
                        key={format}
                        onClick={() => setExportFormat(format)}
                        className={cn(
                          "py-4 rounded-xl font-black text-xs transition-all border",
                          exportFormat === format 
                            ? "bg-[#a3a6ff] text-[#0f00a4] border-transparent" 
                            : "bg-[var(--bg-app)] text-[var(--text-secondary)] border-[var(--border-main)] hover:border-[#a3a6ff30]"
                        )}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#a3a6ff]">AI Intelligence</h3>
                  <div className="bg-[var(--bg-elevated)] p-6 rounded-2xl border border-[var(--border-main)] space-y-4 transition-colors duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[var(--text-primary)]">Default Model</span>
                      <select 
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="bg-[var(--bg-app)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-primary)] rounded-lg px-4 py-2 outline-none focus:border-[#a3a6ff]"
                      >
                        <option>Gemini 3 Flash</option>
                        <option>Gemini 3.1 Pro</option>
                      </select>
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed uppercase tracking-widest font-bold opacity-60">
                      Gemini 3 Flash provides faster real-time generation for gradients and pallets.
                    </p>
                  </div>
                </section>

                <section className="space-y-4 pt-4 border-t border-[var(--border-main)]">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-500">Data Storage</h3>
                  <div className="flex items-center justify-between p-6 bg-red-500/5 border border-red-500/10 rounded-2xl transition-colors duration-300">
                    <div>
                      <p className="text-sm font-bold text-red-500">Clear Workspace Data</p>
                      <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">Permanently remove all saved palettes and history.</p>
                    </div>
                    <button className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95">
                      Wipe DNA
                    </button>
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'Appearance' && (
              <motion.div 
                key="appearance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <section className="space-y-6">
                  <div className="flex justify-between items-end">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#a3a6ff]">Theme Customization</h3>
                    <div className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-widest">Active: {theme}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <button 
                      onClick={() => { if(theme === 'light') toggleTheme(); }}
                      className={cn(
                        "p-10 rounded-[3rem] border transition-all flex flex-col items-center gap-6 group shadow-2xl relative overflow-hidden",
                        theme === 'dark' ? "bg-[var(--bg-elevated)] border-[#a3a6ff] scale-105" : "bg-[var(--bg-app)] border-[var(--border-main)] hover:border-[#a3a6ff30]"
                      )}
                    >
                       <div className="p-5 bg-black rounded-3xl shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                          <Moon className="text-white" size={32} />
                       </div>
                       <div className="text-center">
                          <span className="font-black text-sm block mb-1">Dark Mode</span>
                          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Luminous Night</span>
                       </div>
                       {theme === 'dark' && (
                         <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#a3a6ff] glow" />
                       )}
                    </button>

                    <button 
                      onClick={() => { if(theme === 'dark') toggleTheme(); }}
                      className={cn(
                        "p-10 rounded-[3rem] border transition-all flex flex-col items-center gap-6 group shadow-2xl relative overflow-hidden",
                        theme === 'light' ? "bg-white border-[#a3a6ff] scale-105" : "bg-[var(--bg-app)] border-[var(--border-main)] hover:border-[#a3a6ff30]"
                      )}
                    >
                       <div className="p-5 bg-amber-50 rounded-3xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                          <Sun className="text-amber-500" size={32} />
                       </div>
                       <div className="text-center">
                          <span className="font-black text-sm block mb-1">Light Mode</span>
                          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Pure Clarity</span>
                       </div>
                       {theme === 'light' && (
                         <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#a3a6ff] glow" />
                       )}
                    </button>
                  </div>
                </section>
              </motion.div>
            )}
            {activeTab === 'Liked Gradients' && (
              <motion.div 
                key="liked-gradients"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#a3a6ff]">Liked Gradients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {likedGradients.length > 0 ? likedGradients.map((gradient) => (
                    <div key={gradient.name} className="bg-[var(--bg-elevated)] p-4 rounded-2xl border border-[var(--border-main)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                           className="w-10 h-10 rounded-lg shadow-inner cursor-pointer relative group" 
                           style={{ background: gradient.colors && gradient.colors.length > 0 ? `linear-gradient(to right, ${gradient.colors.join(', ')})` : 'gray' }}
                           onClick={(e) => {
                             if (!gradient.colors || gradient.colors.length === 0) return;
                             const overlay = document.createElement('div');
                             overlay.className = 'fixed bg-[var(--bg-surface)] p-2 rounded-lg shadow-xl border border-[var(--border-main)] text-[10px] font-mono z-50';
                             overlay.style.left = `${e.clientX + 10}px`;
                             overlay.style.top = `${e.clientY + 10}px`;
                             overlay.innerHTML = gradient.colors.map(c => 
                               `<button class="block w-full text-left hover:bg-[var(--bg-app)] p-1 rounded transition-colors" data-color="${c}">${c}</button>`
                             ).join('');
                             document.body.appendChild(overlay);
                             
                             overlay.addEventListener('click', (ev: any) => {
                               if (ev.target.dataset.color) {
                                 navigator.clipboard.writeText(ev.target.dataset.color);
                                 overlay.remove();
                               }
                             });
                             
                             const close = () => { overlay.remove(); document.removeEventListener('click', close); };
                             setTimeout(() => document.addEventListener('click', close), 0);
                           }}
                        />
                        <span className="text-sm font-bold text-[var(--text-primary)]">{gradient.name}</span>
                      </div>
                      <button 
                        onClick={() => unlikeGradient(gradient.name)}
                        className="p-2 text-[var(--text-secondary)] hover:text-red-500 transition-all hover:scale-110 active:scale-90"
                        title="Unlike"
                      >
                        <Heart size={18} fill="currentColor" className="text-red-500" />
                      </button>
                    </div>
                  )) : (
                    <p className="text-sm text-[var(--text-secondary)] font-medium">No liked gradients yet.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
