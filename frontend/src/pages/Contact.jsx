import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const contactInfo = [
  { icon: HiEnvelope, label: 'Email', value: 'hello@chatnova.ai' },
  { icon: HiPhone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: HiMapPin, label: 'Office', value: 'San Francisco, CA 94105' },
];

const socials = [
  { icon: FiTwitter, label: 'Twitter', href: '#' },
  { icon: FiGithub, label: 'GitHub', href: '#' },
  { icon: FiLinkedin, label: 'LinkedIn', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const onChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">Contact</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">touch</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-5 gap-12"
          >
            {/* Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Name" placeholder="John Doe" value={form.name} onChange={onChange('name')} error={errors.name} />
                    <Input label="Email" type="email" placeholder="john@example.com" value={form.email} onChange={onChange('email')} error={errors.email} />
                  </div>
                  <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={onChange('subject')} error={errors.subject} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us more..."
                      value={form.message}
                      onChange={onChange('message')}
                      className={`w-full rounded-xl border bg-white dark:bg-dark-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300 dark:border-dark-600'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>
                  <Button type="submit" loading={loading} size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-5">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{info.label}</div>
                        <div className="text-gray-900 dark:text-white">{info.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-100 dark:bg-dark-800 h-48 flex items-center justify-center">
                <div className="text-center text-gray-400 dark:text-gray-600">
                  <HiMapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Map placeholder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
