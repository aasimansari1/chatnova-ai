import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiChatBubbleLeftRight, HiClock, HiShieldCheck, HiBolt,
  HiSquares2X2, HiMoon, HiLightBulb, HiHandThumbUp,
  HiArrowRight, HiCheck, HiXMark
} from 'react-icons/hi2';
import Layout from '../components/Layout';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const features = [
  { icon: HiChatBubbleLeftRight, title: 'Real-time AI Chat', desc: 'Engage in fluid, natural conversations with our advanced AI. Get responses that understand context, nuance, and follow-up questions seamlessly.', color: 'from-blue-500 to-cyan-500' },
  { icon: HiClock, title: 'Chat History & Search', desc: 'Every conversation is automatically saved and organized. Powerful search lets you find any past discussion instantly.', color: 'from-purple-500 to-pink-500' },
  { icon: HiShieldCheck, title: 'Secure Authentication', desc: 'JWT-based authentication with encrypted password storage. Your data stays private with enterprise-grade security measures.', color: 'from-green-500 to-emerald-500' },
  { icon: HiBolt, title: 'Lightning Fast Responses', desc: 'Optimized infrastructure delivers sub-second response times. No more waiting — get answers as fast as you can type.', color: 'from-yellow-500 to-orange-500' },
  { icon: HiSquares2X2, title: 'Multiple Conversations', desc: 'Manage unlimited conversation threads simultaneously. Switch between topics without losing context.', color: 'from-red-500 to-rose-500' },
  { icon: HiMoon, title: 'Dark Mode Support', desc: 'Beautiful dark and light themes that adapt to your preference. Easy on the eyes during late-night brainstorming sessions.', color: 'from-indigo-500 to-blue-500' },
  { icon: HiLightBulb, title: 'Smart Suggestions', desc: 'AI-powered conversation starters and follow-up suggestions help you get the most out of every interaction.', color: 'from-amber-500 to-yellow-500' },
  { icon: HiHandThumbUp, title: 'Mobile Responsive', desc: 'Fully responsive design works beautifully on any device. Chat on the go with our mobile-optimized interface.', color: 'from-teal-500 to-cyan-500' },
];

const comparison = [
  { feature: 'Real-time AI responses', nova: true, generic: true, none: false },
  { feature: 'Chat history saving', nova: true, generic: false, none: false },
  { feature: 'Multiple threads', nova: true, generic: false, none: false },
  { feature: 'Secure authentication', nova: true, generic: true, none: false },
  { feature: 'Dark mode', nova: true, generic: false, none: false },
  { feature: 'Mobile responsive', nova: true, generic: true, none: false },
  { feature: 'PDF export', nova: true, generic: false, none: false },
  { feature: 'Voice input', nova: true, generic: false, none: false },
  { feature: 'Smart suggestions', nova: true, generic: false, none: false },
  { feature: 'API access', nova: true, generic: false, none: false },
];

export default function Features() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">Features</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Packed with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">powerful features</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for intelligent AI conversations, all in one beautiful platform.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white">How ChatNova compares</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-gray-600 dark:text-gray-400">See why teams choose ChatNova over alternatives.</motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-dark-700"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-dark-700">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-blue-600">ChatNova AI</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-500">Generic Chatbot</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-500">No AI Tool</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
                    <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="text-center px-6 py-3">{row.nova ? <HiCheck className="w-5 h-5 text-green-500 mx-auto" /> : <HiXMark className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                    <td className="text-center px-6 py-3">{row.generic ? <HiCheck className="w-5 h-5 text-green-500 mx-auto" /> : <HiXMark className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                    <td className="text-center px-6 py-3">{row.none ? <HiCheck className="w-5 h-5 text-green-500 mx-auto" /> : <HiXMark className="w-5 h-5 text-gray-300 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to get started?</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 dark:text-gray-400 mb-8">Try ChatNova AI free today. No credit card required.</motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Free <HiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
