import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiChatBubbleLeftRight, HiClock, HiShieldCheck, HiBolt,
  HiSquares2X2, HiMoon, HiChevronDown, HiChevronUp,
  HiStar, HiArrowRight, HiSparkles
} from 'react-icons/hi2';
import Layout from '../components/Layout';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: HiChatBubbleLeftRight, title: 'Real-time AI Chat', desc: 'Get instant, intelligent responses powered by advanced language models.' },
  { icon: HiClock, title: 'Chat History', desc: 'All your conversations are saved and easily accessible anytime.' },
  { icon: HiShieldCheck, title: 'Secure Auth', desc: 'Enterprise-grade security with encrypted authentication.' },
  { icon: HiBolt, title: 'Lightning Fast', desc: 'Sub-second response times with optimized infrastructure.' },
  { icon: HiSquares2X2, title: 'Multi-thread', desc: 'Manage multiple conversations simultaneously with ease.' },
  { icon: HiMoon, title: 'Dark Mode', desc: 'Easy on the eyes with beautiful light and dark themes.' },
];

const steps = [
  { num: '01', title: 'Create Account', desc: 'Sign up in seconds with just your name and email. No credit card required.' },
  { num: '02', title: 'Start a Chat', desc: 'Open a new conversation and type your question or prompt.' },
  { num: '03', title: 'Get AI Answers', desc: 'Receive intelligent, contextual responses instantly from our AI.' },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '1M+', label: 'Messages Sent' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9', label: 'User Rating' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Product Manager at TechCorp', quote: 'ChatNova has completely transformed how our team brainstorms ideas. The AI responses are incredibly helpful and contextual.', color: 'from-blue-500 to-cyan-500' },
  { name: 'Marcus Johnson', role: 'Full-Stack Developer', quote: 'I use ChatNova daily for coding assistance. It understands complex problems and provides clean, working solutions.', color: 'from-purple-500 to-pink-500' },
  { name: 'Emily Rodriguez', role: 'Student, MIT', quote: 'This platform helped me understand difficult concepts for my courses. It is like having a personal tutor available 24/7.', color: 'from-orange-500 to-red-500' },
];

const faqs = [
  { q: 'What is ChatNova AI?', a: 'ChatNova AI is a next-generation chatbot platform that uses advanced AI models to provide intelligent, human-like conversations for learning, productivity, and creativity.' },
  { q: 'Is ChatNova free to use?', a: 'Yes! We offer a generous free plan with 50 messages per day. For unlimited access and premium features, check out our Pro and Business plans.' },
  { q: 'How does the AI generate responses?', a: 'Our AI uses state-of-the-art language models trained on diverse datasets to understand context and generate relevant, helpful responses in real time.' },
  { q: 'Is my data secure?', a: 'Absolutely. We use industry-standard encryption for all data in transit and at rest. Your conversations are private and never shared with third parties.' },
  { q: 'Can I use ChatNova for my business?', a: 'Yes! Our Business plan includes API access, team collaboration features, and custom training options perfect for enterprise use cases.' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
              <HiSparkles className="w-4 h-4" />
              Powered by Advanced AI
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Smarter Conversations,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of AI-powered communication. ChatNova delivers intelligent,
              context-aware conversations that help you learn, create, and solve problems faster.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/chat"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Chatting <HiArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-dark-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Demo
              </a>
            </motion.div>
          </motion.div>

          {/* Hero floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-32 right-[15%] hidden lg:block w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl shadow-blue-500/30 flex items-center justify-center"
          >
            <HiChatBubbleLeftRight className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-40 left-[10%] hidden lg:block w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-xl shadow-purple-500/30 flex items-center justify-center"
          >
            <HiSparkles className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 bg-gray-50/50 dark:bg-dark-800/50 border-y border-gray-100 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-500 mb-8">TRUSTED BY INNOVATIVE TEAMS</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {['TechCorp', 'InnovateLab', 'CloudSync', 'DataFlow', 'NeuralNet', 'QuantumAI'].map(name => (
              <span key={name} className="text-xl font-bold text-gray-300 dark:text-dark-600">{name}</span>
            ))}
          </div>
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
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Everything you need for AI conversations
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to make your AI chat experience seamless and productive.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">How it Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Get started in 3 simple steps
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative text-center">
                <div className="text-6xl font-black text-blue-100 dark:text-dark-700 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 text-blue-300 dark:text-dark-600">
                    <HiArrowRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">Live Preview</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">See ChatNova in action</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="rounded-2xl border border-gray-200 dark:border-dark-700 overflow-hidden shadow-2xl"
          >
            {/* Mock chat header */}
            <div className="bg-gray-50 dark:bg-dark-800 px-6 py-4 border-b border-gray-200 dark:border-dark-700 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ChatNova AI</span>
            </div>
            {/* Mock messages */}
            <div className="bg-white dark:bg-dark-900 p-6 space-y-4">
              <div className="flex justify-end">
                <div className="max-w-xs px-4 py-3 rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                  Explain quantum computing in simple terms
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-md px-4 py-3 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                  Think of quantum computing like this: regular computers use bits (0 or 1), but quantum computers use "qubits" that can be 0, 1, or both at the same time! This lets them solve certain complex problems much faster than traditional computers.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-xs px-4 py-3 rounded-2xl rounded-br-md bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                  What are the practical applications?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-md px-4 py-3 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                  Great question! Key applications include drug discovery, financial modeling, cryptography, weather forecasting, and optimizing logistics. Companies like Google and IBM are leading this revolution.
                </div>
              </div>
            </div>
            {/* Mock input */}
            <div className="bg-gray-50 dark:bg-dark-800 px-6 py-4 border-t border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white dark:bg-dark-900 rounded-xl px-4 py-2.5 text-sm text-gray-400 border border-gray-200 dark:border-dark-700">
                  Type your message...
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <HiArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Loved by thousands of users</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <HiStar key={j} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Frequently asked questions</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === i ? (
                    <HiChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <HiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 sm:p-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to experience the future of AI chat?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-100 mb-8 max-w-xl mx-auto">
              Join thousands of users who are already having smarter conversations with ChatNova AI.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started Free <HiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
