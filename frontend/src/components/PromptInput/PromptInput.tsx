import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './PromptInput.module.css';
import type { Prompt } from '../ChatBot/ChatBot';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface PromptInputProps {
  onSubmit: (prompt: Prompt) => void;
  isLoading: boolean;
}

export default function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [promptText, setPromptText] = useState('');

  function handleTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPromptText(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (promptText) {
      onSubmit({
        id: uuidv4(),
        role: 'user',
        content: promptText,
      });
    }

    setPromptText('');
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.textareaContainer}>
        <textarea
          placeholder='How can I help you?'
          value={promptText}
          onChange={handleTextarea}
          className={styles.textarea}
        />
        {isLoading ? (
          <div className={styles.pending}>
            <MoreHorizIcon />
          </div>
        ) : (
          <button disabled={promptText ? false : true} className={styles.submitButton}>
            <QuestionAnswerIcon />
          </button>
        )}
      </div>
    </form>
  );
}
