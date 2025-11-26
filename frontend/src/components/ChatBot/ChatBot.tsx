import { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import PromptInput from '../PromptInput/PromptInput';
import styles from './ChatBot.module.css';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'system-001',
      role: 'system',
      content:
        'You an upbeat and helpful AI and like to use emojis to help answer whatever the user wants answered. Do not use too many emojis though',
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLLIElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleNewUserPrompt(userMessage: Message) {
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-5-nano',
        messages: [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        verbosity: 'low',
      });

      const assistantMessage = {
        id: response.id,
        role: response.choices[0].message.role,
        content: response.choices[0].message.content || '',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  {
    const messagesDisplay = messages.map((message) => {
      if (message.role === 'system') return null;
      return (
        <li
          className={message.role === 'user' ? styles.userMessage : styles.assistantMessage}
          key={message.id}
          ref={messagesEndRef}
        >
          <p>{message.content}</p>
        </li>
      );
    });
    return (
      <section className={styles.chatBotSection}>
        <div className={styles.messagesContainer}>
          <ul className={styles.messagesDisplay}>{messagesDisplay}</ul>
        </div>
        <div className={styles.inputWrapper}>
          <PromptInput onSubmit={handleNewUserPrompt} isLoading={isLoading} />
        </div>
      </section>
    );
  }
}
