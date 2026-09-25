"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Eye,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Smartphone,
  Download,
  ArrowRight,
  Sun,
  MapPin,
  ScanFace,
  CreditCard,
  DollarSign,
  HelpCircle,
  Briefcase,
  UserPlus,
  Bell,
  Menu,
  X,
  ChevronRight,
  QrCode,
  Sparkles,
  Layers,
  FileCheck,
  Award,
  Lock,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react';

const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (observer) observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [phoneTab, setPhoneTab] = useState<string>('home');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  
  const rotatingWords = ["Attendance", "Leaves", "Payroll", "Workflows", "Shifts"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(wordTimer);
  }, []);
  // Live timer for simulator status
  // Initialize with empty string to prevent Next.js SSR hydration mismatch
  const [currentTime, setCurrentTime] = useState<string>('--:--');

  useEffect(() => {
    // Set the actual time once mounted on the client
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerDownloadNotice = (platform: string) => {
    setDownloadToast(`Coming soon! The ${platform} link will be available in the future.`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3500);
  };

  interface AppModule {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    category: string;
    description: string;
  }

  const modules: AppModule[] = [
    {
      id: 'attendance',
      title: 'Attendance',
      subtitle: 'View logs',
      icon: Calendar,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      category: 'attendance',
      description: 'View daily work hours and punch logs.'
    },
    {
      id: 'holiday',
      title: 'Holiday',
      subtitle: 'Company holidays',
      icon: Sun,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      category: 'hr',
      description: 'Official list of all corporate and regional holidays.'
    },
    {
      id: 'leave',
      title: 'Leave',
      subtitle: 'Apply & track',
      icon: ArrowRight,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      category: 'hr',
      description: 'Apply for leaves and track manager approvals.'
    },
    {
      id: 'attendance-req',
      title: 'Attendance Req',
      subtitle: 'Fix missing logs',
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500/20',
      category: 'attendance',
      description: 'Fix missing punch-ins and regularize attendance.'
    },
    {
      id: 'shift-req',
      title: 'Shift Req',
      subtitle: 'Change shifts',
      icon: Clock,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      category: 'attendance',
      description: 'View and request shift swaps with colleagues.'
    },
    {
      id: 'face-geo',
      title: 'Face and Geo',
      subtitle: 'Setup face ID',
      icon: ScanFace,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      category: 'attendance',
      description: 'Setup biometric face scans and geofence boundaries.'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      subtitle: 'Payslips & tax',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      category: 'finance',
      description: 'Download monthly payslips and tax summaries.'
    },
    {
      id: 'expense',
      title: 'Expense Claim',
      subtitle: 'Submit bills',
      icon: CreditCard,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      category: 'finance',
      description: 'Upload receipts for fast meal and travel reimbursement.'
    },
    {
      id: 'helpdesk',
      title: 'HelpDesk',
      subtitle: 'Raise issues',
      icon: HelpCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      category: 'support',
      description: 'Raise tickets for IT and HR support queries.'
    },
    {
      id: 'comp-off',
      title: 'Comp Off',
      subtitle: 'Compensatory leave',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      category: 'hr',
      description: 'Request compensatory leaves for weekend duty.'
    },
    {
      id: 'refer',
      title: 'Refer',
      subtitle: 'Refer a friend',
      icon: UserPlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      category: 'support',
      description: 'Refer candidates and track interview updates.'
    }
  ];

  const filteredModules =
    filterCategory === 'all'
      ? modules
      : modules.filter((m) => m.category === filterCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-black font-sans antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      {/* Dynamic Notification Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-cyan-500/40 text-slate-900 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-bounce">
          <Download className="w-5 h-5 text-cyan-600 animate-pulse" />
          <span className="text-sm font-medium">{downloadToast}</span>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-300/80 rounded-2xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Scan to Download</h3>
            <p className="text-sm text-slate-400 mb-6">
              Scan this QR code with your mobile camera to immediately download the Vision APK or App store build.
            </p>
            {/* SVG QR Code Simulation */}
            <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-inner">
              <svg className="w-44 h-44 mx-auto text-black" viewBox="0 0 100 100" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="36" y="10" width="8" height="8" />
                <rect x="48" y="14" width="12" height="6" />
                <rect x="36" y="36" width="28" height="8" />
                <rect x="42" y="50" width="16" height="16" />
                <rect x="70" y="38" width="10" height="20" />
                <rect x="84" y="64" width="8" height="16" />
                <rect x="14" y="44" width="10" height="10" />
                <rect x="34" y="76" width="16" height="14" />
                <rect x="62" y="80" width="22" height="10" />
              </svg>
            </div>
            <div className="text-xs text-slate-400">Compatible with Android 8.0+ & iOS 14.0+</div>
          </div>
        </div>
      )}

      {}
      <nav className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center relative -mt-2">
              <img src="/logo2.svg" alt="Vision Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </div>
            <div className="z-10 ml-2 mt-1">
              <span className="text-xl font-extrabold tracking-tight text-slate-800 leading-none">
                Vision
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-cyan-600 transition-colors">
              Pillars
            </a>
            <a href="#modules" className="hover:text-cyan-600 transition-colors">
              App Modules
            </a>
            <a href="#security" className="hover:text-cyan-600 transition-colors">
              Security & Geo
            </a>
            <a href="#contact" className="hover:text-cyan-600 transition-colors">
              Contact Us
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => triggerDownloadNotice('QR Scanner')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-300/80 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:border-slate-500 transition-all"
            >
              <QrCode className="w-4 h-4 text-cyan-600" />
              Scan QR
            </button>
            <a
              href="#download"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs hover:brightness-110 shadow-lg shadow-emerald-500/30 transition-all relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2.5s_linear_infinite]" />
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Get Vision App
              </span>
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-200/80 mt-3 flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              Pillars
            </a>
            <a
              href="#modules"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              App Modules
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded-lg bg-emerald-500 text-white font-bold text-sm text-center mb-1"
            >
              Download App
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded-lg border border-cyan-500/50 text-cyan-600 font-bold text-sm text-center hover:bg-cyan-50"
            >
              Contact Us
            </a>
          </div>
        )}
      </nav>

      {}
      <section id="simulator" className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-purple-400/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-400/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy and CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Official Enterprise Mobile Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 tracking-tight leading-[1.1] mb-6 min-h-[140px] sm:min-h-[120px] lg:min-h-[150px]">
              Streamline <br className="hidden sm:block" />
              <span key={wordIndex} className="inline-block pb-2 pr-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 animate-[fadeInUp_0.5s_ease-out]">
                {rotatingWords[wordIndex]}
              </span>
              <br />
              in One App.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Experience Vision — our dedicated company app engineered for effortless 1-tap geo-fenced check-ins,
              automated leave workflows, real-time payslips, and shift regularization directly from your phone.
            </p>

            {/* Download Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={() => triggerDownloadNotice('Android APK')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:brightness-110 shadow-xl shadow-emerald-500/30 transition-all group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2.5s_linear_infinite]" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Smartphone className="w-5 h-5 text-white" />
                  <div className="text-left">
                    <div className="text-[10px] leading-tight opacity-80 uppercase tracking-wider font-semibold">
                      Download for
                    </div>
                    <div className="text-sm font-extrabold leading-none">Android APK / Play Store</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => triggerDownloadNotice('iOS App Store')}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-slate-300/80 hover:border-cyan-500/50 text-slate-900 font-medium text-sm hover:bg-slate-100/80 transition-all shadow-md group"
              >
                <div className="text-center sm:text-left">
                  <div className="text-[10px] text-slate-400 leading-tight uppercase tracking-wider">Download on</div>
                  <div className="text-sm font-semibold leading-none">Apple iOS Store</div>
                </div>
              </button>

              <button
                onClick={() => triggerDownloadNotice('QR Scanner')}
                className="p-3.5 rounded-xl bg-white/80 border border-slate-200 hover:border-slate-400 text-cyan-600 hover:text-slate-900 transition-all"
                title="Scan QR to download"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            {/* Verified Attributes */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Facial & Geo-fenced Punch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>Instant Salary Slips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Internal Company Secure</span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Mobile Screen Replica */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px]">
              {/* Decorative phone rim back-glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-emerald-500/10 to-transparent rounded-[50px] blur-2xl -z-10"></div>

              {/* Realistic Mobile Device Frame */}
              <div className="relative bg-slate-200 p-3 rounded-[46px] border-4 border-slate-200 shadow-[0_30px_100px_rgba(6,182,212,0.25)] ring-1 ring-white/10">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-900/60 ring-1 ring-cyan-500/40"></div>
                </div>

                {/* Inner Device Screen (Dark Mode UI replicating screenshot) */}
                <div className="bg-slate-50 rounded-[36px] overflow-hidden text-slate-900 flex flex-col h-[650px] border border-slate-200 select-none">
                  {/* Status Bar */}
                  <div className="pt-2 px-6 pb-2 flex justify-between items-center text-[11px] text-slate-400 font-semibold tracking-tight">
                    <span>{currentTime}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px]">5G</span>
                      <div className="w-4 h-2 rounded-sm border border-slate-400 p-[1px]">
                        <div className="w-full h-full bg-slate-300 rounded-[1px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Bar (Vision Logo + Avatar) */}
                  <div className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-8 flex items-center justify-center relative -mt-2">
                        <img src="/logo2.svg" alt="Vision Logo" className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]" />
                      </div>
                      <span className="text-l font-bold text-slate-900 tracking-tight leading-none z-10 ml-1">Vision</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative text-slate-400">
                        <Bell className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center">
                        R
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Screen Content */}
                  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 no-scrollbar">
                    {/* Greeting Banner */}
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                        Good Morning
                      </div>
                      <div className="text-2xl font-bold text-slate-900">Rohit</div>
                    </div>

                    {/* Interactive Check In / Out Card (Replicating Screenshot #1000182922) */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-300/60 text-[11px] text-slate-600 font-medium">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCheckedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                            }`}
                          ></span>
                          <span>{isCheckedIn ? 'Checked In' : 'Checked Out'}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">Office Hub - Kolkata</span>
                      </div>

                      <div className="text-sm font-medium text-slate-700 mb-3">
                        {isCheckedIn
                          ? `Checked in at ${checkInTime || '09:30 AM'}. Have a productive shift!`
                          : 'Ready to start your day?'}
                      </div>

                      <button
                        onClick={() => {
                          setIsCheckedIn(!isCheckedIn);
                          if (!isCheckedIn) {
                            setCheckInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                          }
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                          isCheckedIn
                            ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                        }`}
                      >
                        <ArrowRight className={`w-4 h-4 ${isCheckedIn ? 'rotate-180' : ''}`} />
                        <span>{isCheckedIn ? 'Check Out' : 'Check In'}</span>
                      </button>
                    </div>

                    {/* Quick Actions Title */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-base font-bold text-slate-900">Quick Actions</span>
                      <span className="text-[11px] text-cyan-600 cursor-pointer">View all</span>
                    </div>

                    {/* Screenshot Quick Action Tiles Preview */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Attendance</div>
                          <div className="text-[10px] text-slate-400">View logs</div>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Holiday</div>
                          <div className="text-[10px] text-slate-400">Company holidays</div>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Leave</div>
                          <div className="text-[10px] text-slate-400">Apply & track</div>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                          <FileCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900">Attendance Req</div>
                          <div className="text-[10px] text-slate-400">Fix missing logs</div>
                        </div>
                      </div>
                    </div>

                    {/* Mini Attendance Counter Bar (From screenshot #1000182928) */}
                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3.5">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="font-semibold text-slate-900">Attendance</span>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          Sept 2026
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center pt-1">
                        <div>
                          <div className="text-sm font-extrabold text-emerald-600">
                            {isCheckedIn ? '18' : '17'}
                          </div>
                          <div className="text-[9px] text-slate-400">Present</div>
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-rose-600">0</div>
                          <div className="text-[9px] text-slate-400">Absent</div>
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-purple-600">1</div>
                          <div className="text-[9px] text-slate-400">Leave</div>
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-cyan-600">2</div>
                          <div className="text-[9px] text-slate-400">Holiday</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App Bottom Floating Navigation Dock */}
                  <div className="relative bg-slate-50 border-t border-slate-200 px-3 py-2 flex items-center justify-around text-[10px]">
                    <button
                      onClick={() => setPhoneTab('home')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'home' ? 'text-cyan-600' : 'text-slate-400'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Home</span>
                    </button>

                    <button
                      onClick={() => setPhoneTab('attendance')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'attendance' ? 'text-cyan-600' : 'text-slate-400'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Attendance</span>
                    </button>

                    {/* Center Plus Button from Screenshot */}
                    <div className="-mt-5">
                      <button
                        className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/40 active:scale-95 transition-transform"
                      >
                        <span className="text-xl font-bold leading-none">+</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setPhoneTab('approvals')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'approvals' ? 'text-cyan-600' : 'text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approvals</span>
                    </button>

                    <button
                      onClick={() => setPhoneTab('profile')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'profile' ? 'text-cyan-600' : 'text-slate-400'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px] font-bold">
                        P
                      </div>
                      <span>Profile</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {}
      <section className="border-y border-slate-200/80 bg-white/60 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 cursor-pointer">
            <div className="text-3xl font-extrabold text-emerald-600 tracking-tight">99.8%</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Punch Accuracy</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Zero location spoofing</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 cursor-pointer">
            <div className="text-3xl font-extrabold text-cyan-600 tracking-tight">&lt; 3 Sec</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Biometric Verification</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Quick AI face verification</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 cursor-pointer">
            <div className="text-3xl font-extrabold text-purple-600 tracking-tight">100%</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Paperless Operations</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Leaves, comp off & claims</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 cursor-pointer">
            <div className="text-3xl font-extrabold text-teal-400 tracking-tight">v2.4</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Stable Release</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Encrypted internal API</div>
          </div>
        </div>
      </section>

      {}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Soft Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200/60 shadow-lg shadow-cyan-500/5 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" /> Pillars • Built for Modern Workforces
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Everything your team needs, right inside{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 pb-1">
              Vision.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Eliminate traditional biometric wall-scanners, paper leave forms, and lost expense bills. Vision puts the
            full power of internal HR operations into every employee’s pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <RevealOnScroll delay={0}>
          <div className="relative group bg-white border border-slate-200 hover:border-cyan-500/40 hover:bg-cyan-50/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">
              <ScanFace className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Face & Geo-fenced Attendance</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Employees can only check in when their GPS location matches company premises or authorized client sites,
              reinforced with instant biometric facial validation.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" /> Precise branch geofencing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" /> Real-time check in / out logs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" /> Attendance regularization requests
              </li>
            </ul>
          </div>
          </RevealOnScroll>

          {/* Card 2 */}
          <RevealOnScroll delay={150}>
          <div className="relative group bg-white border border-slate-200 hover:border-purple-500/40 hover:bg-purple-50/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 ring-1 ring-purple-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Leaves, Comp Off & Shifts</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Full transparency on remaining paid leaves, holiday calendars, and shift swaps. Managers approve requests
              in seconds via mobile push notifications.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> One-tap leave application & tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Comp-off credit requests
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Upcoming national & corporate holidays
              </li>
            </ul>
          </div>
          </RevealOnScroll>

          {/* Card 3 */}
          <RevealOnScroll delay={300}>
          <div className="relative group bg-white border border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Payroll & Expense Claims</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Instant mobile access to monthly payslips, yearly tax sheets, and straightforward expense bill uploads
              for travel, internet, or client reimbursements.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Password-protected payslip PDFs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Camera capture for expense receipts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time status on claim reimbursements
              </li>
            </ul>
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200/60 shadow-lg shadow-cyan-500/5 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4 text-cyan-500" /> App Modules • Full Directory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              {filterCategory === 'all' ? (
                <>
                  Every Quick Action inside the{' '}
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 pb-1">
                    Vision App.
                  </span>
                </>
              ) : (
                <>
                  {[
                    { label: 'All Modules', key: 'all' },
                    { label: 'Attendance', key: 'attendance' },
                    { label: 'HR & Leaves', key: 'hr' },
                    { label: 'Finance', key: 'finance' },
                    { label: 'Support', key: 'support' }
                  ].find((t) => t.key === filterCategory)?.label}{' '}
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 pb-1">
                    Modules.
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Modules', key: 'all' },
              { label: 'Attendance', key: 'attendance' },
              { label: 'HR & Leaves', key: 'hr' },
              { label: 'Finance', key: 'finance' },
              { label: 'Support', key: 'support' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterCategory(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterCategory === tab.key
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <RevealOnScroll key={mod.id} delay={(index % 4) * 100}>
              <div
                className="h-full bg-white border border-slate-200/80 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-slate-50 hover:-translate-y-1.5 hover:shadow-xl hover:border-cyan-300 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${mod.bgColor} ${mod.color} flex items-center justify-center border ${mod.borderColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {mod.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h4>
                  <div className="text-xs text-slate-400 font-medium mb-3">{mod.subtitle}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{mod.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Mobile Available</span>
                  <span className="text-cyan-600 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    In App <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </section>

      {}
      <section id="security" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200 shadow-md rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4" /> Security & Geo • Enterprise Grade Integrity
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Secure, Private & Restricted to Authorized Company Staff
              </h2>
              <p className="text-base text-slate-500 leading-relaxed">
                Vision utilizes mutual TLS, encrypted SQLite local data caches, and continuous mock-location detection.
                Company personnel credentials and face biometric vectors are stored in strict compliance with enterprise
                privacy frameworks.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Massive watermark shield */}
              <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-emerald-500/5 -z-10 animate-pulse" style={{ animationDuration: '3s' }} />
              
              <div className="sm:col-span-2 bg-white/60 backdrop-blur-sm border border-slate-200/80 p-5 rounded-2xl hover:bg-white hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm border border-cyan-100">
                  <Lock className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1.5">AES-256 Bit Encryption</div>
                <div className="text-slate-500 text-xs leading-relaxed">All data in transit and at rest is secured end-to-end to prevent packet interception.</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-slate-200/80 p-5 rounded-2xl hover:bg-white hover:border-teal-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm border border-teal-100">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1.5">Anti-Spoof Geofence</div>
                <div className="text-slate-500 text-xs leading-relaxed">Detects mock locations and VPN manipulation automatically.</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-slate-200/80 p-5 rounded-2xl hover:bg-white hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm border border-purple-100">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1.5">Role-Based Access</div>
                <div className="text-slate-500 text-xs leading-relaxed">Employees, shift leads, and HR managers see only permitted views.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="download" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        {/* Soft Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-cyan-200/60 shadow-lg shadow-cyan-500/5 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-8">
            <Download className="w-4 h-4 text-cyan-500 animate-bounce" /> Available on iOS & Android
          </div>
          
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-8 text-white font-bold shadow-2xl shadow-cyan-500/30 border border-white/20">
            <Smartphone className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Get the{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 pb-1">
              Vision App
            </span>{' '}
            on Your Phone Today.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto">
            Ready to log your attendance, review leaves, and access payslips? Download the verified corporate package
            for your operating system below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => triggerDownloadNotice('Android APK')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm hover:brightness-110 shadow-xl shadow-emerald-500/25 transition-all group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2.5s_linear_infinite]" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                <span>Download Android APK (Direct)</span>
              </div>
            </button>

            <button
              onClick={() => triggerDownloadNotice('iOS TestFlight / Store')}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl bg-white border border-slate-300 hover:border-slate-500 text-slate-900 font-bold text-sm transition-all shadow-md"
            >
              <span>Download iOS App</span>
            </button>

            <button
              onClick={() => triggerDownloadNotice('QR Scanner')}
              className="flex items-center gap-2 px-5 py-4 rounded-xl bg-white border border-slate-200 text-cyan-600 hover:text-slate-900 transition-all text-sm font-semibold"
            >
              <QrCode className="w-5 h-5" />
              <span>Scan QR Code</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-6 text-xs text-slate-400 bg-white px-6 py-3 rounded-full border border-slate-200">
            <span>Version: 2.4.1</span>
            <span>•</span>
            <span>Size: 82.46 MB</span>
            <span>•</span>
            <span>Requires: Android 8.0+ / iOS 14.0+</span>
          </div>
        </div>
      </section>

      {}
      <section id="contact" className="py-12 border-t border-slate-200 bg-slate-100 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Need Assistance? Contact Us</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-md hover:border-cyan-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <Mail className="w-5 h-5 text-cyan-600" />
              <a href="mailto:info@octavision.in" className="font-medium hover:text-slate-900 transition-colors tracking-wide">info@octavision.in</a>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-md hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <Phone className="w-5 h-5 text-emerald-600" />
              <a href="tel:+918527848873" className="font-medium hover:text-slate-900 transition-colors tracking-wide">+91 8527848873</a>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 flex items-center justify-center relative -mt-2">
              <img src="/logo2.svg" alt="Vision Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-base font-bold text-slate-400 leading-none z-10 ml-1">Vision </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#features" className="hover:text-slate-600 transition-colors">
              Pillars
            </a>
            <a href="#modules" className="hover:text-slate-600 transition-colors">
              Modules
            </a>
            <button onClick={() => triggerDownloadNotice('QR Scanner')} className="hover:text-slate-600 transition-colors">
              QR Code
            </button>
            <a href="#download" className="hover:text-slate-600 transition-colors">
              Download
            </a>
            <a href="/privacy" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
          </div>

          <div>
            © Octavision. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
