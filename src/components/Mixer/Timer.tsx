import { useState, useEffect } from 'react';
import { Timer as TimerIcon, Play, Pause, ArrowCounterClockwise } from 'phosphor-react';

interface TimerProps {
  onTimerEnd: () => void;
}

export const Timer = ({ onTimerEnd }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 min
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(25 * 60);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                setIsRunning(false);
                onTimerEnd();
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimerEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const setDuration = (mins: number) => {
    setIsRunning(false);
    setInitialTime(mins * 60);
    setTimeLeft(mins * 60);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-2 border-[#A3FF8C] rounded-2xl w-full max-w-lg bg-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-[#A3FF8C]">
        <TimerIcon size={32} />
        <h2 className="text-2xl font-bold">Focus Timer</h2>
      </div>

      <div className="text-6xl font-mono font-bold text-white">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-3 rounded-full text-black transition-colors ${isRunning ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-[#A3FF8C] hover:bg-[#8ee07a]'}`}
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? <Pause size={32} weight="fill" /> : <Play size={32} weight="fill" />}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors"
          title="Reset"
        >
          <ArrowCounterClockwise size={32} />
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        {[15, 25, 45, 60].map((mins) => (
            <button
                key={mins}
                onClick={() => setDuration(mins)}
                className={`px-3 py-1 rounded-lg border border-[#A3FF8C]/30 hover:bg-[#A3FF8C]/10 transition-colors text-sm ${initialTime === mins * 60 ? 'bg-[#A3FF8C]/20 text-[#A3FF8C]' : 'text-white/70'}`}
            >
                {mins}m
            </button>
        ))}
      </div>
    </div>
  );
};
