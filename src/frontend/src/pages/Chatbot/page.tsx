"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/Chatbot/chat-message";
import { ChatInput } from "@/components/Chatbot/chat-input";
import { ChatSidebar } from "@/components/Chatbot/chat-sidebar";
import { ChatHeader } from "@/components/Chatbot/chat-header";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Zap,
  Brain,
  Code,
  Palette,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isTyping?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
  category: "general" | "code" | "creative" | "analysis";
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    title: "Getting Started with AI",
    lastMessage: "How can I help you today?",
    timestamp: new Date(),
    isActive: true,
    category: "general",
    messages: [
      {
        id: "1",
        content:
          "Hello! I'm your AI assistant powered by the latest technology. I can help you with a wide variety of tasks including answering questions, writing code, creative writing, analysis, and much more. How can I assist you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ],
  },
  {
    id: "2",
    title: "React Component Help",
    lastMessage: "Here's the component you requested...",
    timestamp: new Date(Date.now() - 3600000),
    category: "code",
    messages: [],
  },
  {
    id: "3",
    title: "Creative Writing Ideas",
    lastMessage: "Let me suggest some story concepts...",
    timestamp: new Date(Date.now() - 7200000),
    category: "creative",
    messages: [],
  },
  {
    id: "4",
    title: "Data Analysis Project",
    lastMessage: "I'll help you analyze that dataset...",
    timestamp: new Date(Date.now() - 10800000),
    category: "analysis",
    messages: [],
  },
];

export default function AIChatPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );
  const messages = activeConversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!activeConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    // Add user message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              lastMessage: content,
              timestamp: new Date(),
            }
          : conv,
      ),
    );

    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "",
      role: "assistant",
      timestamp: new Date(),
      isTyping: true,
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, typingMessage] }
          : conv,
      ),
    );

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        role: "assistant",
        timestamp: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [
                  ...conv.messages.filter((m) => m.id !== "typing"),
                  aiResponse,
                ],
                lastMessage: aiResponse.content.substring(0, 50) + "...",
              }
            : conv,
        ),
      );

      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a fantastic question! Let me provide you with a comprehensive answer that covers all the important aspects. Based on current best practices and cutting-edge research, here's what I recommend...",
      "I understand exactly what you're looking for. This is actually a fascinating topic that many professionals are exploring right now. Here's my detailed analysis and practical recommendations...",
      "Excellent point! This is definitely a challenge that requires a strategic approach. Let me break this down into actionable steps that will help you achieve your goals effectively...",
      "Thank you for bringing this up! I can definitely help you navigate this complex topic. Here are some valuable insights and proven strategies that address your specific needs...",
      "That's a really insightful question! This area has seen some exciting developments recently. Let me share some detailed information and real-world examples that will be valuable for your situation...",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      lastMessage: "Start a new conversation...",
      timestamp: new Date(),
      isActive: true,
      category: "general",
      messages: [
        {
          id: Date.now().toString(),
          content:
            "Hello! I'm ready to help you with your new conversation. What exciting topic would you like to explore today?",
          role: "assistant",
          timestamp: new Date(),
        },
      ],
    };

    setConversations((prev) => [
      newConversation,
      ...prev.map((c) => ({ ...c, isActive: false })),
    ]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        isActive: c.id === id,
      })),
    );
    setActiveConversationId(id);
  };

  return (
    <div className="from-ow-white via-ow-white to-ow-aqua/5 dark:from-ow-black dark:via-ow-black dark:to-ow-purple/5 min-h-screen bg-gradient-to-br">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="from-ow-aqua/10 to-ow-purple/10 absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-purple/10 to-ow-gold/10 animation-delay-2000 absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl" />
        <div className="from-ow-gold/5 to-ow-aqua/5 animation-delay-4000 absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br blur-3xl" />

        {/* Floating Gradient Orbs */}
        <div className="from-ow-aqua/20 to-ow-purple/20 animate-float absolute left-20 top-20 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl" />
        <div className="from-ow-purple/20 to-ow-gold/20 animate-float animation-delay-2000 absolute bottom-20 right-20 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl" />
        <div className="from-ow-gold/20 to-ow-aqua/20 animate-float animation-delay-4000 absolute right-1/4 top-1/3 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl" />
      </div>

      <div className="relative flex h-screen">
        {/* Sidebar */}
        <div
          className={cn(
            "transition-all duration-500 ease-in-out",
            sidebarOpen ? "w-80" : "w-0",
          )}
        >
          {sidebarOpen && (
            <ChatSidebar
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
            />
          )}
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:from-ow-aqua/20 hover:to-ow-purple/20 m-3 h-10 w-10 rounded-full p-0 hover:bg-gradient-to-r"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeftOpen className="h-5 w-5" />
              )}
            </Button>

            <div className="flex-1">
              <ChatHeader
                title={activeConversation?.title || "AI Assistant"}
                messageCount={messages.length}
              />
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1">
            <div className="mx-auto max-w-5xl">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-12 text-center">
                  <div className="from-ow-aqua via-ow-purple to-ow-gold mb-8 flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-gradient-to-br shadow-2xl">
                    <Sparkles className="text-ow-white h-12 w-12" />
                  </div>

                  <h2 className="from-ow-aqua via-ow-purple to-ow-gold mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                    Welcome to AI Assistant
                  </h2>

                  <p className="text-muted-foreground mb-10 max-w-lg text-lg font-medium leading-relaxed">
                    I'm here to help you with anything you need. Ask me
                    questions, get help with code, brainstorm creative ideas,
                    analyze data, or just have an engaging conversation!
                  </p>

                  <div className="grid max-w-lg grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="from-ow-aqua/10 to-ow-purple/10 border-gradient-to-r from-ow-aqua/30 to-ow-purple/30 hover:from-ow-aqua/20 hover:to-ow-purple/20 flex h-14 items-center gap-3 border-2 bg-gradient-to-r text-base font-semibold"
                    >
                      <MessageSquare className="h-5 w-5" />
                      General Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gradient-to-r flex h-14 items-center gap-3 border-2 bg-gradient-to-r from-green-400/10 from-green-400/30 to-green-600/10 to-green-600/30 text-base font-semibold hover:from-green-400/20 hover:to-green-600/20"
                    >
                      <Code className="h-5 w-5" />
                      Code Help
                    </Button>
                    <Button
                      variant="outline"
                      className="from-ow-purple/10 to-ow-gold/10 border-gradient-to-r from-ow-purple/30 to-ow-gold/30 hover:from-ow-purple/20 hover:to-ow-gold/20 flex h-14 items-center gap-3 border-2 bg-gradient-to-r text-base font-semibold"
                    >
                      <Palette className="h-5 w-5" />
                      Creative Writing
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gradient-to-r flex h-14 items-center gap-3 border-2 bg-gradient-to-r from-orange-400/10 from-orange-400/30 to-orange-600/10 to-orange-600/30 text-base font-semibold hover:from-orange-400/20 hover:to-orange-600/20"
                    >
                      <Brain className="h-5 w-5" />
                      Analysis
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isLast={index === messages.length - 1}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="mx-auto w-full max-w-5xl">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={handleNewConversation}
        className="from-ow-aqua via-ow-purple to-ow-gold hover:from-ow-aqua/90 hover:via-ow-purple/90 hover:to-ow-gold/90 hover:shadow-3xl text-ow-white fixed bottom-8 right-8 h-16 w-16 animate-bounce rounded-full bg-gradient-to-r shadow-2xl transition-all duration-300"
      >
        <Zap className="h-7 w-7" />
      </Button>
    </div>
  );
}
