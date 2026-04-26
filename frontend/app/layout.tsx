import './globals.css'

export const metadata = {
  title: 'Gestion Scolaire V3',
  description: 'Application de gestion des étudiants en micro-services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  )
}
