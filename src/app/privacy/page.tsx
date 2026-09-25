import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 flex items-center justify-center relative">
              <img src="/logo2.svg" alt="Vision Logo" className="w-full h-full object-contain" />
            </div>
            <div className="z-10 ml-2 mt-1">
              <span className="text-lg font-extrabold tracking-tight text-slate-800 leading-none">
                Vision
              </span>
            </div>
          </div>
          
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors bg-slate-100 hover:bg-cyan-50 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/60">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Vision Privacy Policy
          </h1>
          <p className="text-slate-500 font-medium mb-10">Effective Date: September 25, 2026</p>

          <div className="prose prose-slate prose-cyan max-w-none">
            <p>
              Welcome to Vision. This Privacy Policy outlines how <strong>Octavision</strong> ("we," "our," or "us") governs, secures, and processes your data when you interact with the Vision mobile application.
            </p>
            <p>
              Vision is an enterprise-grade HR and workforce management platform designed exclusively for authorized personnel. We believe in absolute transparency regarding your workplace data.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">1. Platform Scope and Audience</h3>
            <p>
              Vision is a closed corporate ecosystem. Access is strictly provisioned and controlled by your employer's HR administrators. The application is not open for public registration, nor is it intended for or directed at individuals under the age of 13.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">2. Data We Process</h3>
            <p>To facilitate seamless HR operations, we securely process specific categories of data based on your organization's configuration:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Identity & Credentials:</strong> Names, corporate email addresses, phone numbers, and unique employee identifiers.</li>
              <li><strong>Biometric Templates (Face Data):</strong> We <strong>do not</strong> capture, save, or upload photographs of your face. Instead, the app converts a live camera feed into a secure, mathematical "face embedding." This numerical template is solely used to verify your identity during attendance punches. <em>(Detailed in Section 4)</em>.</li>
              <li><strong>Geographic Coordinates:</strong> Precise GPS location data is collected to validate attendance within designated corporate geofences or authorized field sites.</li>
              <li><strong>Employment Records:</strong> Information synchronized from your organization, such as leave balances, shift schedules, and payroll data.</li>
              <li><strong>User-Provided Media:</strong> Any receipts, documents, or profile pictures you voluntarily upload into the system.</li>
              <li><strong>Technical Metrics:</strong> Device identifiers and push notification tokens necessary for secure app functionality.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">3. Purpose of Processing</h3>
            <p>Your data powers the core functionalities of Vision. We utilize this information exclusively to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Authenticate your secure login sessions.</li>
              <li>Accurately log attendance and validate physical presence at work sites.</li>
              <li>Process HR requests, including leave applications and expense reimbursements.</li>
              <li>Deliver critical shift updates and administrative notifications.</li>
              <li>Ensure the integrity, reliability, and security of our enterprise network.</li>
            </ul>
            <p className="italic bg-cyan-50 text-cyan-800 p-4 rounded-xl border border-cyan-100">
              Octavision does not monetize, sell, rent, or trade your personal data to third parties. We never use your data for targeted advertising.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">4. Biometric Data Governance</h3>
            <p>If your employer utilizes face-based attendance, strict privacy controls apply to protect your identity:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>Zero Photo Storage:</strong> The camera frame is instantly transformed into a numerical template. The raw image is permanently destroyed on your device within milliseconds and is never transmitted to our servers.</li>
              <li><strong>Strictly for Authentication:</strong> The mathematical embedding is used exclusively to match your live check-in against your initial enrollment profile.</li>
              <li><strong>Secure Enterprise Storage:</strong> These embeddings are encrypted using AES-256 and stored on secure enterprise servers managed by Octavision. They are never backed up to personal cloud services (e.g., iCloud) or shared with consumer networks.</li>
              <li><strong>Data Lifecycle:</strong> The embedding is retained only for the duration of your active employment. Upon termination, or upon request by your HR department, the template is permanently destroyed. Re-enrolling your face within the app automatically overwrites and deletes the previous template.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">5. Location Tracking Constraints</h3>
            <p>
              Vision respects your privacy outside of working hours. Location data is actively processed only when you initiate a check-in or when navigating specific outdoor-duty workflows. Background location tracking, if enabled by your organization, automatically ceases the moment your shift is clocked out. We do not track your whereabouts during your personal time.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">6. Data Sharing & Third Parties</h3>
            <p>
              Because Vision is a workplace tool, your data is primarily accessible to your employer's authorized administrators, HR personnel, and direct managers.
            </p>
            <p>
              We may also engage vetted infrastructure providers (such as secure cloud hosting environments) who process data strictly under our instruction and auditing. We will only disclose information to law enforcement when legally compelled to do so by a valid warrant or court order.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">7. Retention Policies</h3>
            <p>
              We retain your data only as long as required to fulfill the operational needs of your employer or to comply with legal and tax obligations. Once data is no longer necessary, it is securely purged or irreversibly anonymized according to standard corporate retention schedules.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">8. Enterprise Security Standards</h3>
            <p>
              Safeguarding your data is our highest priority. Vision employs robust, enterprise-grade security protocols, including end-to-end mutual TLS encryption for data in transit, encrypted local SQLite databases, continuous mock-location detection, and strict role-based access controls.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">9. Your Privacy Rights</h3>
            <p>Subject to your local jurisdiction and corporate policies, you maintain the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Review and update personal information within the app.</li>
              <li>Revoke device-level permissions (Camera, Location, Notifications) at any time via your smartphone settings <em>(Note: this may disable certain app features)</em>.</li>
              <li>Request the deletion, export, or correction of your data by contacting your HR administrator.</li>
            </ul>
            <p className="italic text-slate-500">
              *Because Vision acts as a data processor on behalf of your employer, formal data subject requests must generally be routed directly through your organization's HR department.*
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">10. Policy Updates</h3>
            <p>
              We may refine this Privacy Policy periodically to reflect platform enhancements or regulatory shifts. The latest version will always be accessible within the app, and significant changes will be communicated via release notes.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">11. Contact Information</h3>
            <p>For technical inquiries or questions directly related to this privacy policy, please reach out to us at:</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-6">
              <p className="font-bold text-slate-900 mb-1">Octavision Privacy Team</p>
              <p>Email: <a href="mailto:privacy@octavision.in" className="text-cyan-600 hover:underline">privacy@octavision.in</a></p>
            </div>
            <p className="text-sm text-slate-500 italic">
              (For specific inquiries regarding your employment records, shifts, or payroll data, please contact your company's HR representative directly.)
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8 px-4 text-center text-slate-500 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 opacity-75">
            <div className="w-5 h-5 flex items-center justify-center relative">
              <img src="/logo2.svg" alt="Vision Logo" className="w-full h-full object-contain grayscale" />
            </div>
            <span className="font-bold leading-none ml-1">Vision</span>
          </div>
          <div>© Octavision. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
