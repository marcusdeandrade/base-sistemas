'use client';

import { PageTitle } from '@/components/PageTitle';
import { Card } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface Content {
  id: string;
  title: string;
  subject: string;
  type: 'video' | 'document' | 'exercise';
  status: 'pending' | 'in-progress' | 'completed';
  lastAccessed: string;
}

const mockContents: Content[] = [
  {
    id: '1',
    title: 'Introdução à Álgebra Linear',
    subject: 'Matemática',
    type: 'video',
    status: 'completed',
    lastAccessed: '2024-03-20',
  },
  {
    id: '2',
    title: 'Equações Diferenciais',
    subject: 'Matemática',
    type: 'document',
    status: 'in-progress',
    lastAccessed: '2024-03-19',
  },
  {
    id: '3',
    title: 'Exercícios de Cálculo I',
    subject: 'Matemática',
    type: 'exercise',
    status: 'pending',
    lastAccessed: '2024-03-18',
  },
];

export default function ConteudoPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1400px]">
      <PageTitle 
        title="Conteúdo"
        subtitle="Gerencie e acompanhe seu material de estudo"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card/50 to-card shadow-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Icon 
                icon="heroicons:book-open" 
                className="h-6 w-6 text-primary" 
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Conteúdos</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card/50 to-card shadow-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Icon 
                icon="heroicons:clock" 
                className="h-6 w-6 text-primary" 
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card/50 to-card shadow-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Icon 
                icon="heroicons:check-badge" 
                className="h-6 w-6 text-primary" 
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
              <p className="text-2xl font-bold">16</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="bg-gradient-to-br from-card/50 to-card shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Conteúdos Recentes</h3>
              <p className="text-sm text-muted-foreground">
                Lista dos últimos conteúdos acessados
              </p>
            </div>
            <Button>
              <Icon icon="heroicons:plus" className="h-5 w-5 mr-2" />
              Novo Conteúdo
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Matéria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContents.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>{content.subject}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {content.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      content.status === 'completed' ? 'default' :
                      content.status === 'in-progress' ? 'secondary' :
                      'outline'
                    }
                    className="capitalize"
                  >
                    {content.status === 'in-progress' ? 'Em Andamento' :
                     content.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>{content.lastAccessed}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Icon icon="heroicons:ellipsis-vertical" className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 