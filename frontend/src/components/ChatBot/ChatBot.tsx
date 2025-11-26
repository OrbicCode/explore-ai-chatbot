import { useState } from 'react';
import PromptInput from '../PromptInput/PromptInput';
import styles from './ChatBot.module.css';
import { v4 as uuidv4 } from 'uuid';

export type Prompt = {
  id: string;
  role: string;
  content: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Prompt[]>([
    {
      id: uuidv4(),
      role: 'user',
      content: 'Which way to Mordor?',
    },
    {
      id: uuidv4(),
      role: 'system',
      content: 'First turn left when leaveing Rivendell',
    },
  ]);

  function handleNewUserPrompt(prompt: Prompt) {
    setMessages((prev) => [...prev, prompt]);
  }

  {
    const messagesDisplay = messages.map((message) => {
      return (
        <li
          className={message.role === 'user' ? styles.userMessage : styles.systemMessage}
          key={message.id}
        >
          {message.content}
        </li>
      );
    });
    return (
      <section className={styles.chatBotSection}>
        <div className={styles.messagesContainer}>
          <ul className={styles.messagesDisplay}>{messagesDisplay}</ul>
        </div>
        <PromptInput onSubmit={handleNewUserPrompt} />
      </section>
    );
  }
}
