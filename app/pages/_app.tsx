import { AppProps, ErrorComponent, Router } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"

import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      <ThemeProvider theme={theme}>
        <CSSReset />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps): JSX.Element {
  if (error?.name === "AuthenticationError") {
    resetErrorBoundary()
    Router.push("/login")
    return <></>
  } else if (error?.name === "AuthorizationError") {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
