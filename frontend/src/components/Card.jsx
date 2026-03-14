import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, gradient = false }) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? { whileHover: { y: -4 }, transition: { duration: 0.2 } } : {};

  return (
    <Component
      {...hoverProps}
      className={`rounded-2xl bg-white dark:bg-dark-800 ${
        gradient
          ? 'p-[1px] bg-gradient-to-br from-blue-500 to-purple-500'
          : 'border border-gray-200 dark:border-dark-700'
      } ${className}`}
    >
      {gradient ? (
        <div className="rounded-2xl bg-white dark:bg-dark-800 p-6 h-full">
          {children}
        </div>
      ) : (
        <div className="p-6">{children}</div>
      )}
    </Component>
  );
}
