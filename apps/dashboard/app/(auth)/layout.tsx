const AuthLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  return <main className="grid min-h-dvh place-items-center">{children}</main>
}

export default AuthLayout
