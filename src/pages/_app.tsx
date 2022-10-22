import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Logger,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
