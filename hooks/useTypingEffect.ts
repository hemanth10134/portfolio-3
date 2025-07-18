
import { useState, useEffect, useRef } from 'react';

const useTypingEffect = (
  words: string[],
  typingSpeed = 150,
  deletingSpeed = 100,
  delay = 1500
): string => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const wordIndex = useRef(0);
  const charIndex = useRef(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex.current];

      if (isDeleting) {
        if (charIndex.current > 0) {
          // Deleting
          setText(currentWord.substring(0, charIndex.current - 1));
          charIndex.current--;
        } else {
          // Finished deleting
          setIsDeleting(false);
          wordIndex.current = (wordIndex.current + 1) % words.length;
        }
      } else {
        if (charIndex.current < currentWord.length) {
          // Typing
          setText(currentWord.substring(0, charIndex.current + 1));
          charIndex.current++;
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, words, typingSpeed, deletingSpeed, delay]);

  return text;
};

export default useTypingEffect;
