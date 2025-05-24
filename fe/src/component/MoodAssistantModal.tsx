import React, { useState } from 'react';
import type { ModalStage, MoodAssistantModalProps, MoodResult } from '../utils/Modals';
import { useGetUser } from '../utils/UseGetUser';
import { postChat } from '../provider/chatProvider';

export const MoodAssistantModal: React.FC<MoodAssistantModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<ModalStage>('initial');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<MoodResult | null>(null);
  const { user, loading, error } = useGetUser();

  const handleSubmit = async () => {
    if (!userInput.trim() || !user?.id) console.log("Gaada user");

    if (!userInput.trim() || !user?.id) return;

    setStage('thinking');

    setTimeout(async () => {
      const moodResult = getMoodAnalysis(userInput);
      setResult(moodResult);
      setStage('result');

      try {
        const res = await postChat({
          creatorId: user.id,
          message: userInput,
          mood: moodResult.mood,
          recomendation: moodResult.recommendation,
          reason: moodResult.reason,
        });
        console.log(res)
        
      } catch (err) {
        console.error('Gagal menyimpan chat:', err);
      }
    }, 2000);
  };

  const resetModal = () => {
    setStage('initial');
    setUserInput('');
    setResult(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-[1000] animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-gradient-to-br from-green-400 to-green-500 rounded-t-2xl w-full max-w-md max-h-[80vh] overflow-y-auto relative p-8 shadow-[0_-10px_25px_rgba(0,0,0,0.2)] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white/20 border-none rounded-full w-8 h-8 flex items-center justify-center text-white text-base hover:bg-white/30 transition"
        >
          ✕
        </button>

        <div className="text-white text-center">
          {stage === 'initial' && (
            <>
              <h2 className="text-lg font-bold mb-6 leading-snug">
                HALLO !! SEKARANG MOOD KAMU LAGI GIMANA NIH ? CERITA DONGG
              </h2>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ceritakan mood kamu sekarang..."
                rows={4}
                className="w-full p-4 rounded-xl text-base resize-y mb-4 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                onClick={handleSubmit}
                disabled={!userInput.trim()}
                className="bg-white text-green-500 font-bold px-8 py-3 rounded-full text-base transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Kirim
              </button>
            </>
          )}

          {stage === 'thinking' && (
            <div className="flex flex-col items-center py-8 gap-4">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p>AI sedang berpikir...</p>
            </div>
          )}

          {stage === 'result' && result && (
            <div className="text-left">
              <div className="bg-white/10 p-4 rounded-xl mb-4">
                <h3 className="text-lg font-bold mb-2">Mood:</h3>
                <p>{result.mood}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl mb-4">
                <h3 className="text-lg font-bold mb-2">Rekomendasi Makanan:</h3>
                <p>{result.recommendation}</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl mb-4">
                <h3 className="text-lg font-bold mb-2">Alasan:</h3>
                <p>{result.reason}</p>
              </div>
              <button
                onClick={resetModal}
                className="mt-4 w-full bg-white text-green-500 font-bold px-8 py-3 rounded-full text-base transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Tanya Lagi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getMoodAnalysis(text: string): MoodResult {
  return {
    mood: "Senang",
    recommendation: "Es krim cokelat",
    reason: "Karena bisa membantu meningkatkan hormon bahagia kamu!",
  };
}
