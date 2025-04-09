import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { mainnet, bsc, polygon, arbitrum } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Setup queryClient
const queryClient = new QueryClient()

// Use a placeholder project ID for development
const projectId = process.env.WALLET_CONNECT_PROJECT_ID || ''

// Create a metadata object
const metadata = {
  name: 'BSC Yield Farm',
  description: 'Yield Farm DApp with Dark Theme',
  url: 'https://yield-farm-dapp.example.com',
  icons: ['https://yield-farm-dapp.example.com/logo.png']
}

// Set the networks
const networks = [bsc]

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false // Set to false for better client-side wallet detection
})

// Create AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    socials: false,
    email: false
  }
})

// Export provider component
export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}