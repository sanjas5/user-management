import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import UserDetails from './components/UserDetails'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
