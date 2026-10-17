import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

export const SupportModal: React.FC = () => {
  const { isSupportOpen, setIsSupportOpen, orders } = useApp();

  const [messages, setMessages] = useState<
    { sender: 'user' | 'support'; text: string; time: string }[]
  >([
    {
      sender: 'support',
      text: 'Namaste! Welcome to ApnaGo Customer Care. How can we assist you with your delivery today?',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isSupportOpen) return null;

  const quickQuestions = [
    'Where is my active order?',
    'I want to change delivery address',
    'How do I cancel and get refund?',
    'Call the delivery partner for me',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Automated smart agent response
    setTimeout(() => {
      let reply =
        "Thank you for contacting ApnaGo support. We've verified your active booking and our local dispatch team has been notified.";
      const lower = text.toLowerCase();
      if (lower.includes('where') || lower.includes('active') || lower.includes('status')) {
        const active = orders.find(
          (o) => o.status !== 'delivered' && o.status !== 'cancelled'
        );
        if (active) {
          reply = `Your order #${active.id} is currently ${active.status.replace(/_/g, ' ').toUpperCase()} by delivery partner ${active.deliveryPartner?.name || 'Ramesh Kumar'}. Estimated arrival in ~12 mins!`;
        } else {
          reply =
            'You do not have any active in-transit orders right now. Would you like help with a past delivery?';
        }
      } else if (lower.includes('refund') || lower.includes('cancel')) {
        reply =
          'ApnaGo offers 100% instant refunds for unfulfilled orders or damaged packages directly back to your original payment method / UPI within 2 hours.';
      } else if (lower.includes('call') || lower.includes('partner') || lower.includes('driver')) {
        reply =
          'We have notified your rider Ramesh Kumar on the partner console to prioritize your route and ensure contactless handover.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'support',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full h-[520px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">ApnaGo 24x7 Help Center</h3>
              <p className="text-[11px] text-emerald-400 font-medium">Online · Typical reply in 1 min</p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick issue chips */}
        <div className="bg-slate-50 border-b border-slate-200 p-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-orange-400 rounded-full px-2.5 py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat message flow */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-orange-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] mt-1 block text-right ${
                    m.sender === 'user' ? 'text-orange-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
