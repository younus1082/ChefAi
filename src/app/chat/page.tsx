'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  ClockIcon,
  UserIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your AI cooking assistant. I can help you with recipes, cooking techniques, ingredient substitutions, and meal planning. What would you like to cook today?",
    isUser: false,
    timestamp: new Date(),
    suggestions: [
      "What can I make with chicken and rice?",
      "How do I make pasta from scratch?",
      "Quick dinner ideas for tonight",
      "Healthy breakfast recipes"
    ]
  }
];

const quickPrompts = [
  "What's a good recipe for beginners?",
  "How do I substitute eggs in baking?",
  "Quick 15-minute meals",
  "Vegetarian protein sources",
  "How to properly season food",
  "Meal prep ideas for the week"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Based on your ingredients, I'd recommend trying a delicious stir-fry. Here's a simple recipe: Heat oil in a pan, add your protein first, then vegetables, and season with soy sauce, garlic, and ginger. Cook for 5-7 minutes until everything is tender.",
      "I love helping with cooking! For that dish, you'll want to start by prepping all your ingredients first. This technique is called 'mise en place' and it makes cooking much smoother. Would you like me to walk you through the step-by-step process?",
      "Excellent choice! That's one of my favorite recipes to recommend. The key is to use fresh ingredients and not overcook them. Here are some pro tips: season at each step, taste as you go, and don't be afraid to adjust flavors to your preference.",
      "That sounds delicious! For the best results, I recommend marinating your protein for at least 30 minutes before cooking. This will help develop deeper flavors. Also, make sure your pan is hot before adding ingredients for better texture.",
      "Great question! The secret to that dish is balancing the flavors - sweet, salty, sour, and umami. Start with a base of aromatics like onions and garlic, then build your flavors layer by layer. Don't forget to finish with fresh herbs!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
        suggestions: Math.random() > 0.5 ? [
          "Tell me more about this technique",
          "What are some variations?",
          "Any tips for beginners?",
          "Show me another recipe"
        ] : undefined
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <BeakerIcon className="w-7 h-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">AI Cooking Assistant</h1>
            <p className="text-white/90">Always here to help with your culinary adventures</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.isUser ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-end space-x-2 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-600'
                }`}>
                  {message.isUser ? (
                    <UserIcon className="w-5 h-5 text-white" />
                  ) : (
                    <BeakerIcon className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                  message.isUser
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-sm'
                    : 'bg-gradient-to-r from-white to-purple-50 text-gray-900 rounded-bl-sm border border-purple-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <div className={`flex items-center mt-1 space-x-1 text-xs ${
                    message.isUser ? 'text-blue-100' : 'text-purple-600'
                  }`}>
                    <ClockIcon className="w-3 h-3" />
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-purple-600 font-medium px-2">Suggested follow-ups:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="px-3 py-2 text-xs bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full hover:from-purple-200 hover:to-pink-200 hover:border-purple-300 transition-all duration-200 text-purple-700 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <BeakerIcon className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gradient-to-r from-white to-purple-50 px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg border border-purple-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-purple-200">
        <div className="flex items-center space-x-2 mb-3">
          <SparklesIcon className="w-4 h-4 text-purple-500" />
          <span className="text-xs text-purple-600 font-medium">Quick prompts:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-2 text-xs bg-gradient-to-r from-white to-purple-100 hover:from-purple-100 hover:to-pink-100 rounded-full transition-all duration-200 border border-purple-200 hover:border-purple-300 text-purple-700 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-white to-purple-50 border-t border-purple-200 px-6 py-4 shadow-lg">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about cooking..."
                className="w-full px-4 py-3 pr-12 border-2 border-purple-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none shadow-lg"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:scale-110"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-purple-600 mt-2 text-center font-medium">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}