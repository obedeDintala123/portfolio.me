import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import type React from 'react'
import { ThemeProvider } from '@/context/theme-provider'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Portfolio of Obede Dintala – Fullstack Developer creating amazing digital experiences.',
      },
      {
        name: 'keywords',
        content:
          'Portfolio, Web Developer, Fullstack, React, Node.js, JavaScript, Software Developer',
      },
      { name: 'author', content: 'Obede Dintala' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Obede Dintala – Portfolio' },
      {
        property: 'og:description',
        content:
          'Portfolio of Obede Dintala – Fullstack Developer creating amazing digital experiences.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://your-portfolio-domain.com' },
      { property: 'og:image', content: '/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Obede Dintala – Portfolio' },
      {
        name: 'twitter:description',
        content:
          'Portfolio of Obede Dintala – Fullstack Developer creating amazing digital experiences.',
      },
      { name: 'twitter:image', content: '/og-image.png' },
    ],
    links: [
      { rel: 'icon', href: '/x-1.svg' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
      },
      {
        rel: 'preload',
        as: 'image',
        href: '/loading.svg',
        type: 'image/svg+xml',
      },
    ],
    title: 'Obede Dintala – Portfolio',
  }),
  component: () => (
    <RootDocument>
      <Outlet />
      <TanStackDevtools />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>{/* O Head é gerado pelo createRootRouteWithContext */}</head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
