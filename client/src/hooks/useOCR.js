import { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

/**
 * useOCR — runs Tesseract.js OCR on a given image File.
 *
 * Returns { runOCR, text, progress, loading, error }
 * The caller is responsible for passing the raw text to the field extractor.
 */
export function useOCR() {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runOCR = useCallback(async (imageFile) => {
    setLoading(true);
    setError(null);
    setText('');
    setProgress(0);

    try {
      const worker = await createWorker('eng+hin', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const { data } = await worker.recognize(imageFile);
      setText(data.text);
      await worker.terminate();
      return data.text;
    } catch (err) {
      setError(err.message);
      return '';
    } finally {
      setLoading(false);
    }
  }, []);

  return { runOCR, text, progress, loading, error };
}
