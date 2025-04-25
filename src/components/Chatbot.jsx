import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Send,
  Moon,
  Sun,
  Home,
  Trash2,
  LayoutDashboard,
  AppWindowMac,
  ActivitySquare,
  Gamepad2,
  Loader,
  GraduationCap,
  Bot,
  MessageSquare,
  HeartPulse,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  HelpCircle,
  BookOpen,
  ShoppingBag,
  Activity,
  Stethoscope,
  MessageCircle,
  HeartHandshake,
  Handshake,
  ChevronRight,
  Calendar,
  Droplet,
  Thermometer,
  Pill,
  Heart,
  Brain,
  Scale,
  Bell,
  AlertCircle,
  Book,
  Clock,
  TrendingUp,
  Shield,
  Info
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const healthEmojis = [
  "❤️", "💪", "🌸", "🌺", "🌷", "🌼", "💕", "💖", "💗", "💓",
  "💞", "💝", "💟", "🩸", "🩹", "💊", "🌡️", "⚕️", "🏥", "💉"
];

const healthTopics = [
  { 
    icon: <Calendar size={20} />, 
    label: "Period Tracking", 
    prompt: "Help me track my menstrual cycle and predict my next period",
    category: "tracking"
  },
  { 
    icon: <Droplet size={20} />, 
    label: "Flow Analysis", 
    prompt: "Analyze my menstrual flow patterns and what they indicate",
    category: "analysis"
  },
  { 
    icon: <Thermometer size={20} />, 
    label: "Symptom Tracker", 
    prompt: "Track and analyze my menstrual symptoms",
    category: "tracking"
  },
  { 
    icon: <Pill size={20} />, 
    label: "Medication Guide", 
    prompt: "What medications are safe during menstruation and how to manage pain?",
    category: "health"
  },
  { 
    icon: <Heart size={20} />, 
    label: "Reproductive Health", 
    prompt: "Tell me about maintaining good reproductive health",
    category: "health"
  },
  { 
    icon: <Brain size={20} />, 
    label: "Mental Wellness", 
    prompt: "How to manage PMS and maintain mental health during periods?",
    category: "wellness"
  },
  { 
    icon: <Scale size={20} />, 
    label: "Nutrition Guide", 
    prompt: "What foods help with menstrual health and reduce symptoms?",
    category: "wellness"
  },
  { 
    icon: <Activity size={20} />, 
    label: "Exercise Tips", 
    prompt: "What exercises are beneficial during different phases of my cycle?",
    category: "wellness"
  },
  { 
    icon: <Shield size={20} />, 
    label: "Hygiene Tips", 
    prompt: "Best practices for menstrual hygiene and product safety",
    category: "health"
  }
];

const popularEmojis = [
  "😊",
  "😂",
  "❤️",
  "😍",
  "🥰",
  "😭",
  "😘",
  "🥺",
  "✨",
  "😅",
  "🙏",
  "🔥",
  "😊",
  "💕",
  "😌",
  "💜",
  "😩",
  "😤",
  "🥳",
  "💪",
];

const symptomOptions = [
  "Cramps", "Headache", "Fatigue", "Mood Swings", "Bloating",
  "Acne", "Back Pain", "Breast Tenderness", "Nausea", "Insomnia"
];

export function Chatbot() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSymptomTracker, setShowSymptomTracker] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [cycleData, setCycleData] = useState({
    lastPeriod: "",
    cycleLength: 28,
    periodLength: 5
  });
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await model.generateContent(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.response.text() },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const formatMessage = (text) => {
    return text.split('**').map((part, index) => {
      return index % 2 === 1 ? (
        <strong key={index} className="text-pink-600 dark:text-pink-400">
          {part}
        </strong>
      ) : (
        part
      );
    });
  };
  const clearChat = () => {
    setMessages([]);
  };

  const speakMessage = (text) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: `Uploaded file: ${file.name}` },
      ]);
    }
  };

  const handleTopicClick = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleCycleUpdate = (field, value) => {
    setCycleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const predictNextPeriod = () => {
    if (!cycleData.lastPeriod) return "Please set your last period date";
    const lastPeriodDate = new Date(cycleData.lastPeriod);
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleData.cycleLength);
    return nextPeriodDate.toLocaleDateString();
  };

  const getHealthTips = () => {
    const tips = {
      tracking: "Track your symptoms daily for better cycle understanding",
      analysis: "Analyze your patterns to identify any irregularities",
      wellness: "Practice self-care and maintain a balanced lifestyle",
      health: "Stay hydrated and maintain proper hygiene"
    };
    return tips;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600&display=swap');
      
      .SheSync-chatbot {
--fc-bg-primary: #FFF5F7;
    --fc-bg-secondary: #FFFFFF;
    --fc-text-primary: #2D3748;
    --fc-text-secondary: #718096;
    --fc-accent: #F687B3;
    --fc-accent-dark: #FEC5D9;
    --fc-input-bg: #FFFFFF;
    --fc-input-text: #2D3748;
      }

      .SheSync-chatbot.light {
        --fc-bg-primary: #FFF5F7;
        --fc-bg-secondary: #FFFFFF;
        --fc-text-primary: #1A202C;
        --fc-text-secondary: #4A5568;
      }

      .SheSync-chatbot {
        font-family: 'Poppins', sans-serif;
      }

      .header-button {
        padding: 0.5rem;
        color: var(--fc-text-primary);
        background-color: transparent;
      }

      .message-bubble {
         padding: 1.2rem 1.5rem;
    border-radius: 1.5rem;
    line-height: 1.6;
    font-size: 0.95rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
    max-width: 85%;
      }

      .message-bubble:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .message-appear {
        animation: appearAnimation 0.3s ease-out;
      }
        

       .message-bubble.user {
    background: linear-gradient(135deg, #F687B3 0%, #FEC5D9 100%);
    color: #FFFFFF;
    border-radius: 1.5rem 1.5rem 0.5rem 1.5rem;
  }

  .message-bubble.assistant {
    background: var(--fc-bg-secondary);
    color: var(--fc-text-primary);
    border: 1px solid #FEC5D9;
    border-radius: 1.5rem 1.5rem 1.5rem 0.5rem;
  }

      .emoji-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
        padding: 0.5rem;
      }

      .emoji-button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
        font-size: 1.25rem;
      }

      .emoji-button:hover {
        background-color: var(--fc-accent);
        transform: scale(1.1);
      }

      @keyframes appearAnimation {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      /* Scrollbar Styles */
      .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: var(--fc-bg-secondary);
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: var(--fc-accent);
        border-radius: 3px;
      }
        .SheSync-chatbot.dark {
    --fc-bg-primary: #1A1B26;
    --fc-bg-secondary: #24283B;
    --fc-text-primary: #FFFFFF;
    --fc-text-secondary: #A0AEC0;
  }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const SidebarLink = ({ icon, label, onClick, active = false }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
          active
            ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
            : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };
  return (
    <div
      className={`SheSync-chatbot ${isDarkMode ? "" : "light"} flex h-screen`}
    >
      {/* Sidebar */}
      <aside className="bg-pink-100 w-64 p-4 border-r border-[var(--fc-accent)]">
          <div className="px-4 py-4 flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">
              SheSync Health
            </h1>
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              onClick={() => navigate("/dashboard")}
            />
            <SidebarLink
              icon={<Home size={20} />}
              label="Home"
              onClick={() => navigate("/")}
            />
            
            <SidebarLink
              icon={<ActivitySquare size={20} />}
              label="Track Your Health"
              onClick={() => navigate("/tracker")}
            />
            <SidebarLink
                                  icon={<ClipboardList size={20} />}
                                  label="PCOS Diagnosis"
                                  onClick={() => navigate("/partner")}
                                />
            <SidebarLink
              icon={<Stethoscope size={20} />}
              label="Expert Consultation"
              onClick={() => navigate("/consultations")}
            />
            <SidebarLink
              icon={<Bot size={20} />}
              label="Eve"
              onClick={() => navigate("/ChatBot")}
              active
            />
            <SidebarLink
              icon={<HeartPulse size={20} />}
              label="HealthLens"
              onClick={() => navigate("/symptomsanalyzer")}
            />
            
            <SidebarLink
              icon={<MessageSquare size={20} />}
              label="Forums"
              onClick={() => navigate("/forums")}
            />
            
          </div>
      </aside>
      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-0 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        style={{
          transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
        }}
        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
      >
        <ChevronRight
          size={8}
          className={`transition-transform duration-300 ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Main Content */}
      
      <div className="flex-1 flex flex-col bg-[var(--fc-bg-primary)] transition-colors duration-200  ">
        <div className="flex items-center justify-between p-4 bg-[var(--fc-accent)] shadow-md">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-pink-600">
              SheSync Health Assistant
            </h2>
            <div className="flex items-center space-x-2 text-sm text-pink-700">
              <Bell size={16} />
              <span>Next Period: {predictNextPeriod()}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-black"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={clearChat}
              className="p-2 text-black"
              aria-label="Clear chat"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() =>
                alert(
                  "Help: This is an Eve designed to provide support and information for young girls aged 13-20."
                )
              }
              className="p-2 text-black"
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        {/* Health Dashboard */}
        <div className="p-4 bg-white dark:bg-gray-800 shadow-sm">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-pink-50 dark:bg-pink-900 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar size={20} />
                <span>Cycle Day: {cycleData.periodLength}</span>
              </div>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Cycle Length: {cycleData.cycleLength} days</span>
              </div>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900 rounded-lg">
              <div className="flex items-center space-x-2">
                <Info size={20} />
                <span>Phase: {cycleData.periodLength <= 5 ? "Menstrual" : "Follicular"}</span>
              </div>
            </div>
          </div>

          {/* Health Topics Quick Access */}
          <div className="grid grid-cols-9 gap-2">
            {healthTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic.prompt)}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
              >
                {topic.icon}
                <span className="text-xs mt-1 text-center">{topic.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Symptom Tracker */}
        {showSymptomTracker && (
          <div className="p-4 bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Track Your Symptoms</h3>
            <div className="grid grid-cols-5 gap-2">
              {symptomOptions.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`p-2 rounded-lg ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-pink-500 text-white"
                      : "bg-pink-100 dark:bg-pink-900"
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--fc-accent)] scrollbar-track-[var(--fc-bg-secondary)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } message-appear`}
            >
              {message.role === "assistant" && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--fc-accent)] flex items-center justify-center text-black mr-2 text-lg font-medium">
                  AI
                </div>
              )}
              <div className="flex flex-col max-w-[70%]">
                {/* <div
                  className={`message-bubble inline-block whitespace-pre-line text-base ${
                    message.role === "user"
                      ? "bg-[var(--fc-accent)] text-black"
                      : "bg-[var(--fc-bg-secondary)] text-[var(--fc-text-primary)] border border-[var(--fc-accent)]"
                  }`}
                >
                  {message.content}
                </div> */}
                <div
  className={`message-bubble ${
    message.role === "user" ? "user" : "assistant"
  } message-appear`}
>
  {formatMessage(message.content)}
</div>
                {message.role === "assistant" && (
                  <div className="flex mt-2 space-x-2">
                    <button
                      onClick={() =>
                        isSpeaking
                          ? stopSpeaking()
                          : speakMessage(message.content)
                      }
                      className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] transition-colors duration-200 text-black"
                    >
                      {isSpeaking ? (
                        <VolumeX size={16} />
                      ) : (
                        <Volume2 size={16} />
                      )}
                      <span>{isSpeaking ? "Stop" : "Read"}</span>
                    </button>
                  </div>
                )}
              </div>
              {message.role === "user" && (
                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--fc-accent-dark)] flex items-center justify-center text-black ml-2 text-lg font-medium">
                  U
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center text-[var(--fc-text-secondary)] message-appear">
              <Loader className="animate-spin mr-2" size={16} />
              <span>SheSync AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-[var(--fc-bg-secondary)] border-t border-[var(--fc-accent)] shadow-md">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about menstrual health, track symptoms, or get personalized advice..."
              className="flex-grow p-3 rounded-lg bg-[var(--fc-input-bg)] text-[var(--fc-input-text)] placeholder-[var(--fc-text-secondary)] border border-[var(--fc-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--fc-accent-dark)]"
            />
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="p-3 rounded-lg bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] text-black transition-colors duration-200 cursor-pointer"
            >
              <Paperclip size={20} />
            </label>
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="p-3 rounded-lg bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] text-black transition-colors duration-200"
              aria-label="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="submit"
              className="p-3 rounded-lg bg-[var(--fc-accent)] hover:bg-[var(--fc-accent-dark)] text-black transition-colors duration-200"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
          {showEmojiPicker && (
            <div className="mt-2 p-2 bg-[var(--fc-bg-secondary)] border border-[var(--fc-accent)] rounded-lg">
              <div className="emoji-grid">
                {healthEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="emoji-button"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}