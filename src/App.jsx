import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, User, Briefcase, Award, Moon, Sun, Building, FileText, BriefcaseBusiness, Users, CheckCircle } from 'lucide-react'; // Added CheckCircle icon
import ReactMarkdown from 'react-markdown';
import ConstellationIO from './assets/constellationio.png';
import SpaceX from './assets/spacex.jpeg';
import TheUniverse from './assets/the-universe.png';
import WorldStaraunts from './assets/world-staraunts.png';
import DevPost from './assets/devpost.png';
import IHatePaywalls from './assets/i-hate-paywalls.png';
import WordSearch from './assets/word-search.png';
import ExoQuery from './assets/exo-query.png';
import KamranMajid from './assets/profile_pix.png'; 
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ReactDOM from 'react-dom';

// Main App component
const App = () => {
  const [appState, setAppState] = useState('landing'); // 'landing', 'recruiter_landing', 'portfolio'
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [jobDescription, setJobDescription] = useState('');
  const [fitAnalysis, setFitAnalysis] = useState(''); // Changed from coverLetter
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedProject, setExpandedProject] = useState(null);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 16 },
  });
  const [openSkillCategories, setOpenSkillCategories] = useState({});

  // Kamran's Resume Content (Hardcoded for LLM prompt)
  const resumeContent = `
Kamran Majid

EDUCATION
University of Washington, Doctor of Philosophy (Expected Graduation, December 2030)
University of Illinois Urbana-Champaign, Bachelor of Science in Computer Science, Dean's List (August 2021 - May 2024)
Relevant Coursework: Data Structures, Discrete Structures, Linear Algebra with Computational Computational Applications, Software Design Lab, Probability and Statistics for CS, Intro to Computer Systems, Intro to Robotics, Ethical Theories, Minds and Machines, Mobile Robotics for CS, Theory of Knowledge, Intro to Algorithms and Models of Computation, Artificial Intelligence, Advanced Symbolic Logic, Programming Languages and Compilers, Intro to Quantum Computing

EXPERIENCE
Software Engineer, SpaceX (Starship/F9) (Aug 2024 - Apr 2025)
- Engineered and deployed a robust data ingestion pipeline for critical flight assets, significantly improving data processing efficiency and reliability.
- Successfully reverse-engineered complex customer tracking software for internal use, enhancing operational visibility and data utilization within the organization.

Software Engineering Intern, SpaceX (Starlink) (Jan 2024 - Aug 2024)
- Developed a comprehensive toolset designed to optimize the Starlink ground network, leading to improved performance and resource allocation.
- Authored and implemented advanced simulation algorithms to intelligently prioritize low-latency ground assets, directly contributing to enhanced network responsiveness and user experience.

Software Engineering Intern, Capital One (Jun 2023 - Aug 2023)
- Built and implemented an end-to-end alerting system capable of detecting critical data anomalies, providing real-time insights and preventing potential issues.
- Integrated machine learning models into existing internal data pipelines, automating data quality checks and improving the accuracy of business intelligence.

Software Engineering Intern, NASA (Jun 2022 - Dec 2022)
- Contributed to the GDC (Geospace Dynamics Constellation) mission concept for space weather observation, involving complex data handling and analysis requirements.
- Developed specialized data engineering tools to facilitate predictive analyses of space weather phenomena, supporting critical research and operational forecasting.

Research Intern (REU), National Center for Supercomputing Applications (Jun 2022 - Aug 2022)
- Conducted advanced predictive simulations for scramjet designs, utilizing high-performance computing resources to model complex aerospace phenomena and optimize performance.

ML Researcher, University of Illinois Urbana-Champaign (Nov 2021 - May 2022)
- Developed a sophisticated LSTM (Long Short-Term Memory) model for soft robotic arm kinematics, demonstrating proficiency in advanced machine learning techniques for robotics applications.

PROJECTS
- Data Augmentation Pipeline: Created a pipeline for image augmentation using C++, Boost, OpenCV.
- Airport Pathfinding: Developed a pathfinding tool using Djikstra's and PageRank algorithms.
- Spot Nano: Reverse engineered Boston Dynamics' Spot robot using an LSTM and inverse kinematics model.
- DecARate: Built a DCNN to detect architectural style for optimal Halloween decoration layouts.
- CustomVent: Developed a deep neural network to optimize ventilator splitter nozzle size during the pandemic.

SKILLS
Programming Languages: Python, JavaScript, Java, C++, C, SQL, Bash, TypeScript, Go, R, HTML/CSS
Frameworks/Libraries: React, Flask, Node.js, Express.js, TensorFlow, Keras, PyTorch, Scikit-learn, OpenCV, FastAI
Platforms: AWS, Azure, GCP, Kubernetes, Docker, Snowflake, Firebase, Raspberry Pi, Linux, MacOS
DevOps: Terraform, Ansible, Jenkins, Git, GitHub, Prometheus, Grafana, Telegraf, InfluxDB
Data Engineering: SQL, Pandas, Spark, Deep Learning, NLP, Computer Vision, Apache Kafka
Web/Mobile Development: RESTful APIs, GraphQL, React Native, Flutter, WebSockets
Tools: PyCharm, Visual Studio Code, Google Colab, Figma, Selenium, JIRA, Postman, Docker Desktop
`;

  // Effect to apply dark/light mode classes to the body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-zinc-900', 'text-zinc-100');
      document.body.classList.remove('bg-gray-50', 'text-gray-800');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-gray-50', 'text-gray-800');
      document.body.classList.remove('bg-zinc-900', 'text-zinc-100');
    }
  }, [isDarkMode]);

  // Effect to handle smooth scrolling after state changes
  useEffect(() => {
    if (appState === 'portfolio' && activeSection) {
      const sectionElement = document.getElementById(activeSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [appState, activeSection]);

  // Helper component for gradient text
  const GradientText = ({ children, className = '' }) => (
    <span className={`bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text ${className}`}>
      {children}
    </span>
  );

  // Function to handle smooth scrolling (used by Navbar)
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Function to perform fit check using Gemini API
  const performFitCheck = async () => { // Renamed function
    if (!jobDescription.trim()) {
      setError('Please enter a job description to perform the fit check.');
      return;
    }

    setIsLoading(true);
    setFitAnalysis(''); // Clear previous analysis
    setError('');

    try {
      const prompt = `
      As an AI assistant, analyze the following job description and Kamran Majid's resume.
      Provide a concise summary of how Kamran's skills, experiences, and projects are a good fit for this role.
      Specifically, identify and list the most relevant points from Kamran's resume that directly align with the requirements and responsibilities in the job description.
      Frame the response as a "Fit Analysis" for a recruiter.

      Kamran Majid's Resume:
      ${resumeContent}

      Job Description:
      ${jobDescription}

      Fit Analysis:
      `;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyAH8coSXAFQolBXBg_JdSPn1e6h2MQCTk0"; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setFitAnalysis(generatedText); // Set fit analysis
      } else {
        setError('Could not perform the fit check. Please try again.');
        console.error('Gemini API response error:', result);
      }
    } catch (err) {
      setError('An error occurred while performing the fit check. Please check your network connection or try again later.');
      console.error('Error calling Gemini API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation bar component
  const Navbar = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 shadow-md rounded-b-lg p-4 transition-colors duration-300 ${isDarkMode ? 'bg-zinc-800 text-zinc-100' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <GradientText>Kamran Majid</GradientText>
        </div>
        <div className="flex items-center space-x-6">
          {['home', 'about', 'experience', 'skills', 'projects', 'good-fit-check', 'contact'].map((section) => ( // Changed 'cover-letter' to 'good-fit-check'
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`font-medium transition-colors duration-300 capitalize ${
                isDarkMode ? 'text-zinc-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              } ${
                activeSection === section ? (isDarkMode ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold') : ''
              }`}
            >
              {section.replace('-', ' ')}
            </button>
          ))}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );

  // Section component for consistent styling
  const Section = ({ id, children, className = '' }) => (
    <section id={id} className={`min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-300 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        {children}
      </div>
    </section>
  );

  // Card component for skills and projects
  const Card = ({ children, className = '', onClick, style }) => (
    <div
      className={`rounded-lg shadow-md transition-shadow duration-300 transform liquid-hover-card ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );

  // Landing Page Component
  const LandingPage = () => (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">
        Welcome! How can I help you <GradientText>today</GradientText>?
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <button
          onClick={() => setAppState('recruiter_landing')}
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center liquid-hover-button"
        >
          <BriefcaseBusiness size={24} className="mr-3" /> I'm a Recruiter
        </button>
        <button
          onClick={() => { setAppState('portfolio'); setActiveSection('home'); }}
          className={`px-8 py-4 border-2 border-blue-600 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center liquid-hover-button ${isDarkMode ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <Users size={24} className="mr-3" /> I'm here to view the portfolio
        </button>
      </div>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );

  // Recruiter Landing Page Component
  const RecruiterLandingPage = () => (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">
        Welcome, <GradientText>Recruiter</GradientText>!
      </h1>
      <p className={`text-xl md:text-2xl mb-10 text-center ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
        Here are options tailored to your needs for Kamran Majid's profile.
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <button
          onClick={() => { setAppState('portfolio'); setActiveSection('good-fit-check'); }} // Changed target section
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-center liquid-hover-button"
        >
          <CheckCircle size={24} className="mr-3" /> Check My Fit for Your Job
        </button>
        <button
          onClick={() => { setAppState('portfolio'); setActiveSection('home'); }}
          className={`px-8 py-4 border-2 border-blue-600 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center liquid-hover-button ${isDarkMode ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <Users size={24} className="mr-3" /> View Kamran's Full Portfolio
        </button>
      </div>
      <button
        onClick={() => setAppState('landing')}
        className={`mt-10 px-6 py-2 border-2 rounded-full font-semibold transition-colors duration-300 liquid-hover-button ${isDarkMode ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}
      >
        Back to Welcome
      </button>
    </div>
  );

  const projects = [
    {
      title: 'Constellation-io',
      image: ConstellationIO,
      badge: 'AI / Space Connectivity',
      badgeColor: 'blue',
      description: 'Pioneering the future of space connectivity. Tackling unreliable space telecommunication with a novel AI platform built on advanced graph theory for self-healing, self-optimizing space-terrestrial networks. Delivering high-capacity, low-latency, and resilient data transfer for defense, IoT, and remote ops.',
      bullets: [
        'Mission: Establish the benchmark for resilient, cost-effective communication pathways using graph theory and AI.',
        'Vision: Build an adaptive global network integrating satellite and terrestrial infrastructure into an intelligent, self-optimizing fabric.',
        'Principles: Innovation, Rigor, Collaboration, and Impact for responsible disruption and scientific excellence.',
        'Novel Technology: Patented methodologies integrating graph theory for resilient network modeling and AI for predictive dynamic optimization.',
        '"Graph-Theoretic AI for Global Connectivity" by K. Majid. [Read the full paper here](https://www.mdpi.com/2079-9292/12/3/650)',
        '"Intelligent Resource Management for Satellite and Terrestrial Spectrum Shared Networking toward B5G" by M. Jia, Z. Ximu. [Read the full paper here](https://ieeexplore.ieee.org/document/9174892)',
        '"Robustness of satellite constellation networks" by X. Xu, Z. Gao, A. Liu. [Read the full paper here](https://www.sciencedirect.com/science/article/pii/S0140366423000027)',
        'Founding Team: Kamran Majid (CEO, Ex. SpaceX/NASA), Raaid Kabir (CTO, Ex. Blue Origin), Omeed Tehrani (Head of Ops, Ex. Capital One).'
      ],
      link: 'https://kamranmajid41.github.io/constellation-io/',
    },
    {
      title: 'SWE @ SpaceX',
      image: SpaceX,
      badge: 'Work Experience',
      badgeColor: 'yellow',
      description: 'Worked on Starlink GNC, and then pivoted to F9 & Starship ground and optical software (some information has been redacted to comply with NDA requirements).',
      bullets: [
        'Hardware data pipeline: built an end-to-end telemetry stream using Kafka, InfluxDB, and various SpaceX internal tools (responsible for tens of millions in cost-savings).',
        'Tracking gimbal reverse engineering: built a custom library to control a vendor gimbal to track launch vehicles.',
        'Capacity planning tool: created a full-stack React/Node/Tornado web application to model future trends in global ground asset planning for Starlink.',
        'Backhaul algorithm development: built limit-of-physics downlink prioritization algorithms for Starlink satellite connections to minimize latency through fiber paths.',
      ],
      link: null,
    },
    {
      title: 'The Universe',
      image: TheUniverse,
      badge: 'NASA',
      badgeColor: 'green',
      description: 'Used NASA 8k texture mappings for exoplanets and the sun. Implemented performance enhancements for mobile usage. Zoom in!',
      link: 'https://kamranmajid41.github.io/the-universe',
    },
    {
      title: 'world-staraunts',
      image: WorldStaraunts,
      badge: 'React',
      badgeColor: 'blue',
      description: "React app to plot global cuisines you've tried.",
      link: 'https://kamranmajid41.github.io/world-staraunts',
    },
    {
      title: 'Word Search Generator',
      image: WordSearch,
      badge: 'AI',
      badgeColor: 'yellow',
      description: 'Put in your OpenAPI key, give it any prompt, and a word search puzzle will be automatically generated and downloaded (e.g. flora in south america).',
      link: 'https://kamranmajid41.github.io/word-search-generator',
    },
    {
      title: 'i-hate-paywalls',
      image: IHatePaywalls,
      badge: 'Node',
      badgeColor: 'yellow',
      description: 'Text-to-speech & PDF-to-text with no paywalls.',
      link: 'https://kamranmajid41.github.io/i-hate-paywalls',
    },
    {
      title: 'Hackathon Projects (1st Place /700 at Yale, etc.)',
      image: DevPost,
      badge: 'Hackathons',
      badgeColor: 'yellow',
      description: 'Projects include: a collaborative learning platform, a ventilator splitter, and an AR decoration app.',
      link: 'https://devpost.com/kamranmajid41',
    },
    {
      title: 'exo-query',
      image: ExoQuery,
      badge: 'NASA',
      badgeColor: 'yellow',
      description: 'Detailed information about all currently recognized exoplanets and automated texture generation using noise algorithms.',
      link: 'https://kamranmajid41.github.io/exo-query',
    },
  ];

  function ProjectModal({ project, onClose }) {
    return ReactDOM.createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl max-w-2xl w-full p-6 relative overflow-y-auto"
          style={{ maxHeight: '90vh' }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <p className="mb-4 text-gray-700 dark:text-zinc-200">{project.description}</p>
          {project.bullets && (
            <ul className="list-disc list-inside text-gray-700 dark:text-zinc-200 text-sm space-y-1 mb-4">
              {project.bullets.map((item, i) => (
                <li key={i}>
                  <ReactMarkdown>{item}</ReactMarkdown>
                </li>
              ))}
            </ul>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 mt-2"
            >
              Visit Project
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          )}
        </div>
      </div>,
      document.body
    );
  }

  function ProjectsCarousel({ projects, isDarkMode }) {
    const [expandedProject, setExpandedProject] = useState(null);
    const [sliderRef, instanceRef] = useKeenSlider({
      loop: true,
      slides: { perView: 1, spacing: 16 },
    });

    // Auto-scroll logic
    useEffect(() => {
      if (expandedProject !== null) return; // Pause auto-scroll when modal is open
      let timeout;
      function next() {
        if (instanceRef.current) {
          instanceRef.current.next();
        }
        timeout = setTimeout(next, 3500); // Change slide every 3.5s
      }
      timeout = setTimeout(next, 3500);
      return () => clearTimeout(timeout);
    }, [instanceRef, expandedProject]);

    // Pause auto-scroll on hover
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
      if (!isHovered || expandedProject !== null) return;
      // If hovered, clear the auto-scroll
      return () => {};
    }, [isHovered, expandedProject]);

    return (
      <Section id="projects" className={`${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}> 
        <h2 className="text-4xl font-bold text-center mb-10">
          <Briefcase className="inline-block mr-2 text-blue-600" size={36} />
          Featured <GradientText>Projects</GradientText>
        </h2>
        <div className="relative">
          <div
            ref={sliderRef}
            className="keen-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {projects.map((project, index) => (
              <div className="keen-slider__slide flex justify-center" key={index}>
                <div className="relative w-full max-w-md bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E7FF/3B82F6?text=Image+Error'; }}
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold bg-${project.badgeColor}-200 text-${project.badgeColor}-800`}>
                        {project.badge}
                      </span>
                    </div>
                    <p className="line-clamp-3 text-gray-700 dark:text-zinc-200 mb-4">
                      {project.description}
                    </p>
                    <button
                      className="mt-auto text-blue-600 hover:underline font-semibold"
                      onClick={() => setExpandedProject(index)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded-full shadow p-2 z-10"
            onClick={() => instanceRef.current?.prev()}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 rounded-full shadow p-2 z-10"
            onClick={() => instanceRef.current?.next()}
            aria-label="Next"
          >
            &#8594;
          </button>
          {/* Render the modal via portal */}
          {expandedProject !== null && (
            <ProjectModal
              project={projects[expandedProject]}
              onClose={() => setExpandedProject(null)}
            />
          )}
        </div>
      </Section>
    );
  }

  const toggleSkillCategory = (catIndex) => {
    setOpenSkillCategories((prev) => ({
      ...prev,
      [catIndex]: !prev[catIndex],
    }));
  };

  if (appState === 'landing') {
    return <LandingPage />;
  } else if (appState === 'recruiter_landing') {
    return <RecruiterLandingPage />;
  } else { // appState === 'portfolio'
    return (
      <div className={`font-inter antialiased transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-gray-50 text-gray-800'}`}>
        {/* Custom styles for glassmorphism and liquid hover effects */}
        <style>
          {`
          .glassmorphism-card {
            backdrop-filter: blur(10px) saturate(180%);
            -webkit-backdrop-filter: blur(10px) saturate(180%);
          }
          .liquid-hover-button {
            transition: transform 0.3s ease-out, filter 0.3s ease-out;
          }
          .liquid-hover-button:hover {
            transform: translateY(-2px) scale(1.02);
            filter: brightness(1.1);
          }
          .liquid-hover-card {
            transition: transform 0.4s ease-out, box-shadow 0.4s ease-out, filter 0.4s ease-out;
          }
          .liquid-hover-card:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            filter: brightness(1.05);
          }
          .shadow-lg-dark {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          `}
        </style>
        <Navbar />

        {/* Home Section */}
        <Section id="home" className={`${isDarkMode ? 'bg-zinc-900' : 'bg-white'} pt-24`}>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
              Hi, I'm <GradientText>Kamran Majid</GradientText>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`}>
              Driving Innovation as a <span className="font-semibold text-blue-600">Software Engineer</span> focused on AI, Robotics, and Data Engineering.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center liquid-hover-button"
              >
                View My Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className={`px-8 py-3 border-2 border-blue-600 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center liquid-hover-button ${isDarkMode ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                Get In Touch
              </a>
            </div>
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" className={`${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6">
                <User className="inline-block mr-2 text-blue-600" size={36} />
                About <GradientText>Me</GradientText>
              </h2>
              <p className={`text-lg mb-4 leading-relaxed ${isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>
                I'm Kamran Majid, a software engineer and researcher passionate about building innovative AI and robotics solutions. With experience at SpaceX, NASA, and Capital One, I thrive on solving complex problems and driving real-world impact through technology.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src={KamranMajid} 
                alt="Kamran Majid"
                className="rounded-full shadow-xl border-4 border-blue-300 w-64 h-64 md:w-80 md:h-80 object-cover"
              />
            </div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience" className={`${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
          <h2 className="text-4xl font-bold text-center mb-10">
            <Building className="inline-block mr-2 text-blue-600" size={36} />
            My <GradientText>Experience</GradientText>
          </h2>
          <div className="grid gap-8">
            {[
              {
                title: 'Software Engineer',
                company: 'SpaceX (Starship/F9)',
                duration: 'Aug 2024 - Apr 2025',
                description: [
                  'Engineered and deployed a robust data ingestion pipeline for critical flight assets, significantly improving data processing efficiency and reliability.',
                  'Successfully reverse-engineered complex customer tracking software for internal use, enhancing operational visibility and data utilization within the organization.'
                ]
              },
              {
                title: 'Software Engineering Intern',
                company: 'SpaceX (Starlink)',
                duration: 'Jan 2024 - Aug 2024',
                description: [
                  'Developed a comprehensive toolset designed to optimize the Starlink ground network, leading to improved performance and resource allocation.',
                  'Authored and implemented advanced simulation algorithms to intelligently prioritize low-latency ground assets, directly contributing to enhanced network responsiveness and user experience.'
                ]
              },
              {
                title: 'Software Engineering Intern',
                company: 'Capital One',
                duration: 'Jun 2023 - Aug 2023',
                description: [
                  'Built and implemented an end-to-end alerting system capable of detecting critical data anomalies, providing real-time insights and preventing potential issues.',
                  'Integrated machine learning models into existing internal data pipelines, automating data quality checks and improving the accuracy of business intelligence.'
                ]
              },
              {
                title: 'Software Engineering Intern',
                company: 'NASA',
                duration: 'Jun 2022 - Dec 2022',
                description: [
                  'Contributed to the GDC (Geospace Dynamics Constellation) mission concept for space weather observation, involving complex data handling and analysis requirements.',
                  'Developed specialized data engineering tools to facilitate predictive analyses of space weather phenomena, supporting critical research and operational forecasting.'
                ]
              },
              {
                title: 'Research Intern (REU)',
                company: 'National Center for Supercomputing Applications',
                duration: 'Jun 2022 - Aug 2022',
                description: [
                  'Conducted advanced predictive simulations for scramjet designs, utilizing high-performance computing resources to model complex aerospace phenomena and optimize performance.'
                ]
              },
              {
                title: 'ML Researcher',
                company: 'University of Illinois Urbana-Champaign',
                duration: 'Nov 2021 - May 2022',
                description: [
                  'Developed a sophisticated LSTM (Long Short-Term Memory) model for soft robotic arm kinematics, demonstrating proficiency in advanced machine learning techniques for robotics applications.'
                ]
              }
            ].map((job, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{job.company}</p>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{job.duration}</p>
                <ul className="list-disc list-inside space-y-1">
                  {job.description.map((point, i) => (
                    <li key={i} className={`${isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>{point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" className={`${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <h2 className="text-4xl font-bold text-center mb-10">
            <Award className="inline-block mr-2 text-blue-600" size={36} />
            My <GradientText>Skills</GradientText>
          </h2>
          <p className={`text-center text-lg mb-8 ${isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>
            A comprehensive overview of my technical proficiencies and tools.
          </p>
          <div className="space-y-6">
            {[
              {
                category: 'Programming Languages',
                skills: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'SQL', 'Bash', 'TypeScript', 'Go', 'R', 'HTML/CSS']
              },
              {
                category: 'Frameworks/Libraries',
                skills: ['React', 'Flask', 'Node.js', 'Express.js', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'OpenCV', 'FastAI']
              },
              {
                category: 'Platforms',
                skills: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Snowflake', 'Firebase', 'Raspberry Pi', 'Linux', 'MacOS']
              },
              {
                category: 'DevOps',
                skills: ['Terraform', 'Ansible', 'Jenkins', 'Git', 'GitHub', 'Prometheus', 'Grafana', 'Telegraf', 'InfluxDB']
              },
              {
                category: 'Data Engineering',
                skills: ['SQL', 'Pandas', 'Spark', 'Deep Learning', 'NLP', 'Computer Vision', 'Apache Kafka']
              },
              {
                category: 'Web/Mobile Development',
                skills: ['RESTful APIs', 'GraphQL', 'React Native', 'Flutter', 'WebSockets']
              },
              {
                category: 'Tools',
                skills: ['PyCharm', 'Visual Studio Code', 'Google Colab', 'Figma', 'Selenium', 'JIRA', 'Postman', 'Docker Desktop']
              }
            ].map((skillCategory, catIndex) => (
              <div key={catIndex} className="border rounded-lg bg-white dark:bg-zinc-700">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleSkillCategory(catIndex)}
                >
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>{skillCategory.category}</span>
                  <span className={`transition-transform duration-200 ${openSkillCategories[catIndex] ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                </button>
                {openSkillCategories[catIndex] && (
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      {skillCategory.skills.map((skill, skillIndex) => (
                        <Card key={skillIndex} className="p-4 flex items-center space-x-2">
                          <Code className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
                          <p className="text-lg font-medium">{skill}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Projects Section */}
        <ProjectsCarousel projects={projects} isDarkMode={isDarkMode} />

        {/* Good Fit Check Section */}
        <Section id="good-fit-check" className={`${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <h2 className="text-4xl font-bold text-center mb-10">
            <CheckCircle className="inline-block mr-2 text-blue-600" size={36} /> {/* Changed icon to CheckCircle */}
            Check My <GradientText>Fit for Your Job</GradientText> {/* Changed title */}
          </h2>
          <Card className="max-w-3xl mx-auto p-8 shadow-xl">
            <p className={`text-lg text-center mb-6 ${isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>
              Paste a job description below, and I'll highlight my most relevant skills and experiences for that role.
            </p>
            <div className="mb-6">
              <label htmlFor="job-description" className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                Job Description
              </label>
              <textarea
                id="job-description"
                rows="15"
                className={`shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isDarkMode ? 'bg-zinc-700 text-zinc-100 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'}`}
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              onClick={performFitCheck} // Changed function call
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center liquid-hover-button"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Analyzing Fit... {/* Changed loading text */}
                </>
              ) : (
                'Check My Fit' // Changed button text
              )}
            </button>

            {fitAnalysis && ( // Changed variable
              <div className={`mt-8 p-6 rounded-lg border ${isDarkMode ? 'bg-zinc-700 border-zinc-600' : 'bg-gray-50 border-gray-300'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Fit Analysis:</h3> {/* Changed title */}
                <div className={`prose max-w-none font-sans text-base ${isDarkMode ? 'prose-invert text-zinc-100' : 'text-gray-800'}`}>
                  <ReactMarkdown>
                    {typeof fitAnalysis === 'string' ? fitAnalysis : ''}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </Card>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className={`${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
          <h2 className="text-4xl font-bold text-center mb-10">
            <Mail className="inline-block mr-2 text-blue-600" size={36} />
            Get In <GradientText>Touch</GradientText>
          </h2>
          <Card className="max-w-xl mx-auto p-8 shadow-xl">
            <p className={`text-lg text-center mb-6 ${isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>
              Have a question or want to work together? Feel free to reach out!
            </p>
            <form action="https://formspree.io/f/yourFormID" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isDarkMode ? 'bg-zinc-700 text-zinc-100 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isDarkMode ? 'bg-zinc-700 text-zinc-100 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className={`shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isDarkMode ? 'bg-zinc-700 text-zinc-100 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'}`}
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 liquid-hover-button"
              >
                Send Message
              </button>
            </form>
          </Card>
        </Section>

        {/* Footer */}
        <footer className={`py-8 ${isDarkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-gray-800 text-white'}`}>
          <div className="container mx-auto text-center">
            <p className="mb-4">&copy; {new Date().getFullYear()} Kamran Majid. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/kamranmajid41" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}>
                <Github size={28} />
              </a>
              <a href="https://linkedin.com/in/kamran-majid" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}>
                <Linkedin size={28} />
              </a>
              <a href="mailto:kamranmajid41@gmail.com" className={`${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}>
                <Mail size={28} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
};

export default App;

