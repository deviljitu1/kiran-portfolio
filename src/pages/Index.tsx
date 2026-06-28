import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, Github, Linkedin, Code2, Palette, TrendingUp, Star, Megaphone, PenTool, Video, BarChart, ShoppingCart, Globe, Sparkles, Award, Grid3x3, Box as BoxIcon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
import MouseParallax from '@/components/MouseParallax';
import FloatingIcons from '@/components/FloatingIcons';
gsap.registerPlugin(ScrollTrigger);

// Import images
import kiranProfile from "@/assets/kiran-profile.jpeg";
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
    },
    'web-development': {
      name: 'Web Development',
      icon: Code2,
      color: 'blue',
      subcategories: [
        { id: 'wordpress', name: 'WordPress Sites', icon: Globe },
        { id: 'react-apps', name: 'React/JavaScript Apps', icon: Code2 },
        { id: 'landing-pages', name: 'Landing Pages', icon: Sparkles },
        { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart },
        { id: 'case-study', name: 'Case Studies', icon: Award }
      ]
    }
  };

  const projects = [
    // Digital Marketing Projects - Graphic Design (images only)
    {
      title: "Brand Identity Design",
      description: "Complete brand identity package including logo, color palette, typography, and brand guidelines for modern businesses.",
      tools: ["Canva", "Adobe Illustrator", "Brand Strategy"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "graphic-design",
      mediaType: "image"
    },
    {
      title: "Social Media Templates",
      description: "Professional social media post templates for Instagram, Facebook, and LinkedIn with consistent branding.",
      tools: ["Canva Pro", "Design Systems", "Social Media"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "graphic-design",
      mediaType: "image"
    },
    {
      title: "Marketing Collateral",
      description: "Professional marketing materials including brochures, flyers, and business cards with cohesive design.",
      tools: ["Adobe Creative Suite", "Print Design", "Typography"],
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "graphic-design",
      mediaType: "image"
    },
    
    // Social Media Content (videos with different aspect ratios)
    {
      title: "Instagram Reels - Vertical 9:16",
      description: "Viral Instagram reels content with engaging hooks, trending audio, and high retention rates.",
      tools: ["Video Editing", "Instagram", "Content Strategy"],
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      aspectRatio: "9:16",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "video"
    },
    {
      title: "YouTube Content - Landscape 16:9",
      description: "Professional YouTube content with SEO-optimized titles, thumbnails, and posting schedule.",
      tools: ["YouTube SEO", "Video Production", "Analytics"],
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      aspectRatio: "16:9",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "video"
    },
    {
      title: "Social Square Posts - 1:1",
      description: "Square format social media videos optimized for Instagram feed and Facebook posts.",
      tools: ["Content Creation", "Social Media", "Editing"],
      video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      aspectRatio: "1:1",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "video"
    },
    
    // Case Studies
    {
      title: "E-Commerce Growth Strategy",
      description: "Complete case study: 300% revenue growth through comprehensive digital marketing strategy and optimization.",
      tools: ["Strategy", "Analytics", "Multi-Channel"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "case-study",
      mediaType: "image"
    },
    {
      title: "Local SEO Optimization",
      description: "Complete local SEO strategy resulting in 300% increase in local search visibility and Google Maps rankings.",
      tools: ["Local SEO", "Google My Business", "Schema Markup"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "seo",
      mediaType: "image"
    },
    {
      title: "Technical SEO Audit",
      description: "Comprehensive technical SEO audit and optimization improving Core Web Vitals and search rankings.",
      tools: ["SEO Tools", "Google Search Console", "PageSpeed"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "seo",
      mediaType: "image"
    },
    {
      title: "Email Automation Flow",
      description: "Advanced email marketing automation with segmentation, personalization, and conversion tracking.",
      tools: ["Mailchimp", "n8n Automation", "Email Marketing"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "email-marketing",
      mediaType: "image"
    },
    {
      title: "Newsletter Design",
      description: "Responsive email newsletter templates with high open rates and click-through rates.",
      tools: ["HTML Email", "Responsive Design", "Canva"],
      image: "https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "email-marketing",
      mediaType: "image"
    },
    {
      title: "Google Ads Campaign",
      description: "High-converting Google Ads campaigns with optimized bidding strategies and 200% ROI improvement.",
      tools: ["Google Ads", "Analytics", "Conversion Tracking"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "paid-ads",
      mediaType: "image"
    },
    {
      title: "Meta Ads Strategy",
      description: "Facebook and Instagram ad campaigns with precise audience targeting and high engagement rates.",
      tools: ["Meta Ads Manager", "Pixel Tracking", "A/B Testing"],
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "paid-ads",
      mediaType: "image"
    },

    // Web Development Projects
    {
      title: "Project Kisan",
      description: "An AI-powered farming assistant under development for Google Hackathon 2025. Designed to assist farmers with soil analysis, irrigation advice, crop planning, and organic solutions using modern AI technologies.",
      tools: ["React", "AI/ML", "Tailwind CSS", "API Integration"],
      image: projectKisan,
      liveLink: "https://project-kisan-ai-farming-assistant-fawn.vercel.app/",
      category: "web-development",
      subCategory: "react-apps",
      mediaType: "image"
    },
    {
      title: "LinkPost AI",
      description: "An AI-powered LinkedIn post generator built with React and OpenAI/Gemini API. Helps craft engaging, SEO-optimized posts with just a click.",
      tools: ["React", "OpenAI API", "Gemini API", "JavaScript"],
      image: linkpostAi,
      liveLink: "https://linkpostai.netlify.app/",
      category: "web-development",
      subCategory: "react-apps",
      mediaType: "image"
    },
    {
      title: "Calm Mind AI",
      description: "An AI-powered mental health support web app providing personalized guidance and resources for mental wellness.",
      tools: ["React", "AI Integration", "Vite", "Tailwind CSS"],
      image: calmmindAi,
      liveLink: "https://calmmindai.netlify.app/",
      category: "web-development",
      subCategory: "react-apps",
      mediaType: "image"
    },
    {
      title: "ShopEZ E-Commerce",
      description: "A modern, demo e-commerce platform built with React, Vite, and Tailwind CSS featuring product catalogs and shopping cart.",
      tools: ["React", "Vite", "Tailwind CSS", "E-Commerce"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "web-development",
      subCategory: "ecommerce",
      mediaType: "image"
    },
    {
      title: "Get Web Digital",
      description: "Professional business website built with WordPress, featuring custom theme, SEO optimization, and contact forms.",
      tools: ["WordPress", "Custom Theme", "SEO", "Contact Forms"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "web-development",
      subCategory: "wordpress",
      mediaType: "image"
    },
    {
      title: "Business Portfolio Site",
      description: "Responsive WordPress business portfolio with custom post types, galleries, and client testimonials.",
      tools: ["WordPress", "Elementor", "Custom CSS", "Plugins"],
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "web-development",
      subCategory: "wordpress",
      mediaType: "image"
    },
    {
      title: "Tindog Landing Page",
      description: "A responsive Tinder-like landing page for dogs, built with Bootstrap 5. Features responsive navigation, pricing cards, and testimonial sections.",
      tools: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
      image: tindog,
      liveLink: "https://deviljitu1.github.io/Tindog/",
      category: "web-development",
      subCategory: "landing-pages",
      mediaType: "image"
    },
    {
      title: "Poetree Blog",
      description: "A minimalist poetry blog with elegant typography and smooth animations, built with HTML, CSS and JavaScript.",
      tools: ["HTML5", "CSS3", "JavaScript", "Animations"],
      image: poetree,
      liveLink: "https://poetreebird.netlify.app/",
      category: "web-development",
      subCategory: "landing-pages",
      mediaType: "image"
    },
    {
      title: "Personal Portfolio",
      description: "My responsive personal portfolio website showcasing projects, skills and experience. Built with modern web technologies.",
      tools: ["React", "Tailwind CSS", "Vite", "TypeScript"],
      image: portfolioProject,
      liveLink: "https://nahushpatel.in/",
      category: "web-development",
      subCategory: "react-apps",
      mediaType: "image"
    },
    {
      title: "Full-Stack App Development",
      description: "Complete case study: Built scalable full-stack application with React frontend and Node.js backend, handling 10K+ users.",
      tools: ["Full-Stack", "React", "Node.js", "Database"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "web-development",
      subCategory: "case-study",
      mediaType: "image"
    }
  ];

  const experiences = [
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
              {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
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
              {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
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
                    src={kiranProfile}
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
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                Hi, I'm Kiran Srivastava
              </h1>
              <p className="text-xl md:text-3xl mb-6 text-gray-700 dark:text-gray-200 animate-fade-in delay-300 font-semibold">
                Digital Marketing Professional
              </p>
              <p className="text-base md:text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 animate-fade-in delay-500 leading-relaxed">
                Creative and detail-oriented Digital Marketing Professional with hands-on experience in social media management, content strategy, Meta Ads, graphic design, WhatsApp marketing, e-commerce coordination, and website management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-700">
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
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">16+</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">Skills Mastered</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Code2 className="text-white" size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">6+</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">Tech Stack</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Palette className="text-white" size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">6+</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">Design Tools</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">89%</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">Avg Proficiency</div>
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
          
          {/* Projects Grid */}
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

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className={`py-20 relative z-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience & Education</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Professional journey and academic background</p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Work Experiences</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {experiences.filter(e => e.category === 'work-experience').map((exp, index) => (
                <div key={index} className={`p-8 rounded-2xl border-2 border-solid ${isDark ? 'border-gray-700 bg-gray-800 hover:border-blue-500' : 'border-gray-200 bg-gray-50 hover:border-blue-500'} transition-all duration-300 hover:shadow-lg`}>
                  <h4 className="font-bold text-xl mb-2">{exp.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map(tool => (
                      <span key={tool} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium">{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Project-Based Experience</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {experiences.filter(e => e.category === 'project-based').map((exp, index) => (
                <div key={index} className={`p-8 rounded-2xl border-2 border-solid ${isDark ? 'border-gray-700 bg-gray-800 hover:border-purple-500' : 'border-gray-200 bg-gray-50 hover:border-purple-500'} transition-all duration-300 hover:shadow-lg`}>
                  <h4 className="font-bold text-xl mb-2">{exp.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map(tool => (
                      <span key={tool} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-xs rounded-full font-medium">{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8 text-center">Education & Certifications</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div key={index} className={`certification-card p-8 rounded-2xl border-2 border-dashed ${isDark ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/10' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'} transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-lg`}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Award className="text-white" size={32} />
                    </div>
                    <h3 className="font-bold mb-3 text-xl">{cert.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base mb-2 font-medium">{cert.issuer}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
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