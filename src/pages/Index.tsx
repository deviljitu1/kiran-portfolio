import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, Github, Linkedin, Code2, Palette, TrendingUp, Star, Megaphone, PenTool, Video, BarChart, ShoppingCart, Globe, Sparkles, Award, Grid3x3, Box as BoxIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
import MouseParallax from '@/components/MouseParallax';
import FloatingIcons from '@/components/FloatingIcons';
gsap.registerPlugin(ScrollTrigger);

// Import images
import kiranProfile from "@/assets/hero.jpeg";
import projectKisan from "@/assets/project-kisan.webp";
import linkpostAi from "@/assets/linkpost-ai.webp";
import tindog from "@/assets/tindog.webp";
import portfolioProject from "@/assets/portfolio-project.webp";
import poetree from "@/assets/poetree.webp";
import calmmindAi from "@/assets/calmmind-ai.webp";

// Import icons
import instagramIcon from "@/assets/Icons/instagram.svg";
import metaIcon from "@/assets/Icons/meta.svg";
import shopifyIcon from "@/assets/Icons/shopify.svg";
import whatsappIcon from "@/assets/Icons/whatsapp.svg";

type Project = {
  title: string;
  description: string;
  tools: string[];
  liveLink: string;
  category: string;
  subCategory: string;
  mediaType: string;
  image?: string;
  video?: string;
  aspectRatio?: string;
  iframeSrc?: string;
  graphicCategory?: string;
};

const Portfolio = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('digital-marketing');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedGraphicCategory, setSelectedGraphicCategory] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');
  const [activeProject3D, setActiveProject3D] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations on load
  useEffect(() => {
    if (!isLoading) {
      // Hero section animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // About section scroll animation
      if (aboutRef.current) {
        gsap.from(aboutRef.current, {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });
      }

      // Skills section scroll animation
      if (skillsRef.current) {
        gsap.from(skillsRef.current, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });

        // Animate skill cards
        const skillCards = skillsRef.current.querySelectorAll('.skill-card');
        gsap.from(skillCards, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }

      // Projects section scroll animation
      if (projectsRef.current) {
        gsap.from(projectsRef.current, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });

        // Animate project cards
        const projectCards = projectsRef.current.querySelectorAll('.project-card');
        gsap.from(projectCards, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.9,
          y: 50,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }

      // Experience section scroll animation
      if (experienceRef.current) {
        gsap.from(experienceRef.current, {
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });
      }

      // Contact section scroll animation
      if (contactRef.current) {
        gsap.from(contactRef.current, {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });
      }
    }
  }, [isLoading]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Open default mail client
    window.location.href = `mailto:srivastavakirann012@gmail.com?subject=${subject}&body=${body}`;

    toast({
      title: "Opening email client...",
      description: "Please complete sending the email from your email application.",
    });

    e.currentTarget.reset();
    setIsSubmitting(false);
  };

  // Project categories with subcategories
  const projectCategories = {
    'digital-marketing': {
      name: 'Digital Marketing',
      icon: Megaphone,
      color: 'purple',
      subcategories: [
        { id: 'graphic-design', name: 'Graphic Design', icon: PenTool },
        { id: 'social-media', name: 'Social Media Content', icon: Video },
        { id: 'case-study', name: 'Case Studies', icon: Award },
        { id: 'seo', name: 'SEO Projects', icon: TrendingUp },
        { id: 'email-marketing', name: 'Email Marketing', icon: Mail },
        { id: 'paid-ads', name: 'Paid Advertising', icon: BarChart }
      ]
    }
  };

  const portfolioImports = import.meta.glob('@/assets/My Portfolio/**/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

  const generatedProjects: Project[] = Object.entries(portfolioImports).map(([path, url]) => {
    const parts = path.split('/');
    const fileName = parts.pop() || '';
    const folderName = parts.pop() || '';
    const title = fileName.replace(/\.[^/.]+$/, "");

    return {
      title: title,
      description: `Creative design work for ${folderName}`,
      tools: ["Graphic Design", "Photoshop", "Illustrator"],
      image: url as string,
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "graphic-design",
      mediaType: "image",
      graphicCategory: folderName
    };
  });

  const graphicCategories = Array.from(new Set(generatedProjects.map(p => p.graphicCategory))).filter(Boolean) as string[];

  const projects: Project[] = [
    {
      title: "Orgalife Food Reel 1",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DSFMZfYDKY1/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DSFMZfYDKY1/embed"
    },
    {
      title: "Orgalife Food Reel 2",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DTHnQl5DAyi/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DTHnQl5DAyi/embed"
    },
    {
      title: "Orgalife Food Reel 3",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DO8fqHmjsb6/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DO8fqHmjsb6/embed"
    },
    {
      title: "Digital Pallavi Reel",
      description: "Social media reel for Digital Pallavi.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DOOJbE2CaJr/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DOOJbE2CaJr/embed"
    },
    {
      title: "Orgalife Food Reel 4",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DLL-6OwxKpi/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DLL-6OwxKpi/embed"
    },
    {
      title: "Orgalife Food Reel 5",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DLo8Fr0TdBL/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DLo8Fr0TdBL/embed"
    },
    ...generatedProjects,

  ];

  const experiences = [
    {
      title: "Digital Marketing Manager @ ORGALIFE (Dec 2023 - Present)",
      description: "Managed social media platforms, content strategy, and audience engagement. Executed Meta Ads, WhatsApp marketing, and product launch campaigns. Planned content calendars and managed influencer marketing, barter collaborations, and brand partnerships. Managed day-to-day e-commerce and digital marketing operations. Designed social media creatives, ad graphics, and promotional materials. Managed SEO activities and optimized Google Business Profile (GMB) to improve online visibility and local search performance.",
      tools: ["Meta Ads", "WhatsApp Marketing", "Graphic Design", "SEO"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Social Media Executive @ CHOUHAN HOUSING (May 2023 - Nov 2023)",
      description: "Managed Instagram, Facebook, and Youtube accounts to increase brand awareness and engagement. Planned and executed social media content and marketing campaigns. Designed graphics, posts, banners, and promotional creatives for digital platforms. Created and edited reels and visual content for property promotions. Generated leads through social media campaigns and optimized performance. Monitored insights and prepared reports to improve campaign results.",
      tools: ["Instagram", "Facebook", "Youtube", "Lead Gen", "Reporting"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Digital Marketing Executive @ GATE ACADEMY X UNACADEMY (Apr 2022 - Apr 2023)",
      description: "Managed social media platforms and YouTube channel operations. Executed Meta Ads campaigns to drive leads and conversions. Designed social media creatives, thumbnails, and ad graphics. Implemented SEO strategies to improve website visibility and rankings. Analyzed campaign performance and optimized marketing efforts.",
      tools: ["YouTube", "Meta Ads", "SEO"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Social Media Manager @ GENIQUE EDUCATION (Sept 2020 - Mar 2022)",
      description: "Managed and grew social media accounts across Facebook, Instagram, LinkedIn, and Twitter. Handled YT channel management, including content planning, video SEO, thumbnails, & audience engagement. Designed creative graphics for posts, stories, ads, and promotional campaigns. Analyzed performance insights and implemented strategies to improve reach and engagement. Collaborated with teams to create effective digital marketing campaigns.",
      tools: ["Social Media", "Video SEO", "Analytics"],
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Rajim Kumbh (Jan 2026 - Feb 2026)",
      description: "Managed end-to-end social media marketing for the event. Planned and executed content calendars across digital platforms. Designed promotional creatives, posters, and campaign graphics. Increased event visibility through engaging social media campaigns. Coordinated with the team to ensure timely campaign execution.",
      tools: ["Content Calendar", "Design", "Event Marketing"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Rashtriye Kavi Sammelan (Jan 2026)",
      description: "Planned and managed social media promotions for the event. Designed digital creatives and promotional content. Executed content strategy to maximize audience engagement. Coordinated with organizers for campaign planning.",
      tools: ["Social Media", "Graphic Design", "Content Strategy"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Saras Mela (Feb 2024)",
      description: "Managed social media platforms and event promotions. Designed banners, posters, and promotional creatives. Created engaging content to increase audience reach. Maintained consistent branding across digital channels. Supported online marketing activities throughout the event.",
      tools: ["Graphic Design", "Social Media", "Branding"],
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "design",
      mediaType: "image"
    }
  ];

  const skills = {
    frontend: [
      { name: "Content Creation", level: 95, icon: "✍️" },
      { name: "Graphic Design", level: 90, icon: "🎨" },
      { name: "Email Marketing", level: 88, icon: "📧" },
      { name: "Campaign Planning", level: 85, icon: "📅" },
      { name: "Marketing Automation", level: 90, icon: "🤖" },
      { name: "E-commerce Marketing", level: 82, icon: "🛒" }
    ],
    marketing: [
      { name: "Social Media Mgt", level: 95, icon: "📱" },
      { name: "Meta Ads Manager", level: 92, icon: <img src={metaIcon} alt="Meta" className="w-5 h-5" /> },
      { name: "SEO Optimization", level: 88, icon: "🔍" },
      { name: "Digital Strategy", level: 90, icon: "📈" },
      { name: "Influencer Marketing", level: 85, icon: "🤝" },
      { name: "Google Analytics", level: 87, icon: "📊" }
    ],
    soft: [
      { name: "Meta Business Suite", level: 93, icon: <img src={metaIcon} alt="Meta" className="w-5 h-5" /> },
      { name: "YouTube Studio", level: 88, icon: "▶️" },
      { name: "Canva & Photoshop", level: 90, icon: "🖼️" },
      { name: "Shopify", level: 80, icon: <img src={shopifyIcon} alt="Shopify" className="w-5 h-5" /> },
      { name: "SEMrush & Yoast", level: 85, icon: "🎯" }
    ]
  };

  const certifications = [
    { name: "Bachelor of Commerce", issuer: "Sri Agrasen Kanya Mahavialaya, Korba, Chhattisgarh", year: "2026" },
    { name: "Digital Marketing Course", issuer: "Bizgurukul (Online)", year: "October 2022" }
  ];

  // Filter projects based on selected categories
  const filteredProjects = projects.filter(project => {
    if (selectedCategory !== 'all' && selectedCategory !== project.category) return false;
    if (selectedSubCategory !== 'all' && selectedSubCategory !== project.subCategory) return false;
    if (selectedSubCategory === 'graphic-design' && selectedGraphicCategory !== 'all' && project.graphicCategory !== selectedGraphicCategory) return false;
    return true;
  });

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}



      <div className={`min-h-screen transition-colors duration-300 relative ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-sm`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Kiran Srivastava
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`hover:text-yellow-500 transition-colors duration-200 relative ${activeSection === item.toLowerCase() ? 'text-yellow-500 font-medium' : ''
                      }`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-3 py-2 text-base font-medium hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-yellow-500/10 to-yellow-600/10 animate-gradient-x"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          }}></div>

          <FloatingIcons />

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              {/* Profile Image */}
              <MouseParallax speed={0.03} className="flex-shrink-0 animate-fade-in">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl hover:scale-105 transition-transform duration-300">
                    <img
                      src={kiranProfile}
                      alt="Kiran Srivastava - Digital Marketing Professional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <MouseParallax speed={0.08} className="absolute -bottom-2 -right-2 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-2xl md:text-4xl animate-bounce">
                    👋
                  </MouseParallax>
                </div>
              </MouseParallax>

              {/* Hero Content */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-fade-in">
                  Hi, I'm Kiran Srivastava
                </h1>
                <p className="text-lg md:text-3xl mb-3 md:mb-6 text-gray-700 dark:text-gray-200 animate-fade-in delay-300 font-semibold">
                  Digital Marketing Professional
                </p>
                <p className="text-sm md:text-lg mb-5 md:mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 animate-fade-in delay-500 leading-relaxed">
                  Creative and detail-oriented Digital Marketing Professional with hands-on experience in social media management, content strategy, Meta Ads, graphic design, WhatsApp marketing, e-commerce coordination, and website management.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-in delay-700">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Eye size={20} />
                    View Experience
                  </button>
                  <a
                    href="/Kiran_Srivastava_Resume.pdf"
                    download
                    className="px-6 py-3 md:px-8 md:py-4 border-2 border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Download size={20} />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className={`py-10 md:py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">About Me</h2>
              <p className="text-base md:text-xl text-gray-600 dark:text-gray-300">Passionate about creating digital experiences that matter</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm <strong>Kiran Srivastava</strong>, a passionate Digital Marketing Professional skilled in social media strategy, content creation, SEO, Meta Ads, and graphic design. I execute engaging campaigns that boost online presence and visibility for brands.
                </p>

                <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  With experience at <strong>ORGALIFE</strong>, <strong>CHOUHAN HOUSING</strong>, <strong>GATE ACADEMY</strong>, and <strong>GENIQUE EDUCATION</strong>, I bring a unique blend of campaign execution and data-driven marketing skills.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-yellow-500">Core Competencies:</h3>
                  <div className="grid grid-cols-2 gap-1 md:gap-3">
                    {[
                      'Social Media Strategy',
                      'Content Creation',
                      'SEO Optimization',
                      'Meta Ads Manager',
                      'Graphic Design',
                      'Analytics & Tracking',
                      'Campaign Planning',
                      'E-commerce Marketing',
                      'Influencer Marketing',
                      'Email Marketing'
                    ].map((competency) => (
                      <div key={competency} className="flex items-center space-x-2 p-1.5 md:p-2 rounded-lg hover:bg-yellow-500 dark:hover:bg-yellow-500/20 transition-colors">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex-shrink-0"></div>
                        <span className="text-xs md:text-sm font-medium">{competency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 pt-3 md:pt-4">
                  <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-yellow-500 dark:bg-yellow-500/30 rounded-full">
                    <Award size={16} className="text-yellow-500" />
                    <span className="text-xs md:text-sm font-medium">Digital Marketer</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-yellow-500 dark:bg-yellow-500/30 rounded-full">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-xs md:text-sm font-medium">Content Creation</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-yellow-500 dark:bg-yellow-500/30 rounded-full">
                    <TrendingUp size={16} className="text-yellow-500" />
                    <span className="text-xs md:text-sm font-medium">SEO Specialist</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-full max-w-xs md:max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-yellow-400 to-yellow-600">
                    <img
                      src={kiranProfile}
                      alt="Kiran Srivastava"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} id="skills" className="py-10 md:py-20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/50 via-yellow-500/30 to-yellow-600/50 dark:from-yellow-400/10 dark:via-yellow-500/10 dark:to-yellow-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <p className="text-sm md:text-xl text-gray-400 dark:text-gray-300 max-w-2xl mx-auto">
                Mastering the art of digital creation through cutting-edge technologies and strategic marketing excellence
              </p>
              <div className="mt-4 md:mt-8 flex justify-center">
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5 md:gap-10">
              {/* Frontend Development */}
              <div className="skill-category skill-card group relative">
                <div className={`h-full p-4 md:p-5 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                  isDark 
                    ? 'bg-[#0B1120] border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)] hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]' 
                    : 'bg-white border-blue-500/20 shadow-xl'
                }`}>
                  <div className="text-center mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <Code2 className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Content & Design</h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4">Building engaging assets</p>
                    <div className="w-12 h-1 bg-blue-500 rounded-full mx-auto"></div>
                  </div>
                  
                  <div className="space-y-2">
                    {skills.frontend.map((skill, index) => (
                      <div key={skill.name} className="skill-item bg-gray-100 dark:bg-[#12182A] rounded-xl p-3 md:p-4 border border-gray-200 dark:border-white/5" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl">{skill.icon}</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{skill.name}</span>
                          </div>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-800/80 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${skill.level}%`,
                              animationDelay: `${index * 0.2}s`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Marketing Skills */}
              <div className="skill-category skill-card group relative">
                <div className={`h-full p-5 md:p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${isDark
                    ? 'bg-[#0B1120] border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:border-yellow-500/50 hover:shadow-[0_0_35px_rgba(234,179,8,0.25)]'
                    : 'bg-white border-yellow-500/30 shadow-xl'
                  }`}>
                  <div className="text-center mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.5)] flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <Palette className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Digital Marketing</h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4">Driving growth through strategy</p>
                    <div className="w-12 h-1 bg-yellow-500 rounded-full mx-auto"></div>
                  </div>

                  <div className="space-y-4">
                    {skills.marketing.map((skill, index) => (
                      <div key={skill.name} className="skill-item bg-gray-100 dark:bg-[#12182A] rounded-xl p-3 md:p-4 border border-gray-200 dark:border-white/5" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl">{skill.icon}</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{skill.name}</span>
                          </div>
                          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded-md">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-800/80 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-yellow-600 dark:to-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              animationDelay: `${index * 0.2}s`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategic Skills */}
              <div className="skill-category skill-card group relative">
                <div className={`h-full p-5 md:p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${isDark
                    ? 'bg-[#0B1120] border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                    : 'bg-white border-cyan-500/20 shadow-xl'
                  }`}>
                  <div className="text-center mb-6 md:mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">Strategic Skills</h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4">Business growth expertise</p>
                    <div className="w-12 h-1 bg-cyan-500 rounded-full mx-auto"></div>
                  </div>

                  <div className="space-y-4">
                    {skills.soft.map((skill, index) => (
                      <div key={skill.name} className="skill-item bg-gray-100 dark:bg-[#12182A] rounded-xl p-3 md:p-4 border border-gray-200 dark:border-white/5" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl">{skill.icon}</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{skill.name}</span>
                          </div>
                          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/40 px-2 py-1 rounded-md">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-800/80 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 dark:from-cyan-600 dark:to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              animationDelay: `${index * 0.2}s`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Summary Stats */}
            <div className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center group p-6 rounded-2xl bg-white/40 dark:bg-[#12182A]/40 backdrop-blur-lg border border-white/50 dark:border-white/10 shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Star className="text-white" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">16+</div>
                <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">Skills Mastered</div>
              </div>

              <div className="text-center group p-6 rounded-2xl bg-white/40 dark:bg-[#12182A]/40 backdrop-blur-lg border border-white/50 dark:border-white/10 shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="text-white" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2">6+</div>
                <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">Tech Stack</div>
              </div>

              <div className="text-center group p-6 rounded-2xl bg-white/40 dark:bg-[#12182A]/40 backdrop-blur-lg border border-white/50 dark:border-white/10 shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Palette className="text-white" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent mb-2">6+</div>
                <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">Design Tools</div>
              </div>

              <div className="text-center group p-6 rounded-2xl bg-white/40 dark:bg-[#12182A]/40 backdrop-blur-lg border border-white/50 dark:border-white/10 shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent mb-2">89%</div>
                <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">Avg Proficiency</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className={`py-10 md:py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Featured Projects</h2>
              <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300">Showcasing professional work across digital marketing and web development</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${selectedSubCategory === 'all'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                All
              </button>

              {projectCategories['digital-marketing'].subcategories.map((sub) => {
                const SubIcon = sub.icon;
                const count = projects.filter(p => p.subCategory === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.id)}
                    className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${selectedSubCategory === sub.id
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    <SubIcon size={18} />
                    {sub.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Graphic Category Filter */}
            {selectedSubCategory === 'graphic-design' && graphicCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setSelectedGraphicCategory('all')}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${selectedGraphicCategory === 'all'
                      ? 'bg-yellow-500 text-black shadow-md'
                      : 'bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  All Designs
                </button>

                {graphicCategories.map((gCat) => {
                  const count = projects.filter(p => p.category === selectedCategory && p.subCategory === 'graphic-design' && p.graphicCategory === gCat).length;
                  return (
                    <button
                      key={gCat}
                      onClick={() => setSelectedGraphicCategory(gCat)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${selectedGraphicCategory === gCat
                          ? 'bg-yellow-500 text-black shadow-md'
                          : 'bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                      <Palette size={14} />
                      {gCat} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {filteredProjects.map((project, index) => (
                <div key={index} className="project-card group">
                  <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:scale-105`}>
                    {/* Media Container with fixed aspect ratio to prevent shifting */}
                    <div className="relative overflow-hidden bg-gray-800 dark:bg-gray-800">
                      {project.mediaType === 'video' ? (
                        // Video with different aspect ratios
                        <div className={`relative w-full ${project.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-96 mx-auto' :
                            project.aspectRatio === '1:1' ? 'aspect-square' :
                              'aspect-video'
                          }`}>
                          <video
                            className="w-full h-full object-cover"
                            controls
                            poster={`https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop`}
                          >
                            <source src={project.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                            {project.aspectRatio}
                          </div>
                        </div>
                      ) : project.mediaType === 'iframe' ? (
                        <div className="relative w-full overflow-hidden aspect-[9/16]">
                          <iframe
                            src={project.iframeSrc}
                            className="absolute top-0 left-0 w-full border-0"
                            style={{ height: 'calc(100% + 150px)' }}
                            allowTransparency={true}
                            allow="encrypted-media"
                            scrolling="no"
                          />
                        </div>
                      ) : (
                        // Image with border for graphic design
                        <div
                          className={`relative ${project.subCategory === 'graphic-design' ? 'p-4 cursor-pointer' : ''}`}
                          onClick={() => project.subCategory === 'graphic-design' && setLightboxIndex(index)}
                        >
                          <div className={`${project.subCategory === 'graphic-design' ? 'border-4 border-white dark:border-gray-700 rounded-lg shadow-lg' : ''} overflow-hidden aspect-[4/3]`}>
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    </div>

                    {project.subCategory !== 'graphic-design' && (
                      <div className="p-4 md:p-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tools.slice(0, 3).map((tool) => (
                            <span key={tool} className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-400/30 dark:to-yellow-600/30 text-xs rounded-md font-medium">
                              {tool}
                            </span>
                          ))}
                          {project.tools.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 dark:text-gray-300 dark:bg-gray-700 text-xs rounded-md">
                              +{project.tools.length - 3} more
                            </span>
                          )}
                        </div>

                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-500 font-medium text-sm transition-colors group-hover:gap-3"
                        >
                          <ExternalLink size={16} />
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} id="experience" className={`py-10 md:py-20 relative z-10 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Experience & Education</h2>
              <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300">Professional journey and academic background</p>
            </div>

            <div className="mb-10 md:mb-16">
              <h3 className="text-2xl md:text-3xl font-bold mb-5 md:mb-8 text-center text-gray-900 dark:text-white">Work Experiences</h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
                {experiences.filter(e => e.category === 'work-experience').map((exp, index) => (
                  <div key={index} className={`p-5 md:p-8 rounded-2xl border-2 border-solid ${isDark ? 'border-gray-700 bg-gray-800 hover:border-yellow-500' : 'border-gray-200 bg-white hover:border-yellow-500'} transition-all duration-300 hover:shadow-lg`}>
                    <h4 className="font-bold text-base md:text-xl mb-1.5 md:mb-2 text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map(tool => (
                        <span key={tool} className="px-3 py-1 bg-yellow-500 dark:bg-yellow-500/40 text-yellow-500 dark:text-yellow-500 text-xs rounded-full font-medium">{tool}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10 md:mb-16">
              <h3 className="text-2xl md:text-3xl font-bold mb-5 md:mb-8 text-center text-gray-900 dark:text-white">Project-Based Experience</h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
                {experiences.filter(e => e.category === 'project-based').map((exp, index) => (
                  <div key={index} className={`p-5 md:p-8 rounded-2xl border-2 border-solid ${isDark ? 'border-gray-700 bg-gray-800 hover:border-yellow-500' : 'border-gray-200 bg-white hover:border-yellow-500'} transition-all duration-300 hover:shadow-lg`}>
                    <h4 className="font-bold text-base md:text-xl mb-1.5 md:mb-2 text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map(tool => (
                        <span key={tool} className="px-3 py-1 bg-yellow-500 dark:bg-yellow-500/40 text-yellow-500 dark:text-yellow-500 text-xs rounded-full font-medium">{tool}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-5 md:mb-8 text-center text-gray-900 dark:text-white">Education & Certifications</h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
                {certifications.map((cert, index) => (
                  <div key={index} className={`certification-card p-5 md:p-8 rounded-2xl border-2 border-dashed ${isDark ? 'border-gray-600 hover:border-yellow-500 hover:bg-yellow-500/10' : 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-500'} transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg`}>
                    <div className="text-center">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                        <Award className="text-white" size={24} />
                      </div>
                      <h3 className="font-bold mb-2 md:mb-3 text-base md:text-xl text-gray-900 dark:text-white">{cert.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs md:text-base mb-1.5 md:mb-2 font-medium">{cert.issuer}</p>
                      <p className="text-yellow-500 dark:text-yellow-500 text-sm md:text-base font-semibold">{cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className={`py-10 md:py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Get In Touch</h2>
              <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300">Let's discuss how we can work together</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className={`p-4 md:p-6 rounded-2xl flex items-center gap-4 ${isDark ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300 hover:scale-105 shadow-md`}>
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Mail size={20} className="text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-lg mb-1 text-gray-900 dark:text-white">Email</h3>
                        <a href="mailto:srivastavakirann012@gmail.com" className="text-xs md:text-base text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                          srivastavakirann012@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className={`p-4 md:p-6 rounded-2xl flex items-center gap-4 ${isDark ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300 hover:scale-105 shadow-md`}>
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                        <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-lg mb-1 text-gray-900 dark:text-white">WhatsApp</h3>
                        <a href="https://wa.me/919340630254" target="_blank" rel="noopener noreferrer" className="text-xs md:text-base text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                          +91 934-063-0254
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6 mt-6 md:mt-8">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110 shadow-md">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110 shadow-md">
                    <Github size={18} />
                  </a>
                  <a href="https://wa.me/919340630254" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110 shadow-md">
                    <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6 md:w-8 md:h-8" />
                  </a>
                </div>
              </div>

              <div className={`p-6 md:p-10 rounded-2xl shadow-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Send Message</h3>
                <form className="space-y-4 md:space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${isDark ? 'border-gray-700' : 'border-gray-300'} focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm md:text-base text-gray-900 dark:text-white outline-none`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${isDark ? 'border-gray-700' : 'border-gray-300'} focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm md:text-base text-gray-900 dark:text-white outline-none`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border ${isDark ? 'border-gray-700' : 'border-gray-300'} focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm md:text-base text-gray-900 dark:text-white outline-none`}
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 md:py-12 relative z-10 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center space-x-6 mb-6">
                <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform inline-block">
                  <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
                </a>
                <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">
                  <Globe size={24} />
                </a>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                © 2026 Kiran Srivastava. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Digital Marketing Professional | Building Digital Experiences
              </p>
            </div>
          </div>
        </footer>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setLightboxIndex(null)}>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 z-[101]"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                let prevIndex = lightboxIndex - 1;
                while (prevIndex >= 0 && filteredProjects[prevIndex].subCategory !== 'graphic-design') {
                  prevIndex--;
                }
                if (prevIndex < 0) {
                  prevIndex = filteredProjects.length - 1;
                  while (prevIndex >= 0 && filteredProjects[prevIndex].subCategory !== 'graphic-design') {
                    prevIndex--;
                  }
                }
                setLightboxIndex(Math.max(0, prevIndex));
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
              <img
                src={filteredProjects[lightboxIndex].image}
                alt={filteredProjects[lightboxIndex].title}
                className="max-w-full max-h-full object-contain select-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                let nextIndex = lightboxIndex + 1;
                while (nextIndex < filteredProjects.length && filteredProjects[nextIndex].subCategory !== 'graphic-design') {
                  nextIndex++;
                }
                if (nextIndex >= filteredProjects.length) {
                  nextIndex = 0;
                  while (nextIndex < filteredProjects.length && filteredProjects[nextIndex].subCategory !== 'graphic-design') {
                    nextIndex++;
                  }
                }
                setLightboxIndex(Math.min(filteredProjects.length - 1, nextIndex));
              }}
            >
              <ChevronRight size={48} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;