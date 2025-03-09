import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Define the type for our API data
interface ApiData {
  message: string;
  timestamp: string;
  data: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState<ApiData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from our API endpoint
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/data')
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const data: ApiData = await response.json()
        setApiData(data)
      } catch (err) {
        console.error('Failed to fetch API data:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Cloudflare Pages</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      {/* Display API data */}
      <div className="api-section">
        <h2>API Data from Cloudflare Functions</h2>
        {loading && <p>Loading data...</p>}
        {error && <p className="error">Error: {error}</p>}
        {apiData && (
          <div className="api-data">
            <p className="message">{apiData.message}</p>
            <p className="timestamp">Timestamp: {apiData.timestamp}</p>
            <ul className="data-list">
              {apiData.data.map(item => (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
