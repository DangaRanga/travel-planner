import { useState, useEffect } from 'react'
    import { X } from 'lucide-react'

    interface Trip {
      id: string
      destination: string
      start_date: string
      end_date: string
      description: string
    }

    export const TripList = () => {
      const [trips, setTrips] = useState<Trip[]>([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const fetchTrips = async () => {
          try {
            const { data, error } = await supabase
              .from('trips')
              .select('*')
              .order('start_date', { ascending: false })
            if (error) throw error
            if (data) setTrips(data)
          } catch (error) {
            console.error('Error fetching trips:', error)
          } finally {
            setLoading(false)
          }
        }
        fetchTrips()
      }, [])

      const handleDelete = async (id: string) => {
        try {
          const { error } = await supabase
            .from('trips')
            .delete()
            .eq('id', id)
          if (error) throw error
          setTrips(trips.filter(trip => trip.id !== id))
        } catch (error) {
          console.error('Error deleting trip:', error)
        }
      }

      if (loading) {
        return (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )
      }

      return (
        <div className="space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{trip.destination}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                </p>
                {trip.description && (
                  <p className="text-sm text-gray-500">{trip.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(trip.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )
    }
