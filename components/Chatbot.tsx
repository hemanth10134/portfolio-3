import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const suggestedPrompts = [
    "Tell me about Hemanth's projects.",
    "What are his main technical skills?",
    "What is he passionate about?",
    "Summarize his education."
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.warn("API_KEY is not set. Chatbot will be disabled.");
      return;
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    chatRef.current = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        systemInstruction: `You are "Hemanth-Bot", a friendly and professional AI assistant for Hemanth Bhavana's portfolio website. Your purpose is to answer questions about Hemanth's skills, projects, and professional background based on the information provided across the portfolio. 
        - Your tone should be enthusiastic and helpful.
        - Keep answers concise and to the point.
        - If you are asked something you don't know, gracefully state that the information isn't on the portfolio and you can only answer questions related to it. Do not make up information.
        - You can use simple markdown like bullet points (*) if it helps clarify a list (e.g., for projects or skills).`,
      },
    });
    setMessages([
      { sender: 'ai', text: "Hi there! I'm Hemanth-Bot. Ask me anything about his portfolio, or try one of the suggestions below!" }
    ]);
  }, [API_KEY]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !chatRef.current) return;
    
    setHasInteracted(true);
    const userMessage: Message = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessageStream({ message: messageText });
      
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

      let aiResponseText = '';
      for await (const chunk of response) {
        aiResponseText += chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          // Ensure last message exists and is from AI before updating
          if (lastMessage?.sender === 'ai') {
            // Immutable update: create a new array with the last item updated.
            return [...prev.slice(0, -1), { ...lastMessage, text: aiResponseText }];
          }
          return prev; // Should not happen in normal flow, but safe fallback
        });
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      // Fix: Explicitly type `errorMessage` to match the `Message` type.
      const errorMessage: Message = { sender: 'ai', text: "Oops! Something went wrong on my end. Please try again in a moment." };
      setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
           // If the last message was the empty AI placeholder, replace it with the error.
          if (lastMessage?.sender === 'ai' && lastMessage.text === '') {
             // Immutable update: replace the empty streaming message with the error.
            return [...prev.slice(0, -1), errorMessage];
          }
           // Fallback: just add the error message.
          return [...prev, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const AiMessage = ({ text, isStreaming }: { text: string, isStreaming: boolean }) => {
    const formattedText = text 
        ? text.split('\n').map((line, i) => {
            if (line.trim().startsWith('* ')) {
                return <li key={i} className="ml-4 list-disc">{line.substring(2)}</li>;
            }
            return line ? <p key={i}>{line}</p> : null;
        }).filter(Boolean)
        : null;
    
    return (
      <div className="max-w-[85%] p-3 rounded-lg text-sm bg-gray-700 text-white leading-relaxed">
        {formattedText}
        {isStreaming && !text && (
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-0"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-300"></span>
            </div>
        )}
        {isStreaming && text && <span className="inline-block w-0.5 h-4 bg-white animate-blink ml-1" />}
      </div>
    );
  };

  if (!API_KEY) return null;

  return (
    <>
      <div className={`fixed bottom-24 right-5 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="relative w-80 sm:w-96 h-[32rem] rounded-2xl shadow-2xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 rounded-2xl blur opacity-75 animate-border-spin"></div>
          <div className="relative bg-[#101123] w-full h-full rounded-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 p-3 bg-gradient-to-r from-pink-600/30 to-fuchsia-600/30 text-center border-b border-white/10">
              <h3 className="font-bold text-white">Hemanth-Bot</h3>
              <p className="text-xs text-gray-300">AI Portfolio Assistant</p>
            </div>
            
            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'user' ? (
                     <div className="max-w-[85%] p-3 rounded-lg text-sm bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white">
                      {msg.text}
                    </div>
                  ) : (
                    <AiMessage text={msg.text} isStreaming={isLoading && index === messages.length - 1} />
                  )}
                </div>
              ))}

              {!hasInteracted && !isLoading && (
                  <div className="pt-2 space-y-2 animate-fade-in">
                      {suggestedPrompts.map(prompt => (
                          <button
                              key={prompt}
                              onClick={() => handlePromptClick(prompt)}
                              className="w-full text-left text-sm p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                          >
                              {prompt}
                          </button>
                      ))}
                  </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form onSubmit={handleFormSubmit} className="flex-shrink-0 p-3 border-t border-white/10">
              <div className="flex items-center bg-gray-900/50 border border-white/20 rounded-full focus-within:border-pink-500 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me something..."
                  className="w-full bg-transparent p-2.5 pl-4 text-sm outline-none text-white"
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="p-2.5 text-pink-400 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors mr-1">
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-gradient-to-tr from-pink-500 to-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
        aria-label="Toggle Chatbot"
      >
        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'transform rotate-180 scale-75' : 'transform rotate-0 scale-100'}`}>
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </div>
      </button>
    </>
  );
};

export default Chatbot;
