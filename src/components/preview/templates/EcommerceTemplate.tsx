import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Search, Heart, User, Filter, ChevronDown, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DeviceType } from '@/src/lib/store';

export default function EcommerceTemplate({ device }: { device?: DeviceType }) {
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';
  return (
    <div className="min-h-full font-sans bg-[var(--preview-bg,var(--bg-app))] text-[var(--text-primary)] transition-colors duration-500">
      {/* Top Banner */}
      <div className="bg-[var(--preview-primary)] text-white text-[10px] font-black uppercase tracking-[0.3em] py-3 text-center px-8">
        Free worldwide shipping on orders over $150 • Summer Sale: Up to 50% Off
      </div>

      {/* Navbar */}
      <nav className="px-8 py-6 flex items-center justify-between border-b border-[var(--border-main)] sticky top-0 z-20 bg-[var(--bg-surface)]/80 backdrop-blur-xl">
        <div className="flex items-center gap-12">
          <div className="text-2xl font-black tracking-tighter uppercase italic">Mono<span className="text-[var(--preview-primary)]">.</span></div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest opacity-60">
            <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">Shop All</a>
            <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">Men</a>
            <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">Women</a>
            <a href="#" className="hover:text-[var(--preview-primary)] transition-colors">About</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 hover:text-[var(--preview-primary)] transition-colors"><Search size={20} /></button>
          <button className="p-2 hover:text-[var(--preview-primary)] transition-colors"><User size={20} /></button>
          <button className="p-2 hover:text-[var(--preview-primary)] transition-colors relative">
            <ShoppingBag size={20} />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--preview-accent)] text-white text-[8px] flex items-center justify-center font-black">2</div>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative aspect-[21/9] flex items-center px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--preview-gradient)] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] to-transparent" />
        
        <div className="relative z-10 max-w-xl space-y-6">
          <h1 className={cn(
            "font-black tracking-tighter leading-[0.9]",
            isMobile ? "text-4xl" : isTablet ? "text-6xl" : "text-7xl"
          )}>ESSENTIALS <br/>FOR THE <span className="text-[var(--preview-primary)]">MODERN</span> LIVING.</h1>
          <p className="text-lg font-medium text-[var(--text-secondary)]">Discover our curated collection of premium home and lifestyle essentials.</p>
          <button className="px-10 py-5 rounded-full bg-[var(--preview-primary)] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-[var(--preview-primary)]/40 hover:translate-y-[-4px] transition-all">
            Shop Collection
          </button>
        </div>
      </section>

      {/* Product List */}
      <section className="px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black tracking-tighter">New Arrivals</h2>
            <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Fresh pieces for your home</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-main)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--bg-elevated)] transition-all">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-main)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--bg-elevated)] transition-all">
              Sort By <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className={cn(
          "grid gap-8",
          isMobile ? "grid-cols-2" : isTablet ? "grid-cols-3" : "grid-cols-4"
        )}>
          {[
            { name: "Nordic Lounge Chair", price: "$450.00", color: "var(--preview-primary)", rating: 4.8 },
            { name: "Minimal Desk Lamp", price: "$120.00", color: "var(--preview-accent)", rating: 4.9 },
            { name: "Ceramic Coffee Set", price: "$85.00", color: "var(--preview-secondary)", rating: 4.7 },
            { name: "Woven Wool Rug", price: "$299.00", color: "var(--preview-primary)", rating: 4.6 },
          ].map((product, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4 group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-[2rem] bg-[var(--bg-elevated)] relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-700" style={{ backgroundColor: product.color }} />
                <div className="absolute top-4 right-4 p-3 rounded-full bg-white text-black/20 hover:text-rose-500 transition-colors shadow-xl">
                  <Heart size={18} />
                </div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-black tracking-tight">{product.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <Star size={12} fill="var(--preview-accent)" className="text-[var(--preview-accent)]" /> {product.rating}
                  </div>
                </div>
                <p className="text-sm font-black text-[var(--preview-primary)]">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-8 mb-16 p-16 rounded-[3rem] bg-[var(--preview-secondary)] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12">
          <ShoppingBag size={300} strokeWidth={1} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Join the club & <br/>get 20% off.</h2>
          <p className="font-medium opacity-60">Subscribe to our newsletter and be the first to know about new collections and exclusive offers.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:ring-2 ring-white/20"
            />
            <button className="px-10 py-4 rounded-2xl bg-white text-[var(--preview-secondary)] font-black uppercase tracking-widest text-xs">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 border-t border-[var(--border-main)] grid grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-2 lg:col-span-1 space-y-6">
          <div className="text-2xl font-black tracking-tighter uppercase italic">Mono<span className="text-[var(--preview-primary)]">.</span></div>
          <p className="text-xs font-bold text-[var(--text-secondary)] leading-relaxed">Modern essentials for a conscious lifestyle. Quality over quantity, always.</p>
        </div>
        {[
          { title: "Shop", links: ["All Products", "New Arrivals", "Best Sellers", "Sale"] },
          { title: "Support", links: ["Shipping", "Returns", "Contact", "FAQ"] },
          { title: "Legal", links: ["Privacy", "Terms", "Sustainability", "Cookies"] },
        ].map((col, i) => (
          <div key={i} className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}><a href="#" className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
    </div>
  );
}
