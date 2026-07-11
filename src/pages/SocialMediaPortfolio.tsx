import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import './SocialMediaPortfolio.css';

const ICONS = {
  insta: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.25.06 2.1.25 2.84.55.77.3 1.42.7 2.07 1.35.65.65 1.05 1.3 1.35 2.07.3.74.5 1.6.55 2.84.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.25-.25 2.1-.55 2.84a5.7 5.7 0 0 1-1.35 2.07 5.7 5.7 0 0 1-2.07 1.35c-.74.3-1.6.5-2.84.55-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.25-.06-2.1-.25-2.84-.55a5.7 5.7 0 0 1-2.07-1.35 5.7 5.7 0 0 1-1.35-2.07c-.3-.74-.5-1.6-.55-2.84C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.25.25-2.1.55-2.84.3-.77.7-1.42 1.35-2.07A5.7 5.7 0 0 1 6.24 1.9c.74-.3 1.6-.5 2.84-.55C10.33 1.3 10.73 1.3 12 1.3zm0 3.15A6.65 6.65 0 1 0 12 18.5a6.65 6.65 0 0 0 0-13.3zm0 2A4.65 4.65 0 1 1 12 17a4.65 4.65 0 0 1 0-9.3zm6.9-2.85a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z"/></svg>,
  threads: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.2 2c-4.9 0-7.9 3.1-7.9 8.1v3.8C4.3 18.9 7.3 22 12.2 22c4.9 0 7.9-3.1 7.9-8.1v-.8c0-.6-.4-1-1-1s-1 .4-1 1v.8c0 4-2.1 6.1-5.9 6.1s-5.9-2.1-5.9-6.1v-3.8c0-4 2.1-6.1 5.9-6.1 3 0 4.9 1.3 5.6 3.7.1.5.6.8 1.1.7.5-.1.8-.6.7-1.1C18.6 3.9 15.9 2 12.2 2zm2.4 8.9c0-1.6-1.1-2.7-2.6-2.7s-2.6 1.1-2.6 2.7c0 1 .4 1.8 1.2 2.3-1.7.5-2.8 1.9-2.8 3.7 0 2.3 1.9 3.8 4.2 3.8s4.2-1.5 4.2-3.8c0-1.3-.6-2.5-1.8-3.1.8-.5 1.2-1.5 1.2-2.9zm-2.6-.9c.6 0 .9.4.9 1s-.3 1.1-.9 1.1-.9-.5-.9-1.1.3-1 .9-1zm0 5c1.2 0 2.1.8 2.1 1.9 0 1.2-1 1.9-2.1 1.9s-2.1-.7-2.1-1.9c0-1.1.9-1.9 2.1-1.9z"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2.9h3.3l-7.2 8.2 8.5 11.1h-6.6l-5.2-6.8-5.9 6.8H2.4l7.7-8.8L1.9 2.9h6.8l4.7 6.2 5.5-6.2zm-1.2 17.3h1.8L7.2 4.6H5.3l12.4 15.6z"/></svg>,
  fb: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.26-1.6 1.63-1.6h1.74V3.5C16.5 3.44 15.4 3.3 14.1 3.3c-2.7 0-4.6 1.65-4.6 4.68v2.32H6.7v3.3h2.8V22z"/></svg>,
  li: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20.5H6.94V8.5zM5.25 3.25a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20.5h-3.37v-6.3c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33v6.41H9.18V8.5h3.24v1.64h.05c.45-.85 1.56-1.75 3.2-1.75 3.43 0 4.06 2.26 4.06 5.2v6.9z"/></svg>
};

const accounts = [
  { name:"Orgalife Food", tag:"Food & Beverage", platforms:{ insta:"#", threads:"#", x:"#", fb:"#", li:false } },
  { name:"Chouhan Housing", tag:"Real Estate", platforms:{ insta:"#", threads:false, x:"#", fb:"#", li:"#" } },
  { name:"Gate Academy", tag:"Education", platforms:{ insta:"#", threads:"#", x:"#", fb:"#", li:"#" } },
  { name:"Genique Education", tag:"Education", platforms:{ insta:"#", threads:"#", x:false, fb:"#", li:"#" } },
  { name:"Ethos Link", tag:"Networking", platforms:{ insta:"#", threads:"#", x:"#", fb:false, li:"#" } },
  { name:"Harmoniq Studio", tag:"Wellness Studio", platforms:{ insta:"#", threads:"#", x:false, fb:"#", li:false } },
  { name:"Imperial Fitness", tag:"Fitness", platforms:{ insta:"#", threads:false, x:false, fb:"#", li:false } },
  { name:"Rajim Kumbh 2026", tag:"Event", platforms:{ insta:"#", threads:"#", x:"#", fb:"#", li:false } },
  { name:"Vedas Institute", tag:"Education", platforms:{ insta:"#", threads:"#", x:false, fb:"#", li:"#" } },
  { name:"Chhattisgarhi Agrwal Samaj", tag:"Community", platforms:{ insta:"#", threads:false, x:false, fb:"#", li:false } },
  { name:"Saras Mela 2024", tag:"Featured", featured:true, platforms:{ insta:"#", threads:"#", x:"#", fb:"#", li:false } },
];

const SocialMediaPortfolio = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Preserve existing theme logic if needed, or sync with standard dark mode
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <div className="smp-body">
        <div className="smp-wrap">
          <div className="smp-eyebrow">Social Media Management</div>
          <h1 className="smp-h1">Accounts I run <span className="smp-h1-span">across five platforms.</span></h1>
          <p className="smp-sub">Instagram, Threads, X, Facebook aur LinkedIn — content, community aur growth ek jagah se handle kiya jaata hai. Neeche har client ka live network dikh raha hai.</p>

          <div className="smp-stats">
            <div className="smp-stat"><b className="smp-stat-b">11</b><span className="smp-stat-span">Accounts managed</span></div>
            <div className="smp-stat"><b className="smp-stat-b">05</b><span className="smp-stat-span">Platforms covered</span></div>
            <div className="smp-stat"><b className="smp-stat-b">06</b><span className="smp-stat-span">Industries</span></div>
            <div className="smp-stat"><b className="smp-stat-b">2024–26</b><span className="smp-stat-span">Active window</span></div>
          </div>

          <div className="smp-legend">
            {['insta', 'threads', 'x', 'fb', 'li'].map(key => (
              <div key={key} className="smp-legend-item">
                {ICONS[key as keyof typeof ICONS]}
                {key === 'insta' ? 'Instagram' : key === 'threads' ? 'Threads' : key === 'x' ? 'X' : key === 'fb' ? 'Facebook' : 'LinkedIn'}
              </div>
            ))}
          </div>

          <div className="smp-grid">
            {accounts.map((acc, i) => {
              const order = ["insta","threads","x","fb","li"] as const;
              const activeCount = order.filter(k => acc.platforms[k]).length;

              return (
                <div key={i} className={`smp-card ${acc.featured ? 'smp-featured' : ''}`}>
                  <div className="smp-card-top">
                    <div>
                      <div className="smp-name">{acc.name}</div>
                      <div className="smp-handle">{activeCount}/5 platforms live</div>
                    </div>
                    <div className={`smp-tag ${acc.featured ? 'smp-hot' : ''}`}>{acc.tag}</div>
                  </div>
                  <div className="smp-meter">
                    {order.map((k, idx) => (
                      <i key={idx} className={acc.platforms[k] ? 'smp-on' : ''}></i>
                    ))}
                  </div>
                  <div className="smp-platforms">
                    {order.map((k, idx) => {
                      const val = acc.platforms[k];
                      const href = (val && val !== true) ? val : '#';
                      const off = val ? '' : 'smp-off';
                      return (
                        <a key={idx} href={href} target="_blank" rel="noopener noreferrer" data-p={k} className={off} title={k}>
                          {ICONS[k]}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <footer className="smp-footer">
            <span>Portfolio · Social Media Manager</span>
            <span>Filled dot = live &amp; managed · outline = not on this platform</span>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SocialMediaPortfolio;
