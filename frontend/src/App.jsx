import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

import HomePage from './pages/home/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import HistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/NotFoundPage'

import Footer from './components/footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'

function App() {

  const {user, isCheckingAuth, authCheck} = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth) {
    return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>

      <Toaster />
      <Footer />  
    </>
  )
}

export default App
