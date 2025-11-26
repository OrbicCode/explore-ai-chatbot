import styles from './PromptInput.module.css';

export default function PromptInput() {
  return (
    <form className={styles.form}>
      <textarea className={styles.textarea} />
    </form>
  );
}
