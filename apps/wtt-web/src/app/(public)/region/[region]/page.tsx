import { getByRegion } from '@/data/packages'
import PackageCard from '@/components/PackageCard'

const stateNames: Record<string, string> = {
  'telangana': 'Telangana', 'andhra-pradesh': 'Andhra Pradesh', 'tamil-nadu': 'Tamil Nadu',
  'karnataka': 'Karnataka', 'kerala': 'Kerala', 'uttar-pradesh': 'Uttar Pradesh',
  'uttarakhand': 'Uttarakhand', 'rajasthan': 'Rajasthan', 'maharashtra': 'Maharashtra',
  'odisha': 'Odisha', 'west-bengal': 'West Bengal',
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params
  const state = stateNames[region] || region
  const pkgs = getByRegion(state)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-5xl font-semibold text-gray-900 mb-2">🛕 {state}</h1>
        <p className="text-gray-500">Sacred pilgrimage packages in {state}</p>
      </div>
      {pkgs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pkgs.map(p => <PackageCard key={p.slug} pkg={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Packages for {state} coming soon.</p>
          <a href="/plan-trip" className="mt-4 inline-block text-saffron hover:underline font-medium">Request a custom package →</a>
        </div>
      )}
    </div>
  )
}
