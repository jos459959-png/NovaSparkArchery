import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Headphones } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickReplies = [
  'Product Inquiry',
  'Order Status',
  'Support',
  'Technical Help',
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Welcome to NovaSpark! I am your dedicated support agent. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        'Product Inquiry': 'We offer compound bows, recurve bows, arrows, and various accessories. Which category interests you? I can provide detailed information.',
        'Order Status': 'Please provide your order number and I can check the status for you. Alternatively, you can log into your account and view "My Orders".',
        'Support': 'We offer 7-day hassle-free returns and a 1-year warranty. Please describe your situation in detail.',
        'Technical Help': 'Our technical team can provide bow tuning and maintenance support. Please describe the issue you are experiencing.',
      };

      const defaultResponses = [
        'Thank you for reaching out! Our support team will get back to you as soon as possible.',
        'Your inquiry has been recorded. A specialist will contact you within 24 hours.',
        'For more detailed assistance, please call our support hotline: 1-800-NOVA-BOW',
      ];

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[text] || defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-6 bottom-24 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-white text-black rotate-90'
            : 'bg-white text-black hover:bg-white/90 animate-pulse-glow'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed right-6 bottom-44 z-50 w-80 md:w-96 bg-tactical-dark border border-white/20 shadow-2xl transition-all duration-300 ${
          isOpen ? 'chat-open' : 'chat-close pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-sm tracking-wider">
                LIVE SUPPORT
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-white/50">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser ? 'bg-white/20' : 'bg-white'
                }`}
              >
                {message.isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <span className="font-display text-sm font-bold text-black">N</span>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] px-4 py-2 text-sm ${
                  message.isUser
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white'
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-50 mt-1 block">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="font-display text-sm font-bold text-black">N</span>
              </div>
              <div className="bg-white/10 px-4 py-3 flex items-center gap-1">
                <span className="w-2 h-2 bg-white/50 rounded-full typing-dot" />
                <span className="w-2 h-2 bg-white/50 rounded-full typing-dot" />
                <span className="w-2 h-2 bg-white/50 rounded-full typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="px-3 py-1 text-xs bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors border border-white/10"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
