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
import { PageContent } from '@/components/PageContent';
import { ContentCard } from '@/components/ContentCard';
import { CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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
    <PageContent
      title="Timer de Estudos"
      subtitle="Gerencie seu tempo de estudo de forma eficiente com timer contínuo ou pomodoro"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <ContentCard 
          className="bg-secondary/50 shadow-none border"
          headerClassName="pb-2"
          contentClassName="px-4 sm:px-6 pt-2 pb-4 sm:pb-6"
          header={
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <CardTitle>Timer</CardTitle>
              <div className="flex gap-2">
                <Label htmlFor="subject" className="sr-only">Matéria</Label>
                <Select
                  value={selectedSubject?.id}
                  onValueChange={(value) => {
                    const subject = defaultSubjects.find(s => s.id === value);
                    if (subject) setSelectedSubject(subject);
                  }}
                  disabled={isRunning}
                >
                  <SelectTrigger id="subject" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Selecione a matéria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Matérias</SelectLabel>
                      {defaultSubjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                            {subject.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          }
          gradient={false}
        >
          <div className="grid gap-4 sm:gap-6">
            {/* Timer Controls Section */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="timer-type" className="sr-only">Tipo de Timer</Label>
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
                timerType === 'pomodoro' ? 'opacity-100 h-auto mt-2' : 'opacity-0 h-0 overflow-hidden'
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
            <div className="flex justify-center items-center py-4 sm:py-6">
              <div className="relative inline-block">
                <CircularProgress
                  value={timerType === 'continuous' 
                    ? (elapsedTime / timerDurations.continuous) * 100 
                    : (time / timerDurations.pomodoro[pomodoroMode]) * 100}
                  size={200}
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
                    "text-4xl sm:text-5xl",
                    timerType === 'continuous' ? 'text-blue-500' : 'text-red-500'
                  )}
                />
              </div>
            </div>

            {/* Warning Card when running */}
            {isRunning && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
                <Icon icon="heroicons:exclamation-triangle" className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Timer em andamento</p>
                  <p className="text-xs mt-0.5 text-amber-700 dark:text-amber-400">Parar o timer irá encerrar a sessão atual de estudo</p>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-2 sm:mt-4">
              {!isRunning ? (
                <Button 
                  onClick={handleStart} 
                  disabled={!selectedSubject}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="lg"
                >
                  <Icon icon="heroicons:play" className="w-6 h-6 mr-2" />
                  <span className="text-base">Iniciar</span>
                </Button>
              ) : (
                <Button 
                  onClick={handlePause}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  size="lg"
                >
                  <Icon icon="heroicons:pause" className="w-6 h-6 mr-2" />
                  <span className="text-base">Pausar</span>
                </Button>
              )}

              <AlertDialog open={showStopDialog} onOpenChange={setShowStopDialog}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="bg-red-500 hover:bg-red-600 text-white"
                    disabled={!isRunning && !currentSession}
                    size="lg"
                  >
                    <Icon icon="heroicons:stop" className="w-6 h-6 mr-2" />
                    <span className="text-base">Parar</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[90vw] sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-600 flex items-center gap-2">
                      <Icon icon="heroicons:exclamation-triangle" className="h-5 w-5" />
                      Deseja parar o timer?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação irá encerrar a sessão atual e salvá-la com o tempo acumulado até agora. O timer será resetado.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleStop} 
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Sim, parar timer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </ContentCard>

        {/* Study Sessions List */}
        <div className="w-full">
          <StudySessionList sessions={sessions} />
        </div>
      </div>
    </PageContent>
  );
} 