/**
 * Client-side Web Speech API utility for pronouncing Russian sentences and words.
 * Fully offline, no external API calls or network requests.
 */

export function speakRussian(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterances
    
    // Clean text from bracket placeholders or symbols
    const cleanText = text
      .replace(/\[\.\.\.\]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/[*_#]/g, '')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.85; // Slightly slower for language learners
    utterance.pitch = 1.0;

    // Try to find a high quality Russian voice if available
    const voices = window.speechSynthesis.getVoices();
    const russianVoice = voices.find(v => v.lang === 'ru-RU' || v.lang.startsWith('ru'));
    if (russianVoice) {
      utterance.voice = russianVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis not available or blocked:', err);
    return false;
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
