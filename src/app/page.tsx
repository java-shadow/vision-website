"use client";
import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [phoneTab, setPhoneTab] = useState<string>('home');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

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
    setDownloadToast(`Starting download for Vision App (${platform})...`);
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
      description: 'Review daily punch timestamps, work hours, overtime logs, and monthly calendar views.'
    },
    {
      id: 'holiday',
      title: 'Holiday',
      subtitle: 'Company holidays',
      icon: Sun,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      category: 'hr',
      description: 'Official corporate calendar with national, regional, and restricted company holidays.'
    },
    {
      id: 'leave',
      title: 'Leave',
      subtitle: 'Apply & track',
      icon: ArrowRight,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      category: 'hr',
      description: 'Submit leave applications with document attachments and track real-time manager approval.'
    },
    {
      id: 'attendance-req',
      title: 'Attendance Req',
      subtitle: 'Fix missing logs',
      icon: FileCheck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      category: 'attendance',
      description: 'Regularize missed punch-ins or punch-outs caused by on-field duties or system delays.'
    },
    {
      id: 'shift-req',
      title: 'Shift Req',
      subtitle: 'Change shifts',
      icon: Clock,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      category: 'attendance',
      description: 'View current shift schedules and request swap shifts with colleagues or manager reassignments.'
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
      description: 'Register biometric face scans and geofence boundary calibration for fraud-free attendance.'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      subtitle: 'Payslips & tax',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      category: 'finance',
      description: 'Instant download of monthly salary slips, tax summaries, form 16, and salary deductions.'
    },
    {
      id: 'expense',
      title: 'Expense Claim',
      subtitle: 'Submit bills',
      icon: CreditCard,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      category: 'finance',
      description: 'Upload meal, travel, and logistics receipts directly from phone camera for fast reimbursement.'
    },
    {
      id: 'helpdesk',
      title: 'HelpDesk',
      subtitle: 'Raise issues',
      icon: HelpCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      category: 'support',
      description: 'Direct ticketing system for HR queries, IT equipment issues, and workplace requests.'
    },
    {
      id: 'comp-off',
      title: 'Comp Off',
      subtitle: 'Compensatory leave',
      icon: Briefcase,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      category: 'hr',
      description: 'Credit balance and request compensations for weekend duty and extra project hours.'
    },
    {
      id: 'refer',
      title: 'Refer',
      subtitle: 'Refer a friend',
      icon: UserPlus,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      category: 'support',
      description: 'Internal candidate referral portal with trackable bonus incentives and interview updates.'
    }
  ];

  const filteredModules =
    filterCategory === 'all'
      ? modules
      : modules.filter((m) => m.category === filterCategory);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Dynamic Notification Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] border border-cyan-500/40 text-slate-100 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-bounce">
          <Download className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-sm font-medium">{downloadToast}</span>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Scan to Download</h3>
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
      <nav className="sticky top-0 z-40 bg-[#070b12]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-14 h-14 flex items-center justify-center relative">
              <img src="/logo.png" alt="Octavision Logo" className="absolute w-[180%] max-w-none h-[180%] object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </div>
            <div className="flex flex-col justify-center z-10">
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none mb-1">
                Vision
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
              </span>
              <span className="hidden sm:block text-[11px] font-semibold text-slate-400 tracking-wider uppercase leading-none">
                By Octavision
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              Pillars
            </a>
            <a href="#modules" className="hover:text-cyan-400 transition-colors">
              App Modules
            </a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">
              Live Preview
            </a>
            <a href="#security" className="hover:text-cyan-400 transition-colors">
              Security & Geo
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-all"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              Scan QR
            </button>
            <a
              href="#download"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              Get Vision App
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-800/80 mt-3 flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm text-slate-300 hover:text-white"
            >
              Pillars
            </a>
            <a
              href="#modules"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm text-slate-300 hover:text-white"
            >
              App Modules
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-sm text-slate-300 hover:text-white"
            >
              Live Preview
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-sm text-center"
            >
              Download App
            </a>
          </div>
        )}
      </nav>

      {}
      <section id="simulator" className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy and CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Enterprise Mobile Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Streamline Attendance, Leaves & Payroll in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                One App.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Experience Vision — our dedicated company app engineered for effortless 1-tap geo-fenced check-ins,
              automated leave workflows, real-time payslips, and shift regularization directly from your phone.
            </p>

            {/* Download Buttons Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={() => triggerDownloadNotice('Android APK')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-emerald-500/25 transition-all group"
              >
                <Smartphone className="w-5 h-5 text-slate-950" />
                <div className="text-left">
                  <div className="text-[10px] leading-tight opacity-80 uppercase tracking-wider font-semibold">
                    Download for
                  </div>
                  <div className="text-sm font-extrabold leading-none">Android APK / Play Store</div>
                </div>
              </button>

              <button
                onClick={() => triggerDownloadNotice('iOS App Store')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-white font-medium text-sm hover:bg-slate-800/80 transition-all shadow-md group"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold text-lg"></div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 leading-tight uppercase tracking-wider">Download on</div>
                  <div className="text-sm font-semibold leading-none">Apple iOS Store</div>
                </div>
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-600 text-cyan-400 hover:text-white transition-all"
                title="Scan QR to download"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            {/* Verified Attributes */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Facial & Geo-fenced Punch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Instant Salary Slips</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
              <div className="relative bg-[#02060b] p-3 rounded-[46px] border-4 border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-900/60 ring-1 ring-cyan-500/40"></div>
                </div>

                {/* Inner Device Screen (Dark Mode UI replicating screenshot) */}
                <div className="bg-[#0b0f17] rounded-[36px] overflow-hidden text-slate-100 flex flex-col h-[650px] border border-slate-900 select-none">
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
                      <div className="w-10 h-10 flex items-center justify-center relative">
                        <img src="/logo.png" alt="Octavision Logo" className="absolute w-[180%] max-w-none h-[180%] object-contain drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]" />
                      </div>
                      <span className="text-xl font-bold text-white tracking-tight leading-none z-10">Vision</span>
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
                      <div className="text-2xl font-bold text-white">Rohit</div>
                    </div>

                    {/* Interactive Check In / Out Card (Replicating Screenshot #1000182922) */}
                    <div className="bg-[#111726] border border-slate-800 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCheckedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                            }`}
                          ></span>
                          <span>{isCheckedIn ? 'Checked In' : 'Checked Out'}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">Office Hub - Kolkata</span>
                      </div>

                      <div className="text-sm font-medium text-slate-200 mb-3">
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
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                        }`}
                      >
                        <ArrowRight className={`w-4 h-4 ${isCheckedIn ? 'rotate-180' : ''}`} />
                        <span>{isCheckedIn ? 'Check Out' : 'Check In'}</span>
                      </button>
                    </div>

                    {/* Quick Actions Title */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-base font-bold text-white">Quick Actions</span>
                      <span className="text-[11px] text-cyan-400 cursor-pointer">View all</span>
                    </div>

                    {/* Screenshot Quick Action Tiles Preview */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-[#111726] border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Attendance</div>
                          <div className="text-[10px] text-slate-400">View logs</div>
                        </div>
                      </div>

                      <div className="bg-[#111726] border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Holiday</div>
                          <div className="text-[10px] text-slate-400">Company holidays</div>
                        </div>
                      </div>

                      <div className="bg-[#111726] border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Leave</div>
                          <div className="text-[10px] text-slate-400">Apply & track</div>
                        </div>
                      </div>

                      <div className="bg-[#111726] border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                          <FileCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Attendance Req</div>
                          <div className="text-[10px] text-slate-400">Fix missing logs</div>
                        </div>
                      </div>
                    </div>

                    {/* Mini Attendance Counter Bar (From screenshot #1000182928) */}
                    <div className="bg-[#111726] border border-slate-800 rounded-xl p-3.5">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="font-semibold text-white">Attendance</span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          Sept 2026
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center pt-1">
                        <div>
                          <div className="text-sm font-extrabold text-emerald-400">
                            {isCheckedIn ? '18' : '17'}
                          </div>
                          <div className="text-[9px] text-slate-400">Present</div>
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-rose-400">0</div>
                          <div className="text-[9px] text-slate-400">Absent</div>
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-purple-400">1</div>
                          <div className="text-[9px] text-slate-400">Leave</div>
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-cyan-400">2</div>
                          <div className="text-[9px] text-slate-400">Holiday</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App Bottom Floating Navigation Dock */}
                  <div className="relative bg-[#0d121c] border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px]">
                    <button
                      onClick={() => setPhoneTab('home')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'home' ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Home</span>
                    </button>

                    <button
                      onClick={() => setPhoneTab('attendance')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'attendance' ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Attendance</span>
                    </button>

                    {/* Center Plus Button from Screenshot */}
                    <div className="-mt-5">
                      <button
                        onClick={() => setShowQrModal(true)}
                        className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 active:scale-95 transition-transform"
                      >
                        <span className="text-xl font-bold leading-none">+</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setPhoneTab('approvals')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'approvals' ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approvals</span>
                    </button>

                    <button
                      onClick={() => setPhoneTab('profile')}
                      className={`flex flex-col items-center gap-0.5 ${
                        phoneTab === 'profile' ? 'text-cyan-400' : 'text-slate-500'
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
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/60">
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">99.8%</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Punch Accuracy</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Zero location spoofing</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/60">
            <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">&lt; 3 Sec</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Biometric Verification</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Quick AI face verification</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/60">
            <div className="text-3xl font-extrabold text-purple-400 tracking-tight">100%</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Paperless Operations</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Leaves, comp off & claims</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800/60">
            <div className="text-3xl font-extrabold text-teal-400 tracking-tight">v2.4</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Stable Release</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Encrypted internal API</div>
          </div>
        </div>
      </section>

      {}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Built for Modern Workforces
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything your team needs, right inside Vision.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed">
            Eliminate traditional biometric wall-scanners, paper leave forms, and lost expense bills. Vision puts the
            full power of internal HR operations into every employee’s pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative group bg-[#0d131f] border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">
              <ScanFace className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Face & Geo-fenced Attendance</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Employees can only check in when their GPS location matches company premises or authorized client sites,
              reinforced with instant biometric facial validation.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Precise branch geofencing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Real-time check in / out logs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Attendance regularization requests
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="relative group bg-[#0d131f] border border-slate-800 hover:border-purple-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 ring-1 ring-purple-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Leaves, Comp Off & Shifts</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Full transparency on remaining paid leaves, holiday calendars, and shift swaps. Managers approve requests
              in seconds via mobile push notifications.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" /> One-tap leave application & tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" /> Comp-off credit requests
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" /> Upcoming national & corporate holidays
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="relative group bg-[#0d131f] border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Payroll & Expense Claims</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Instant mobile access to monthly payslips, yearly tax sheets, and straightforward expense bill uploads
              for travel, internet, or client reimbursements.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Password-protected payslip PDFs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Camera capture for expense receipts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time status on claim reimbursements
              </li>
            </ul>
          </div>
        </div>
      </section>

      {}
      <section id="modules" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Full Module Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Every Quick Action inside the Vision App
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
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="bg-[#0b101a] border border-slate-800/80 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all hover:bg-[#0e1422] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${mod.bgColor} ${mod.color} flex items-center justify-center border ${mod.borderColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {mod.category}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h4>
                  <div className="text-xs text-slate-400 font-medium mb-3">{mod.subtitle}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{mod.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Mobile Available</span>
                  <span className="text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    In App <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <section id="security" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-[#0b1220] to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" /> Enterprise Grade Integrity
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Secure, Private & Restricted to Authorized Company Staff
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Vision utilizes mutual TLS, encrypted SQLite local data caches, and continuous mock-location detection.
              Company personnel credentials and face biometric vectors are stored in strict compliance with enterprise
              privacy frameworks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#070b12]/80 border border-slate-800 p-4 rounded-xl">
                <Lock className="w-5 h-5 text-cyan-400 mb-2" />
                <div className="font-bold text-white mb-1">AES-256 Bit Encryption</div>
                <div className="text-slate-400">All data in transit and at rest is secured end-to-end.</div>
              </div>

              <div className="bg-[#070b12]/80 border border-slate-800 p-4 rounded-xl">
                <MapPin className="w-5 h-5 text-teal-400 mb-2" />
                <div className="font-bold text-white mb-1">Anti-Spoof Geofence</div>
                <div className="text-slate-400">Detects mock locations and VPN manipulation automatically.</div>
              </div>

              <div className="bg-[#070b12]/80 border border-slate-800 p-4 rounded-xl">
                <Award className="w-5 h-5 text-purple-400 mb-2" />
                <div className="font-bold text-white mb-1">Role-Based Access</div>
                <div className="text-slate-400">Employees, shift leads, and HR managers see only permitted views.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-6 text-slate-950 font-bold shadow-xl shadow-cyan-500/20">
            <Smartphone className="w-7 h-7 text-slate-950" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Get the Vision App on Your Phone Today
          </h2>
          <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">
            Ready to log your attendance, review leaves, and access payslips? Download the verified corporate package
            for your operating system below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => triggerDownloadNotice('Android APK')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm hover:brightness-110 shadow-xl shadow-emerald-500/25 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Android APK (Direct)</span>
            </button>

            <button
              onClick={() => triggerDownloadNotice('iOS TestFlight / Store')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm transition-all"
            >
              <span className="text-lg"></span>
              <span>Download iOS App</span>
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-2 px-5 py-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white transition-all text-sm font-semibold"
            >
              <QrCode className="w-5 h-5" />
              <span>Scan QR Code</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-6 text-xs text-slate-500 bg-slate-950 px-6 py-3 rounded-full border border-slate-900">
            <span>Version: 2.4.1</span>
            <span>•</span>
            <span>Size: 82.46 MB</span>
            <span>•</span>
            <span>Requires: Android 8.0+ / iOS 14.0+</span>
          </div>
        </div>
      </section>

      {}
      <section id="contact" className="py-12 border-t border-slate-900 bg-[#070b14] px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Need Assistance? Contact Us</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-300">
            <div className="flex items-center gap-3 bg-[#0a0f1a] px-6 py-4 rounded-2xl border border-slate-800/80 shadow-md hover:border-cyan-500/30 transition-all">
              <Mail className="w-5 h-5 text-cyan-400" />
              <a href="mailto:info@octavision.in" className="font-medium hover:text-white transition-colors tracking-wide">info@octavision.in</a>
            </div>
            <div className="flex items-center gap-3 bg-[#0a0f1a] px-6 py-4 rounded-2xl border border-slate-800/80 shadow-md hover:border-emerald-500/30 transition-all">
              <Phone className="w-5 h-5 text-emerald-400" />
              <a href="tel:+918527848873" className="font-medium hover:text-white transition-colors tracking-wide">+91 8527848873</a>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="border-t border-slate-900 bg-[#04070d] py-12 px-4 sm:px-6 lg:px-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center relative">
              <img src="/logo.png" alt="Octavision Logo" className="absolute w-[180%] max-w-none h-[180%] object-contain" />
            </div>
            <span className="text-base font-bold text-slate-300 leading-none z-10">Vision by Octavision</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#features" className="hover:text-slate-300 transition-colors">
              Pillars
            </a>
            <a href="#modules" className="hover:text-slate-300 transition-colors">
              Modules
            </a>
            <button onClick={() => setShowQrModal(true)} className="hover:text-slate-300 transition-colors">
              QR Code
            </button>
            <a href="#download" className="hover:text-slate-300 transition-colors">
              Download
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
