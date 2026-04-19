import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="mt-2 text-sm text-muted-foreground">Page not found.</p>
      <Link
        to="/"
        className="mt-4 text-sm underline-offset-2 hover:underline"
      >
        ← Back home
      </Link>
    </div>
  )
}
