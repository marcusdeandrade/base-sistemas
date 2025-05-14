'use client';

import { StudySession } from '@/types/study';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Icon } from '@iconify/react';
import { ContentCard } from '@/components/ContentCard';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { useSidebar } from '@/lib/sidebar-context';

interface StudySessionListProps {
  sessions: StudySession[];
}

export function StudySessionList({ sessions }: StudySessionListProps) {
  const { isMobile } = useSidebar();
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };

  return (
    <ContentCard
      className="bg-secondary/50 shadow-none border"
      headerClassName="pb-2"
      contentClassName="px-4 sm:px-6 pt-2 pb-4 sm:pb-6"
      header={
        <div className="flex flex-col space-y-1.5">
          <CardTitle>Sessões de Estudo</CardTitle>
          <CardDescription>
            {sessions.length > 0 
              ? `${sessions.length} ${sessions.length === 1 ? 'sessão' : 'sessões'} de estudo registrada${sessions.length === 1 ? '' : 's'}`
              : "Nenhuma sessão de estudo registrada ainda"
            }
          </CardDescription>
        </div>
      }
      gradient={false}
    >
      <div className="grid gap-3">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.id} className="p-3 rounded-md border bg-card/50 hover:bg-card/80 transition-colors">
              <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${session.subject.color} shadow-sm`} />
                  <div>
                    <h3 className="font-medium">{session.subject.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(session.startTime, { 
                        addSuffix: true,
                        locale: ptBR 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-3 ${isMobile ? 'ml-6 mt-1' : ''}`}>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatTime(session.duration)}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.type === 'pomodoro' ? 'Pomodoro' : 'Timer Corrido'}
                    </p>
                  </div>
                  
                  <div className={`flex items-center justify-center`}>
                    <Icon 
                      icon={session.completed ? 'heroicons:check-circle' : 'heroicons:clock'} 
                      className={`w-5 h-5 ${session.completed ? 'text-green-500' : 'text-muted-foreground'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-muted-foreground">
            <div className="h-10 w-10 rounded-full bg-muted/20 mb-3 flex items-center justify-center">
              <Icon icon="heroicons:clock" className="w-5 h-5 opacity-60" />
            </div>
            <p className="text-sm text-center">Comece um novo timer para registrar sua sessão de estudo</p>
          </div>
        )}
      </div>
    </ContentCard>
  );
} 