import PromptInput from '../PromptInput/PromptInput';
import styles from './ChatBot.module.css';

export default function ChatBot() {
  const messages = [
    {
      role: 'user',
      content: 'Which way to Mordor?',
    },
    {
      role: 'system',
      content: 'First turn left when leaveing Rivendell',
    },
  ];
  {
    const messagesDisplay = messages.map((message) => {
      return (
        <li
          className={message.role === 'user' ? styles.userMessage : styles.systemMessage}
          key={message.content}
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
        <PromptInput />
      </section>
    );
  }
}
