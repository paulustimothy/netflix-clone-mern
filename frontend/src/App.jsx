import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

import HomePage from './pages/home/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
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
      </Routes>

      <Toaster />
      <Footer />  
    </>
  )
}

export default App
