import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, Github, Linkedin, Code2, Palette, TrendingUp, Star, Megaphone, PenTool, Video, BarChart, ShoppingCart, Globe, Sparkles, Award, Grid3x3, Box as BoxIcon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
import MouseParallax from '@/components/MouseParallax';
import FloatingIcons from '@/components/FloatingIcons';
import Portfolio3DGallery from '@/components/3d/Portfolio3DGallery';

const Scene3D = lazy(() => import('@/components/3d/Scene3D'));

gsap.registerPlugin(ScrollTrigger);

// Import images
import nahushProfile from "@/assets/nahush-profile.webp";
import nahushAbout from "@/assets/nahush-about.webp";
import projectKisan from "@/assets/project-kisan.webp";
import linkpostAi from "@/assets/linkpost-ai.webp";
import tindog from "@/assets/tindog.webp";
import portfolioProject from "@/assets/portfolio-project.webp";
import poetree from "@/assets/poetree.webp";
import calmmindAi from "@/assets/calmmind-ai.webp";

const Portfolio = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');
  const [activeProject3D, setActiveProject3D] = useState<string>('');
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
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

      // Certifications section scroll animation
      if (certificationsRef.current) {
        gsap.from(certificationsRef.current, {
          scrollTrigger: {
            trigger: certificationsRef.current,
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
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      e.currentTarget.reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Project categories with subcategories
  const projectCategories = {
    'work-experience': {
      name: 'Work Experience',
      icon: Award,
      color: 'blue',
      subcategories: [
        { id: 'management', name: 'Management', icon: TrendingUp },
        { id: 'executive', name: 'Executive', icon: Star }
      ]
    },
    'project-based': {
      name: 'Project-Based',
      icon: Megaphone,
      color: 'purple',
      subcategories: [
        { id: 'marketing', name: 'Social Media Marketing', icon: Video },
        { id: 'design', name: 'Graphic Design', icon: PenTool }
      ]
    }
  };

  const projects = [
    {
      title: "Digital Marketing Manager @ ORGALIFE",
      description: "Managed social media platforms, content planning, and audience engagement. Executed Meta Ads campaigns and WhatsApp marketing activities. Planned product launch campaigns and designed graphics.",
      tools: ["Meta Ads", "WhatsApp Marketing", "Graphic Design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Social Media Executive @ CHOUHAN HOUSING",
      description: "Managed Instagram, Facebook, and LinkedIn to increase brand awareness. Executed marketing campaigns, designed promotional creatives, and generated leads. Monitored insights and prepared reports.",
      tools: ["Instagram", "Facebook", "Lead Gen", "Reporting"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Digital Marketing Executive @ GATE ACADEMY X UNACADEMY",
      description: "Oversaw YouTube channel, executed Meta Ads campaigns, designed thumbnails, and implemented on-page and off-page SEO strategies to improve organic traffic.",
      tools: ["YouTube SEO", "Meta Ads", "SEO"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Social Media Manager @ GENIQUE EDUCATION",
      description: "Managed and grew social media accounts across platforms. Handled YouTube SEO, audience engagement, and analyzed performance insights to improve reach.",
      tools: ["Social Media", "Analytics", "Strategy"],
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Rajim Kumbh (Jan 2026 - Feb 2026)",
      description: "Managed end-to-end social media marketing for the event. Planned content calendars, designed promotional posters, and increased event visibility.",
      tools: ["Content Calendar", "Design", "Event Marketing"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Agrawal Samaj Event (2025)",
      description: "Planned and managed social media promotions for the event. Designed digital creatives and executed content strategies to maximize audience engagement.",
      tools: ["Social Media", "Graphic Design"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Saras Mela (2024)",
      description: "Managed social media platforms and event promotions. Designed banners, posters, and promotional creatives to maintain consistent branding.",
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
      { name: "Meta Ads Manager", level: 92, icon: "📢" },
      { name: "SEO Optimization", level: 88, icon: "🔍" },
      { name: "Digital Strategy", level: 90, icon: "📈" },
      { name: "Influencer Marketing", level: 85, icon: "🤝" },
      { name: "Google Analytics", level: 87, icon: "📊" }
    ],
    soft: [
      { name: "Meta Business Suite", level: 93, icon: "💼" },
      { name: "YouTube Studio", level: 88, icon: "▶️" },
      { name: "Canva & Photoshop", level: 90, icon: "🖼️" },
      { name: "Shopify", level: 80, icon: "🛍️" },
      { name: "SEMrush & Yoast", level: 85, icon: "🎯" }
    ]
  };

  const certifications = [
    { name: "Bachelor of Commerce", issuer: "Sri Agrasen Kanya Mahavialaya, Korba, Chhattisgarh", year: "2026" },
    { name: "Digital Marketing Course", issuer: "Bizgurukul (Online)", year: "October 2022" }
  ];

  // Filter projects based on selected categories
  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory !== project.category) return false;
    if (selectedSubCategory === 'all') return true;
    return selectedSubCategory === project.subCategory;
  });

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      
      <div className={`min-h-screen transition-colors duration-300 relative ${isDark ? 'dark bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Kiran Srivastava
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Hero', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-blue-600 transition-colors duration-200 relative ${
                    activeSection === item.toLowerCase() ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
              {['Hero', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-x"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        }}></div>
        
        <FloatingIcons />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <MouseParallax speed={0.03} className="flex-shrink-0 animate-fade-in">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl hover:scale-105 transition-transform duration-300">
                  <img
                    src={nahushProfile}
                    alt="Kiran Srivastava - Digital Marketing Professional"
                    className="w-full h-full object-cover"
                  />
                </div>
                <MouseParallax speed={0.08} className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-4xl animate-bounce">
                  👋
                </MouseParallax>
              </div>
            </MouseParallax>

            {/* Hero Content */}
            <div className="flex-1 text-left lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                Hi, I'm Kiran Srivastava
              </h1>
              <p className="text-xl md:text-3xl mb-6 text-gray-700 dark:text-gray-200 animate-fade-in delay-300 font-semibold">
                Digital Marketing Professional
              </p>
              <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-2xl animate-fade-in delay-500 leading-relaxed">
                Creative and detail-oriented Digital Marketing Professional with hands-on experience in social media management, content strategy, Meta Ads, graphic design, WhatsApp marketing, e-commerce coordination, and website management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-700">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Eye size={20} />
                  View Experience
                </button>
                <a 
                  href="/Kiran_Srivastava_Resume.pdf" 
                  download
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
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
      <section ref={aboutRef} id="about" className={`py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Passionate about creating digital experiences that matter</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm <strong>Kiran Srivastava</strong>, a passionate Digital Marketing Professional skilled in social media strategy, content creation, SEO, Meta Ads, and graphic design. I execute engaging campaigns that boost online presence and visibility for brands.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                With experience at <strong>ORGALIFE</strong>, <strong>CHOUHAN HOUSING</strong>, <strong>GATE ACADEMY</strong>, and <strong>GENIQUE EDUCATION</strong>, I bring a unique blend of campaign execution and data-driven marketing skills.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Core Competencies:</h3>
                <div className="grid grid-cols-2 gap-3">
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
                    <div key={competency} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      <span className="text-sm font-medium">{competency}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Award size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">Digital Marketer</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Star size={18} className="text-purple-600" />
                  <span className="text-sm font-medium">Content Creator</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                  <TrendingUp size={18} className="text-pink-600" />
                  <span className="text-sm font-medium">SEO Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-blue-600 to-purple-600">
                  <img
                    src={nahushAbout}
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
      <section ref={skillsRef} id="skills" className="py-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Mastering the art of digital creation through cutting-edge technologies and strategic marketing excellence
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Frontend Development */}
            <div className="skill-category skill-card group">
              <div className={`h-full p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 hover:border-blue-500/50' 
                  : 'bg-gradient-to-br from-blue-50/80 to-white/80 border-blue-200/50 hover:border-blue-400/50'
              } hover:shadow-2xl hover:shadow-blue-500/20`}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Code2 className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">Content & Design</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Building engaging assets</p>
                </div>
                
                <div className="space-y-6">
                  {skills.frontend.map((skill, index) => (
                    <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
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
            <div className="skill-category skill-card group">
              <div className={`h-full p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-700/30 hover:border-purple-500/50' 
                  : 'bg-gradient-to-br from-purple-50/80 to-white/80 border-purple-200/50 hover:border-purple-400/50'
              } hover:shadow-2xl hover:shadow-purple-500/20`}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Palette className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">Digital Marketing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Driving growth through strategy</p>
                </div>
                
                <div className="space-y-6">
                  {skills.marketing.map((skill, index) => (
                    <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
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
            <div className="skill-category skill-card group">
              <div className={`h-full p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-br from-pink-900/30 to-pink-800/20 border-pink-700/30 hover:border-pink-500/50' 
                  : 'bg-gradient-to-br from-pink-50/80 to-white/80 border-pink-200/50 hover:border-pink-400/50'
              } hover:shadow-2xl hover:shadow-pink-500/20`}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <TrendingUp className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-pink-600 mb-2">Strategic Skills</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Business growth expertise</p>
                </div>
                
                <div className="space-y-6">
                  {skills.soft.map((skill, index) => (
                    <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold text-pink-600">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-1000 ease-out"
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
          <div className="mt-20 grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">16+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Skills Mastered</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Code2 className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Development Technologies</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Palette className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Marketing Tools</div>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">89%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Average Proficiency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className={`py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Showcasing professional work across digital marketing and web development</p>
          </div>
          
          {/* Main Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Projects ({projects.length})
            </button>
            
            {Object.entries(projectCategories).map(([key, category]) => {
              const Icon = category.icon;
              const count = projects.filter(p => p.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key);
                    setSelectedSubCategory('all');
                  }}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${category.color === 'blue' ? 'from-blue-600 to-blue-700' : 'from-purple-600 to-purple-700'} text-white shadow-lg scale-105`
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon size={18} />
                  {category.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Subcategory Filter */}
          {selectedCategory !== 'all' && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSubCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              
              {projectCategories[selectedCategory as keyof typeof projectCategories].subcategories.map((sub) => {
                const SubIcon = sub.icon;
                const count = projects.filter(p => p.category === selectedCategory && p.subCategory === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedSubCategory === sub.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <SubIcon size={16} />
                    {sub.name} ({count})
                  </button>
                );
              })}
            </div>
          )}
          
          {/* View Mode Toggle */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Grid3x3 size={18} />
              Grid View
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                viewMode === '3d'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <BoxIcon size={18} />
              3D Gallery
            </button>
          </div>
          
          {/* 3D Gallery View */}
          {viewMode === '3d' && (
            <div className="mb-12">
              <Portfolio3DGallery
                projects={filteredProjects.map((p, idx) => ({
                  id: `project-${idx}`,
                  name: p.title,
                  color: p.category === 'digital-marketing' ? '#9333ea' : '#2563eb'
                }))}
                onProjectClick={(id) => {
                  setActiveProject3D(id);
                  const idx = parseInt(id.split('-')[1]);
                  if (filteredProjects[idx]?.liveLink) {
                    window.open(filteredProjects[idx].liveLink, '_blank');
                  }
                }}
                activeProjectId={activeProject3D}
              />
              <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                Click on any card to view the project
              </p>
            </div>
          )}
          
          {/* Projects Grid */}
          {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="project-card group">
                <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'} hover:scale-105`}>
                  {/* Media Container with fixed aspect ratio to prevent shifting */}
                  <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {project.mediaType === 'video' ? (
                      // Video with different aspect ratios
                      <div className={`relative w-full ${
                        project.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-96 mx-auto' :
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
                    ) : (
                      // Image with border for graphic design
                      <div className={`relative ${project.subCategory === 'graphic-design' ? 'p-4' : ''}`}>
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
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-white text-xs rounded-full font-medium shadow-lg ${
                        project.category === 'digital-marketing' 
                          ? 'bg-purple-600' 
                          : 'bg-blue-600'
                      }`}>
                        {projectCategories[project.category as keyof typeof projectCategories].name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-xs rounded-md font-medium">
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-md">
                          +{project.tools.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group-hover:gap-3"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <section ref={certificationsRef} id="certifications" className={`py-20 relative z-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Certifications & Training</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Professional credentials and continuous learning</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className={`certification-card p-6 rounded-xl border-2 border-dashed ${isDark ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/10' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'} transition-all duration-300 hover:scale-105`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{cert.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mt-1 font-medium">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className={`py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Let's collaborate and create something amazing</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:srivastavakirann012@gmail.com" className="text-blue-600 hover:underline">
                        srivastavakirann012@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a href="https://wa.me/919340630254" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                        +91 934-063-0254
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Website</p>
                      <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        reallygreatsite.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Github size={20} />
                </a>
                <a href="https://wa.me/7875783498" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 relative z-10 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
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
    </div>
    </>
  );
};

export default Portfolio;