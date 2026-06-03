import Link from 'next/link'
import { api } from '@/lib/api'
import type { Package } from '@/types'

async function getPackages(region?: string): Promise<Package[]> {
  try {
    const q = region ? `?region=${region}` : ''
    return await api.get<Package[]>(`/packages${q}`)
  } catch {
    return []
  }
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; days?: string }>
}) {
  const params = await searchParams
  const packages = await getPackages(params.region)

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-hero text-white py-12 px-6 text-center">
        <h1 className="text-3xl font-bold">All Packages</h1>
        <p className="text-gray-300 mt-2">Choose your pilgrimage journey</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex gap-3 flex-wrap mb-8">
          <Link href="/packages" className="px-4 py-1.5 rounded-full border text-sm hover:border-saffron hover:text-saffron transition">
            All
          </Link>
          {['Telangana', 'Andhra Pradesh'].map((r) => (
            <Link
              key={r}
              href={`/packages?region=${r}`}
              className={`px-4 py-1.5 rounded-full border text-sm transition ${
                params.region === r ? 'bg-saffron text-white border-saffron' : 'hover:border-saffron hover:text-saffron'
              }`}
            >
              {r}
            </Link>
          ))}
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No packages available right now.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Link key={pkg.id} href={`/packages/${pkg.slug}`}>
                <div className="border rounded-xl overflow-hidden hover:shadow-lg transition h-full flex flex-col">
                  {pkg.coverImageUrl && (
                    <img src={pkg.coverImageUrl} alt={pkg.nameEn} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{pkg.nameEn}</h3>
                    {pkg.nameTe && <p className="text-sm text-gray-500">{pkg.nameTe}</p>}
                    <p className="text-sm text-gray-500 mt-1">{pkg.region} · {pkg.durationDays}D/{pkg.durationNights}N</p>
                    {pkg.templesCovered && pkg.templesCovered.length > 0 && (
                      <p className="text-xs text-gray-400 mt-2">🛕 {pkg.templesCovered.slice(0, 3).join(', ')}</p>
                    )}
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <p className="text-saffron font-bold text-lg">
                        ₹{pkg.pricePerPerson}
                        <span className="text-gray-400 font-normal text-sm"> / person</span>
                      </p>
                      {pkg.rating && parseFloat(pkg.rating) > 0 && (
                        <span className="text-sm text-gray-500">⭐ {pkg.rating}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
