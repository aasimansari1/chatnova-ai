import { Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi2';
import { FiTwitter, FiGithub, FiLinkedin, FiMessageCircle } from 'react-icons/fi';

const footerLinks = {
  Product: [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'API', path: '#' },
    { name: 'Integrations', path: '#' },
  ],
  Company: [
    { name: 'About', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Careers', path: '#' },
    { name: 'Press', path: '#' },
  ],
  Support: [
    { name: 'Help Center', path: '#' },
    { name: 'Contact', path: '/contact' },
    { name: 'Status', path: '#' },
    { name: 'Community', path: '#' },
  ],
  Legal: [
    { name: 'Privacy', path: '#' },
    { name: 'Terms', path: '#' },
    { name: 'Cookies', path: '#' },
    { name: 'License', path: '#' },
  ],
};

const socials = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiMessageCircle, href: '#', label: 'Discord' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ChatNova AI
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              The next-generation AI chatbot platform for smarter, faster, and more human-like conversations.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} ChatNova AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
