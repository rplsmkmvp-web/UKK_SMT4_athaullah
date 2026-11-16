import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Bell } from "lucide-react"
import { Pattern as Profile } from "@/components/app-profile" 
import { Pattern as Pencaria } from "@/components/app-pencaria"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">Panel Admin</span>
          </div>

         
          <div className="flex-1 max-w-md mx-4">
            <Pencaria />
          </div>

        <div className="flex items-center justify-center gap-4 text-sm">
  <Bell className="size-4 text-muted-foreground cursor-pointer" aria-label="Notifikasi" />
  <Profile />
</div>


        </header>
        <div className="flex-1 p-4 sm:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}