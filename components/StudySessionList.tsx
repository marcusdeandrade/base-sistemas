'use client';

import { StudySession } from '@/types/study';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Icon } from '@iconify/react';

interface StudySessionListProps {
  sessions: StudySession[];
}

export function StudySessionList({ sessions }: StudySessionListProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sessões de Estudo</h2>
        <span className="text-sm text-muted-foreground">
          {sessions.length} sessões
        </span>
      </div>
      
      <div className="space-y-3">
        {sessions.map((session) => (
          <Card key={session.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${session.subject.color}`} />
                <div>
                  <h3 className="font-medium">{session.subject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(session.startTime, { 
                      addSuffix: true,
                      locale: ptBR 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{formatTime(session.duration)}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.type === 'pomodoro' ? 'Pomodoro' : 'Timer Corrido'}
                  </p>
                </div>
                
                <Icon 
                  icon={session.completed ? 'heroicons:check-circle' : 'heroicons:clock'} 
                  className={`w-5 h-5 ${session.completed ? 'text-green-500' : 'text-muted-foreground'}`}
                />
              </div>
            </div>
          </Card>
        ))}
        
        {sessions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Icon icon="heroicons:clock" className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma sessão de estudo registrada</p>
          </div>
        )}
      </div>
    </div>
  );
} 