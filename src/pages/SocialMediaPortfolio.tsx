import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import './SocialMediaPortfolio.css';

import instaIcon from '@/assets/Icons/instagram.svg';
import threadsIcon from '@/assets/Icons/threads.svg';
import xIcon from '@/assets/Icons/x.svg';
import fbIcon from '@/assets/Icons/facebook.svg';
import liIcon from '@/assets/Icons/linkedin.svg';

const ICONS = {
  insta: <img src={instaIcon} alt="Instagram" className="smp-icon-img" />,
  threads: <img src={threadsIcon} alt="Threads" className="smp-icon-img" />,
  x: <img src={xIcon} alt="X" className="smp-icon-img" />,
  fb: <img src={fbIcon} alt="Facebook" className="smp-icon-img" />,
  li: <img src={liIcon} alt="LinkedIn" className="smp-icon-img" />
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
