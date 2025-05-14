"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Sidebar, useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "heroicons:home",
  },
  {
    title: "Timer",
    href: "/timer",
    icon: "heroicons:clock",
  },
  {
    title: "Conteúdo",
    href: "/conteudo",
    icon: "heroicons:book-open",
  },
]

interface AppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "inset"
}

export function AppSidebar({
  className,
  variant = "default",
}: AppSidebarProps) {
  const pathname = usePathname()
  const { expanded } = useSidebar()

  return (
    <Sidebar expanded={expanded} variant={variant} className={className}>
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-[60px] items-center px-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-semibold",
              !expanded && "justify-center"
            )}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Icon 
                icon="heroicons:building-office-2" 
                className="h-4 w-4 text-primary-foreground" 
              />
            </div>
            {expanded && (
              <span className="text-lg font-semibold">
                Sistema
              </span>
            )}
          </Link>
        </div>
        <ScrollArea className="flex-1 overflow-hidden">
          <div className="flex flex-col gap-2 p-2">
            <nav className="grid gap-1">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn(
                    "justify-start",
                    !expanded && "justify-center px-2"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <Icon icon={item.icon} className="mr-2 h-4 w-4" />
                    {expanded && <span>{item.title}</span>}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </Sidebar>
  )
} 