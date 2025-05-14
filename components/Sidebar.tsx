'use client';

import * as React from "react";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    href: '/dashboard',
    icon: 'heroicons:home',
    label: 'Dashboard'
  },
  {
    href: '/timer',
    icon: 'heroicons:clock',
    label: 'Timer'
  },
  {
    href: '/conteudo',
    icon: 'heroicons:book-open',
    label: 'Conteúdo'
  }
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Card className={cn(
      'relative h-full min-h-screen transition-all duration-300',
      'border-r rounded-none',
      isCollapsed ? 'w-[80px]' : 'w-[280px]',
      'md:relative md:left-0',
      'fixed left-0 top-0 z-50',
      className
    )}>
      <CardHeader className={cn(
        "p-6",
        isCollapsed && "p-2"
      )}>
        <div className={cn(
          'flex items-center gap-3',
          isCollapsed && 'justify-center'
        )}>
          <div className='rounded-lg bg-primary p-2 shadow shrink-0'>
            <Icon 
              icon="heroicons:building-office-2" 
              className='h-5 w-5 text-primary-foreground' 
            />
          </div>
          {!isCollapsed && (
            <div className='flex flex-col'>
              <span className='font-semibold'>
                Sistema de Cadastro
              </span>
              <span className='text-xs text-muted-foreground'>
                Gerenciamento de Estudos
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -right-4 top-6",
          "h-8 w-8",
          "flex items-center justify-center",
          "rounded-full bg-background border shadow-sm",
          "hover:bg-accent hover:text-accent-foreground",
          "transition-transform",
          isCollapsed && "rotate-180"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Icon icon="heroicons:chevron-left" className="h-4 w-4" />
      </Button>

      <Separator />

      <CardContent className={cn(
        "flex-1",
        isCollapsed ? "p-2" : "p-2"
      )}>
        <nav className='space-y-1'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'active:scale-[0.98]',
                  isActive ? 
                    'bg-accent text-accent-foreground font-medium' : 
                    'text-muted-foreground'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon 
                  icon={item.icon} 
                  className={cn(
                    'h-4 w-4 shrink-0',
                    isActive && 'text-accent-foreground'
                  )} 
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </CardContent>

      <Separator />

      <CardFooter className={cn(
        "p-2",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full h-auto p-2",
                !isCollapsed && "justify-start",
                "gap-3"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">Marcus Silva</span>
                  <span className="text-xs text-muted-foreground">marcus@email.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon icon="heroicons:user" className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon="heroicons:cog-6-tooth" className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Icon icon="heroicons:arrow-left-on-rectangle" className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
} 