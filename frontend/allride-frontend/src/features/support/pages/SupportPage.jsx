import { useState } from "react";
import LegalBackLink from "@/shared/components/LegalBackLink";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  Mail,
  Phone,
  ShieldAlert,
  Clock,
} from "lucide-react";
import {
  SUPPORT_EMAIL,
  SAFETY_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_HOURS,
} from "@/shared/constants/supportInfo";

const FAQ_ITEMS = [
  {
    question: "How do I book a ride?",
    answer:
      "Open the AllRide app or website, sign in as a rider, set your pickup and destination, review the estimated fare, and confirm your booking. You can track your driver in real time once the ride is accepted.",
  },
  {
    question: "How do I cancel a ride?",
    answer:
      "You can cancel from the ride screen before your driver arrives. Cancellations before a driver accepts are typically free. If you cancel after a driver has accepted or arrived, a cancellation fee may apply as shown in the app at the time you cancel.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "AllRide supports payment cards added through the app. Charges are processed automatically when your ride completes. You'll receive a receipt by email for each trip.",
  },
  {
    question: "I left something in the vehicle — what should I do?",
    answer:
      "Email support with your ride date, time, pickup and drop-off locations, and a description of the item. We'll help connect you with your driver. The sooner you report a lost item, the better chance we have of recovering it.",
  },
  {
    question: "My driver isn't moving or hasn't arrived — what should I do?",
    answer:
      "Use the in-app contact option to reach your driver. If the issue continues, cancel the ride and request another. If you feel unsafe, contact local emergency services first, then report the incident to our safety team.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "Sign up with a driver account on AllRide, complete identity and vehicle verification, and go online from the driver home screen when you're ready to accept rides. Earnings and trip history are available in your driver dashboard.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "You can request account deletion from your profile settings or by emailing support from the email address linked to your account. Some ride and payment records may be retained as required by law.",
  },
  {
    question: "How do I report a safety concern?",
    answer:
      "For immediate danger, call local emergency services (e.g., 911) first. Then email our safety team with ride details, date and time, and a description of what happened. We investigate all safety reports.",
  },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition"
      >
        <span>{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

function SupportPage() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        {/* <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link> */}

        <LegalBackLink />
        <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <p className="text-yellow-600 dark:text-yellow-400 font-semibold mb-3 tracking-wide">
            SUPPORT CENTER
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            How can we help?
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Find answers below or reach our team directly. For life-threatening
            emergencies, call local emergency services (e.g., 911) first.
          </p>
        </header>

        {/* Contact cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Contact us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="block p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-yellow-500/50 transition"
            >
              <Mail className="text-yellow-500 mb-3" size={22} />
              <h3 className="font-bold text-sm mb-1">Email support</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 break-all">
                {SUPPORT_EMAIL}
              </p>
            </a>

            <a
              href={`mailto:${SAFETY_EMAIL}`}
              className="block p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-zinc-900/50 hover:border-red-400/50 transition"
            >
              <ShieldAlert className="text-red-500 mb-3" size={22} />
              <h3 className="font-bold text-sm mb-1">Safety issue</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 break-all">
                {SAFETY_EMAIL}
              </p>
            </a>

            <a
              href={`tel:${SUPPORT_PHONE_HREF}`}
              className="block p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-yellow-500/50 transition"
            >
              <Phone className="text-yellow-500 mb-3" size={22} />
              <h3 className="font-bold text-sm mb-1">Call us</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {SUPPORT_PHONE}
              </p>
            </a>
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Clock size={14} className="shrink-0 mt-0.5" />
            <p>{SUPPORT_HOURS}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </section>

        {/* Legal links */}
        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
          <p className="mb-3">
            For legal information, see our{" "}
            <Link
              to="/privacy"
              state={location.state}
              className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              to="/terms"
              state={location.state}
              className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
          <p className="text-xs text-zinc-400">
            Replace placeholder contact details in{" "}
            <code className="text-zinc-500">supportInfo.js</code> before production launch.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SupportPage;