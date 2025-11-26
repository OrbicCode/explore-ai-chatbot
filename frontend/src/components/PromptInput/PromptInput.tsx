import { useState } from 'react';
import styles from './PromptInput.module.css';
import type { Prompt } from '../ChatBot/ChatBot';

interface PromptInputProps {
  setPrompt: (prompt: Prompt) => void;
}

export default function PromptInput({ setPrompt }: PromptInputProps) {
  const [promptText, setPromptText] = useState('');

  function handleTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPromptText(e.target.value);
  }

  function handleSubmit() {
    setPrompt({
      role: 'user',
      content: promptText,
    });
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea value={promptText} onChange={handleTextarea} className={styles.textarea} />
    </form>
  );
}
