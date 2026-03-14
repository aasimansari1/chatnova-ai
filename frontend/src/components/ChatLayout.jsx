import Navbar from './Navbar';

export default function ChatLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-dark-900">
      <Navbar minimal />
      <main className="flex-1 overflow-hidden pt-16">{children}</main>
    </div>
  );
}
