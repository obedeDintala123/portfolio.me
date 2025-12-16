import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/context/theme-provider'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    title: 'Obede Dintala – Portfolio',
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content:
          'Portfolio of Obede Dintala – Fullstack Developer creating amazing digital experiences.',
      },
      {
        name: 'keywords',
        content:
          'Portfolio, Web Developer, Fullstack, React, Node.js, JavaScript',
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
      { rel: 'preload', as: 'image', href: '/loading.svg' },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}
