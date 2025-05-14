'use client';

import { CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@iconify/react"
import { PageContent } from "@/components/PageContent";
import { ContentCard } from "@/components/ContentCard";

export default function DashboardPage() {
  return (
    <PageContent
      title="Dashboard"
      subtitle="Visualize o progresso dos seus estudos"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ContentCard
          contentClassName="p-4"
          header={
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Estudos
              </CardTitle>
              <Icon icon="heroicons:clock" className="h-4 w-4 text-muted-foreground" />
            </div>
          }
        >
          <div className="text-2xl font-bold">24h</div>
          <p className="text-xs text-muted-foreground">
            +2.1% em relação ao mês passado
          </p>
        </ContentCard>
        <ContentCard
          contentClassName="p-4"
          header={
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sessões Completas
              </CardTitle>
              <Icon icon="heroicons:check-circle" className="h-4 w-4 text-muted-foreground" />
            </div>
          }
        >
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            +12% em relação ao mês passado
          </p>
        </ContentCard>
        <ContentCard
          contentClassName="p-4"
          header={
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Média por Sessão
              </CardTitle>
              <Icon icon="heroicons:chart-bar" className="h-4 w-4 text-muted-foreground" />
            </div>
          }
        >
          <div className="text-2xl font-bold">2h</div>
          <p className="text-xs text-muted-foreground">
            +8% em relação ao mês passado
          </p>
        </ContentCard>
        <ContentCard
          contentClassName="p-4"
          header={
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conteúdos Estudados
              </CardTitle>
              <Icon icon="heroicons:book-open" className="h-4 w-4 text-muted-foreground" />
            </div>
          }
        >
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            +4 novos conteúdos este mês
          </p>
        </ContentCard>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ContentCard
          className="col-span-4"
          header={
            <CardHeader>
              <CardTitle>Histórico de Estudos</CardTitle>
            </CardHeader>
          }
        >
          <div className="h-[200px] bg-muted/10 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Gráfico em breve</span>
          </div>
        </ContentCard>
        <ContentCard
          className="col-span-3"
          header={
            <CardHeader>
              <CardTitle>Conteúdos Recentes</CardTitle>
            </CardHeader>
          }
        >
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-muted/10 flex items-center justify-center">
                  <Icon icon="heroicons:document-text" className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Conteúdo {i + 1}</p>
                  <p className="text-xs text-muted-foreground">2h de estudo</p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </PageContent>
  )
} 