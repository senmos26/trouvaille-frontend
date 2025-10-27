import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#FFD700] mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
        <p className="text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n&apos;existe pas.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-[#0A1128] rounded-full font-semibold hover:bg-[#E6C200] transition-all"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
