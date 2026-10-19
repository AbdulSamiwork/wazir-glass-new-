import { useState, useEffect, memo } from 'react';

const TypewriterText = memo(({ fullText }) => {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting) {
      if (typedText.length < fullText.length) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      }
    } else {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length - 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 600);
      }
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, fullText]);

  return (
    <span className="inline-block text-sky-600 glow-text mt-1">
      {typedText}
      <span className="text-sky-500 font-normal animate-pulse">|</span>
    </span>
  );
});

export default TypewriterText;
