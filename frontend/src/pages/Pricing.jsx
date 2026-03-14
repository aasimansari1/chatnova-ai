import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheck, HiChevronDown, HiChevronUp, HiShieldCheck, HiArrowRight } from 'react-icons/hi2';
import Layout from '../components/Layout';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Perfect for trying out ChatNova AI.',
    features: [
      '50 messages per day',
      '1 conversation thread',
      'Basic AI model',
      'Chat history (7 days)',
      'Community support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'For power users who need more.',
    features: [
      'Unlimited messages',
      'Unlimited threads',
      'GPT-4 level AI model',
      'Full chat history',
      'Priority support',
      'Chat export (PDF)',
      'Voice input',
      'Smart suggestions',
      'Dark mode',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '$49',
    period: '/month',
    desc: 'For teams and enterprises.',
    features: [
      'Everything in Pro',
      'API access',
      'Up to 10 team members',
      'Custom AI training',
      'Dedicated support',
      'Analytics dashboard',
      'SSO integration',
      'SLA guarantee',
      'Custom branding',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes! All new users get a 14-day free trial of Pro features. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.' },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">Pricing</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Simple, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">transparent pricing</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25 scale-105'
                    : 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full uppercase">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? 'text-blue-100' : 'text-gray-500'}>{plan.period}</span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <HiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-blue-50' : 'text-gray-600 dark:text-gray-400'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full py-3 text-center font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Money-back guarantee */}
      <section className="py-12 bg-white dark:bg-dark-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
          >
            <HiShieldCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">30-Day Money-Back Guarantee</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Not satisfied? Get a full refund within 30 days. No questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white">Pricing FAQ</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                  <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                  {openFaq === i ? <HiChevronUp className="w-5 h-5 text-gray-500" /> : <HiChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm">{faq.a}</div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start chatting today</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 dark:text-gray-400 mb-8">Join thousands of users already using ChatNova AI.</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
                Get Started Free <HiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
