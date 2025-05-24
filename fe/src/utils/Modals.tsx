export interface MoodResult {
  mood: string;
  recommendation: string;
  reason: string;
}

export type ModalStage = 'initial' | 'thinking' | 'result';

export interface AIAvatarProps {
  isThinking: boolean;
}

export interface MoodAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UseIdleTimerReturn {
  isIdle: boolean;
  resetTimer: () => void;
}