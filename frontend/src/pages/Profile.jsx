import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUser, HiShieldCheck, HiCog6Tooth, HiArrowRightOnRectangle } from 'react-icons/hi2';
import { FiSun, FiMoon } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const tabs = [
  { id: 'profile', label: 'Profile', icon: HiUser },
  { id: 'security', label: 'Security', icon: HiShieldCheck },
  { id: 'preferences', label: 'Preferences', icon: HiCog6Tooth },
];

export default function Profile() {
  const { user, updateProfile, updatePassword, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile form
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password form
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passLoading, setPassLoading] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast.error('All fields are required');
      return;
    }
    setProfileLoading(true);
    try {
      await updateProfile(profileForm);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passForm.currentPassword || !passForm.newPassword) {
      toast.error('All fields are required');
      return;
    }
    if (passForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passForm.newPassword !== passForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setPassLoading(true);
    try {
      await updatePassword(passForm.currentPassword, passForm.newPassword);
      toast.success('Password changed');
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPassLoading(false);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-12 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar nav */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <hr className="border-gray-200 dark:border-dark-700 my-2" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <HiArrowRightOnRectangle className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{user?.name}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                      </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-5 max-w-md">
                      <Input
                        label="Full Name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                      <Button type="submit" loading={profileLoading}>
                        Save Changes
                      </Button>
                    </form>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-md">
                      <Input
                        label="Current Password"
                        type="password"
                        value={passForm.currentPassword}
                        onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                      />
                      <Input
                        label="New Password"
                        type="password"
                        value={passForm.newPassword}
                        onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        value={passForm.confirmPassword}
                        onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p>Password requirements:</p>
                        <ul className="list-disc pl-4">
                          <li>At least 6 characters</li>
                          <li>Mix of letters and numbers recommended</li>
                          <li>Include special characters for extra security</li>
                        </ul>
                      </div>
                      <Button type="submit" loading={passLoading}>
                        Update Password
                      </Button>
                    </form>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                          <div className="text-sm text-gray-500">Switch between light and dark theme</div>
                        </div>
                        <button
                          onClick={toggleDarkMode}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            darkMode ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform flex items-center justify-center ${
                            darkMode ? 'translate-x-7' : 'translate-x-0.5'
                          }`}>
                            {darkMode ? <FiMoon className="w-3.5 h-3.5 text-blue-600" /> : <FiSun className="w-3.5 h-3.5 text-yellow-500" />}
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Language</h2>
                      <select className="w-full max-w-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 text-gray-900 dark:text-white px-4 py-2.5 text-sm">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notifications</h2>
                      <div className="space-y-4">
                        {[
                          { label: 'Email notifications', desc: 'Receive updates via email' },
                          { label: 'Chat notifications', desc: 'Get notified about new messages' },
                          { label: 'Marketing emails', desc: 'Receive product updates and news' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</div>
                              <div className="text-xs text-gray-500">{item.desc}</div>
                            </div>
                            <input
                              type="checkbox"
                              defaultChecked={i < 2}
                              className="rounded border-gray-300 dark:border-dark-600 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
