// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.tsx';
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 请求失败时自动重试 1 次（防谷歌服务器偶尔波动）
      refetchOnWindowFocus: false, // 切换浏览器标签页时，不要悄悄重新发请求
    },
  },
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={
          import.meta.env
            .VITE_GOOGLE_CLIENT_ID
        }
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  // </StrictMode>,
)
