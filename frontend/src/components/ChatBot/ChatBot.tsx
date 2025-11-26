import { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import PromptInput from '../PromptInput/PromptInput';
import styles from './ChatBot.module.css';
import { v4 as uuidv4 } from 'uuid';

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
    console.log(messagesEndRef);

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
      console.error('OpenAI Error: ', error);

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Sorry, something went wrong, check console.',
        },
      ]);
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
        >
          <p>{message.content}</p>
        </li>
      );
    });
    return (
      <section className={styles.chatBotSection}>
        <div className={styles.messagesContainer}>
          <ul className={styles.messagesDisplay}>
            {messagesDisplay}
            <li ref={messagesEndRef} style={{ height: 0, visibility: 'hidden' }}></li>
          </ul>
        </div>
        <div className={styles.inputWrapper}>
          <PromptInput onSubmit={handleNewUserPrompt} isLoading={isLoading} />
        </div>
      </section>
    );
  }
}
