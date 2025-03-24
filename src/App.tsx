import { useState } from 'react'
    import { TripForm } from './components/TripForm'
    import { TripList } from './components/TripList'
    import { ChevronDown, Globe } from 'lucide-react'

    export default function App() {
      const [searchQuery, setSearchQuery] = useState('')

      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  <Globe className="h-8 w-8 text-blue-600 mr-2 inline-block" />
                  Travel Planner
                </h1>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-6">
              <TripForm />
              <TripList />
            </div>
          </main>
        </div>
      )
    }
