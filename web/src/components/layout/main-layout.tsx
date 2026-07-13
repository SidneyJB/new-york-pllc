import { Navbar } from './navbar'
import { Footer } from './footer'
import { MobileStickyCta } from './mobile-sticky-cta'
import { LayoutProps } from '@/types'

interface MainLayoutProps extends LayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children, title, description }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  )
}
