import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { SidebarDrawerProvider } from '@/context/SidebarDrawerContext'
import { makeServer } from '@/services/mirage'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '@/services/queryClient'
import { AuthProvider } from '@/context/AuthContext'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
