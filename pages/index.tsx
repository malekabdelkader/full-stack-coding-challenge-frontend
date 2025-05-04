import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const [query, setQuery] = useState<string>('')
  const [debounceQuery, setDebounceQuery] = useState<string>('')

  useEffect(()=>{
   const handler= setTimeout(()=>{
      setQuery(debounceQuery)
    },600)

    return ()=>{
      clearInterval(handler)
    }
  },[debounceQuery])

  const airports = useApiData<Airport[]>(`/api/airports/${query}`, [], [query])

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Code Challenge: Airports</h1>

      <h2 className="mt-10 text-xl font-semibold">All Airports</h2>

      <div className="mt-1 relative shadow-sm">
        <input
          type="text"
          name="query"
          id="query"
          className="focus:ring-blue-600 focus:border-blue-600 block w-full sm:text-sm border-gray-300 text-gray-800 rounded bg-gray-50 p-3"
          placeholder="Search by name, IATA, city, or country"
          value={debounceQuery}
          onChange={(e) => setDebounceQuery(e.target.value)}
        />
      </div>

      <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4'>
        {airports.map((airport) => (
          <Link
            className="p-5 mt-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
            href={`/airports/${airport.iata.toLowerCase()}`}
            key={airport.iata}
          >
            <span>
              {airport.name}, {airport.city}
            </span>
            <div className="ml-auto mt-2 text-gray-500">{airport.country}</div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Page
