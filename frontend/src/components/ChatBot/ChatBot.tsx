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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleNewUserPrompt(prompt: Prompt) {
    setMessages((prev) => [...prev, prompt]);
    setIsLoading(true);
  }

  {
    const messagesDisplay = messages.map((message) => {
      return (
        <li
          className={message.role === 'user' ? styles.userMessage : styles.systemMessage}
          key={message.id}
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
