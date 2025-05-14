'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudySessionList } from '@/components/StudySessionList';
import { Subject, StudySession, defaultSubjects } from '@/types/study';
import { PageTitle } from '@/components/PageTitle';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  progressClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
  label: string;
}

const CircularProgress = ({
  value,
  className,
  progressClassName,
  labelClassName,
  showLabel,
  size = 200,
  strokeWidth = 10,
  label
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${size * 1.25}`;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
        className="relative"
      >
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset="0"
          className={cn("stroke-primary/25", className)}
        />
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDashoffset={percentage}
          fill="transparent"
          strokeDasharray={circumference}
          className={cn(
            "stroke-primary transition-all duration-300",
            progressClassName
          )}
        />
      </svg>
      {showLabel && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center flex-col gap-1",
          labelClassName
        )}>
          <span className="text-4xl font-bold">{label}</span>
        </div>
      )}
    </div>
  );
};

type TimerMode = 'pomodoro' | 'short-break' | 'long-break';
type TimerType = 'continuous' | 'pomodoro';

export default function TimerPage() {
  const [time, setTime] = useState(25 * 60); // 25 minutes for pomodoro
  const [isRunning, setIsRunning] = useState(false);
  const [showStopDialog, setShowStopDialog] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>('continuous');
  const [pomodoroMode, setPomodoroMode] = useState<TimerMode>('pomodoro');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // Add elapsed time state for continuous mode

  const timerDurations = {
    continuous: 60 * 60, // 1 hour
    pomodoro: {
      'pomodoro': 25 * 60,
      'short-break': 5 * 60,
      'long-break': 15 * 60,
    },
  };

  // Initialize timer based on type
  useEffect(() => {
    if (timerType === 'continuous') {
      setElapsedTime(0);
      setTime(0);
    } else {
      setTime(timerDurations.pomodoro[pomodoroMode]);
    }
  }, [timerType, pomodoroMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        if (timerType === 'continuous') {
          setElapsedTime((prev) => {
            if (prev >= timerDurations.continuous) {
              setIsRunning(false);
              if (currentSession) {
                completeCurrentSession();
              }
              return timerDurations.continuous;
            }
            return prev + 1;
          });
          setTime((prev) => prev + 1);
        } else if (time > 0) {
          setTime((prevTime) => {
            if (prevTime <= 1) {
              setIsRunning(false);
              if (timerType === 'pomodoro') {
                handlePomodoroComplete();
              }
              if (currentSession) {
                completeCurrentSession();
              }
              return 0;
            }
            return prevTime - 1;
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time, timerType]);

  const completeCurrentSession = () => {
    if (currentSession) {
      const completedSession: StudySession = {
        ...currentSession,
        endTime: new Date(),
        completed: true,
        duration: currentSession.duration + (timerDurations.pomodoro[pomodoroMode] - time),
      };
      setSessions(prev => [...prev, completedSession]);
      setCurrentSession(null);
    }
  };

  const handlePomodoroComplete = () => {
    if (pomodoroMode === 'pomodoro') {
      setPomodoroMode('short-break');
      setTime(timerDurations.pomodoro['short-break']);
    } else {
      setPomodoroMode('pomodoro');
      setTime(timerDurations.pomodoro['pomodoro']);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!selectedSubject) {
      return;
    }
    setIsRunning(true);
    if (!currentSession) {
      const newSession: StudySession = {
        id: Date.now().toString(),
        subject: selectedSubject,
        startTime: new Date(),
        endTime: new Date(),
        duration: 0,
        type: timerType,
        completed: false,
      };
      setCurrentSession(newSession);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        duration: currentSession.duration + (timerDurations.pomodoro[pomodoroMode] - time),
      });
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (currentSession) {
      completeCurrentSession();
    }
    if (timerType === 'continuous') {
      setElapsedTime(0);
      setTime(0);
    } else {
      setTime(timerDurations.pomodoro[pomodoroMode]);
    }
    setShowStopDialog(false);
  };

  const handleTimerTypeChange = (type: TimerType) => {
    if (isRunning) {
      return; // Don't allow changing timer type while running
    }
    setTimerType(type);
    if (type === 'continuous') {
      setElapsedTime(0);
      setTime(0);
    } else {
      setPomodoroMode('pomodoro');
      setTime(timerDurations.pomodoro['pomodoro']);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1400px]">
      <PageTitle 
        title="Timer de Estudos"
        subtitle="Gerencie seu tempo de estudo de forma eficiente com timer contínuo ou pomodoro"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="w-full p-4 sm:p-8 bg-gradient-to-br from-card/50 to-card shadow-xl">
          <div className="space-y-4">
            {/* Subject Selection */}
            <div className="h-[40px]">
              <Select
                value={selectedSubject?.id}
                onValueChange={(value) => {
                  const subject = defaultSubjects.find(s => s.id === value);
                  if (subject) setSelectedSubject(subject);
                }}
                disabled={isRunning}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a matéria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Matérias</SelectLabel>
                    {defaultSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${subject.color}`} />
                          {subject.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Timer Controls Section */}
            <div className="min-h-[80px] flex flex-col gap-2">
              {/* Timer Type Selection */}
              <Tabs 
                value={timerType}
                className="w-full" 
                onValueChange={(value: string) => handleTimerTypeChange(value as TimerType)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="continuous" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500">
                    Timer Corrido
                  </TabsTrigger>
                  <TabsTrigger value="pomodoro" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
                    Pomodoro
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Pomodoro Mode Selection */}
              <div className={cn(
                "transition-all duration-300",
                timerType === 'pomodoro' ? 'opacity-100 h-auto' : 'opacity-0 h-0'
              )}>
                <Tabs
                  value={pomodoroMode}
                  onValueChange={(value: string) => {
                    if (!isRunning) {
                      setPomodoroMode(value as TimerMode);
                      setTime(timerDurations.pomodoro[value as TimerMode]);
                    }
                  }}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger 
                      value="pomodoro"
                      disabled={isRunning}
                      className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500"
                    >
                      Foco
                    </TabsTrigger>
                    <TabsTrigger 
                      value="short-break"
                      disabled={isRunning}
                      className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
                    >
                      Pausa Curta
                    </TabsTrigger>
                    <TabsTrigger 
                      value="long-break"
                      disabled={isRunning}
                      className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500"
                    >
                      Pausa Longa
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Timer Display */}
            <div className="flex justify-center items-center -mt-2">
              <CircularProgress
                value={timerType === 'continuous' 
                  ? (elapsedTime / timerDurations.continuous) * 100 
                  : (time / timerDurations.pomodoro[pomodoroMode]) * 100}
                size={280}
                strokeWidth={16}
                showLabel
                label={formatTime(timerType === 'continuous' ? elapsedTime : time)}
                className={cn(
                  timerType === 'continuous' ? 'stroke-blue-500/25' : 'stroke-red-500/25'
                )}
                progressClassName={cn(
                  "transition-all duration-300",
                  timerType === 'continuous' ? 'stroke-blue-500' : 'stroke-red-500'
                )}
                labelClassName={cn(
                  "text-5xl",
                  timerType === 'continuous' ? 'text-blue-500' : 'text-red-500'
                )}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/20 text-emerald-500 border border-emerald-600/60 shadow-none w-[140px]"
                  disabled={!selectedSubject}
                >
                  <Icon icon="heroicons:play" className="w-6 h-6 mr-2" />
                  Iniciar
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  size="lg"
                  className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/20 text-amber-500 border border-amber-600/60 shadow-none w-[140px]"
                >
                  <Icon icon="heroicons:pause" className="w-6 h-6 mr-2" />
                  Pausar
                </Button>
              )}

              <AlertDialog open={showStopDialog} onOpenChange={setShowStopDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/20 text-red-500 border border-red-600/60 shadow-none w-[140px]"
                  >
                    <Icon icon="heroicons:stop" className="w-6 h-6 mr-2" />
                    Parar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja parar o timer?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação irá resetar o timer. Você tem certeza que deseja continuar?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleStop} className="bg-destructive hover:bg-destructive/90">
                      Sim, parar timer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>

        {/* Study Sessions List */}
        <div className="w-full">
          <StudySessionList sessions={sessions} />
        </div>
      </div>
    </div>
  );
} 