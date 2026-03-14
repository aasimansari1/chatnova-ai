import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUser, HiEnvelope, HiLockClosed, HiSparkles } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const getPasswordStrength = (pw) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!agreed) errs.agreed = 'You must accept the terms';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created successfully!');
      navigate('/chat');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 -z-10" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Start chatting with AI in seconds</p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="John Doe"
                icon={HiUser}
                value={form.name}
                onChange={onChange('name')}
                error={errors.name}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                icon={HiEnvelope}
                value={form.email}
                onChange={onChange('email')}
                error={errors.email}
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  icon={HiLockClosed}
                  value={form.password}
                  onChange={onChange('password')}
                  error={errors.password}
                />
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i <= strength ? strengthColors[strength] : 'bg-gray-200 dark:bg-dark-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{strengthLabels[strength]}</p>
                  </div>
                )}
              </div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={HiLockClosed}
                value={form.confirmPassword}
                onChange={onChange('confirmPassword')}
                error={errors.confirmPassword}
              />

              <div>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => { setAgreed(e.target.checked); if (errors.agreed) setErrors({ ...errors, agreed: '' }); }}
                    className="mt-0.5 rounded border-gray-300 dark:border-dark-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</button>
                  </span>
                </label>
                {errors.agreed && <p className="mt-1 text-xs text-red-500">{errors.agreed}</p>}
              </div>

              <Button type="submit" loading={loading} size="lg" className="w-full">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
