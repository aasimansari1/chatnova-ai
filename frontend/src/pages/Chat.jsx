import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiPlus, HiPaperAirplane, HiTrash, HiSparkles, HiMagnifyingGlass,
  HiBars3, HiXMark, HiClipboard, HiArrowPath, HiMicrophone,
  HiArrowDown, HiChatBubbleLeftRight, HiEllipsisVertical
} from 'react-icons/hi2';
import { FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

export default function Chat() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [recording, setRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Fetch chats on mount
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, scrollToBottom]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get('/chats');
      setChats(data.data);
      if (data.data.length > 0 && !activeChat) {
        loadChat(data.data[0]._id);
      }
    } catch (err) {
      toast.error('Failed to load chats');
    } finally {
      setChatsLoading(false);
    }
  };

  const loadChat = async (id) => {
    try {
      const { data } = await api.get(`/chats/${id}`);
      setActiveChat(data.data);
      setSidebarOpen(false);
    } catch (err) {
      toast.error('Failed to load chat');
    }
  };

  const createChat = async () => {
    try {
      const { data } = await api.post('/chats', { title: 'New Chat' });
      setChats(prev => [data.data, ...prev]);
      setActiveChat(data.data);
      setSidebarOpen(false);
    } catch (err) {
      toast.error('Failed to create chat');
    }
  };

  const deleteChat = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/chats/${id}`);
      setChats(prev => prev.filter(c => c._id !== id));
      if (activeChat?._id === id) {
        setActiveChat(null);
      }
      toast.success('Chat deleted');
    } catch (err) {
      toast.error('Failed to delete chat');
    }
  };

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!message.trim() || loading) return;

    // Create chat if none exists
    let chatId = activeChat?._id;
    if (!chatId) {
      try {
        const { data } = await api.post('/chats', { title: message.slice(0, 40) });
        chatId = data.data._id;
        setChats(prev => [data.data, ...prev]);
      } catch (err) {
        toast.error('Failed to create chat');
        return;
      }
    }

    const userMsg = { role: 'user', content: message, timestamp: new Date() };
    setActiveChat(prev => ({
      ...prev,
      _id: chatId,
      messages: [...(prev?.messages || []), userMsg],
    }));
    setMessage('');
    setLoading(true);

    try {
      const { data } = await api.post(`/chats/${chatId}/message`, { content: message });
      setActiveChat(data.data);
      // Update chat list title
      setChats(prev => prev.map(c =>
        c._id === chatId ? { ...c, title: data.data.title, updatedAt: new Date() } : c
      ));
    } catch (err) {
      toast.error('Failed to get response');
      setActiveChat(prev => ({
        ...prev,
        messages: prev.messages.slice(0, -1),
      }));
    } finally {
      setLoading(false);
    }
  };

  const regenerate = async () => {
    if (!activeChat?.messages?.length || loading) return;
    const lastUserMsg = [...activeChat.messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove last AI message
    setActiveChat(prev => ({
      ...prev,
      messages: prev.messages.slice(0, -1),
    }));
    setMessage(lastUserMsg.content);
    // Trigger send after state update
    setTimeout(() => {
      const input = textareaRef.current;
      if (input) {
        const form = input.closest('form');
        if (form) form.requestSubmit();
      }
    }, 100);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const downloadPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(activeChat?.title || 'Chat', 20, 20);
      doc.setFontSize(10);
      let y = 35;
      activeChat?.messages?.forEach(msg => {
        const prefix = msg.role === 'user' ? 'You: ' : 'AI: ';
        const lines = doc.splitTextToSize(prefix + msg.content, 170);
        if (y + lines.length * 5 > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(lines, 20, y);
        y += lines.length * 5 + 5;
      });
      doc.save(`chatnova-${activeChat?._id || 'chat'}.pdf`);
      toast.success('PDF downloaded');
    } catch {
      toast.error('Failed to export PDF');
    }
  };

  // Voice input
  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(prev => prev + transcript);
      setRecording(false);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setRecording(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredChats = chats.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return 'Today';
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-dark-900">
      <Navbar minimal />
      <div className="flex-1 flex overflow-hidden pt-16">
        {/* Sidebar overlay for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gray-50 dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col pt-16 lg:pt-0 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Sidebar header */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-dark-700"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={createChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <HiPlus className="w-4 h-4" /> New Chat
            </button>
            <div className="relative">
              <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            {chatsLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-blue-200 dark:border-dark-600 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : filteredChats.length === 0 ? (
              <p className="text-center text-sm text-gray-500 dark:text-gray-500 py-8">No chats yet</p>
            ) : (
              filteredChats.map(chat => (
                <button
                  key={chat._id}
                  onClick={() => loadChat(chat._id)}
                  className={`w-full group flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                    activeChat?._id === chat._id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
                >
                  <HiChatBubbleLeftRight className="w-4 h-4 flex-shrink-0 opacity-60" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{chat.title || 'New Chat'}</div>
                    <div className="text-xs opacity-60 truncate">{formatDate(chat.updatedAt)}</div>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat._id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-all"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800"
              >
                <HiBars3 className="w-5 h-5" />
              </button>
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {activeChat?.title || 'New Chat'}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {activeChat?.messages?.length > 0 && (
                <button
                  onClick={downloadPDF}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                  title="Download as PDF"
                >
                  <FiDownload className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {!activeChat?.messages?.length && !loading ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                  <HiSparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  How can I help you?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                  Ask me anything — from coding questions to creative writing, I'm here to help.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                  {[
                    'Explain quantum computing',
                    'Write a Python function',
                    'Help me brainstorm ideas',
                    'Summarize a topic',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setMessage(suggestion)}
                      className="px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                {activeChat?.messages?.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <HiSparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`group relative max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-bl-md'
                      }`}>
                        {msg.content}
                      </div>
                      <div className={`flex items-center gap-2 mt-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                        {msg.role === 'assistant' && (
                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                            <button onClick={() => copyMessage(msg.content)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Copy">
                              <HiClipboard className="w-3.5 h-3.5" />
                            </button>
                            {i === activeChat.messages.length - 1 && (
                              <button onClick={regenerate} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Regenerate">
                                <HiArrowPath className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-dark-700 flex items-center justify-center flex-shrink-0 mt-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <HiSparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-dark-800">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 p-4">
            <form onSubmit={sendMessage} className="max-w-3xl mx-auto">
              <div className="relative flex items-end gap-2 rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm py-2 px-3 focus:outline-none max-h-32"
                  style={{ minHeight: '40px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                  }}
                />
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`p-2 rounded-xl transition-colors ${
                      recording
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                    }`}
                    title="Voice input"
                  >
                    <HiMicrophone className="w-5 h-5" />
                    {recording && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  </button>
                  <button
                    type="submit"
                    disabled={!message.trim() || loading}
                    className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                  >
                    <HiPaperAirplane className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-xs text-gray-400">
                  Press Enter to send, Shift+Enter for new line
                </p>
                <p className="text-xs text-gray-400">{message.length}/4000</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
