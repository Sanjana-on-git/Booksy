import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const MyLibrary = React.lazy(() => import('./pages/MyLibrary'));
const BookClubs = React.lazy(() => import('./pages/BookClubs'));
const SwapShelf = React.lazy(() => import('./pages/SwapShelf'));
const Profile = React.lazy(() => import('./pages/Profile'));
const QuoteFeed = React.lazy(() => import('./pages/QuoteFeed'));
const BookDetail = React.lazy(() => import('./pages/BookDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F9]">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-library" element={
              <PrivateRoute>
                <MyLibrary />
              </PrivateRoute>
            } />
            <Route path="/book-clubs" element={
              <PrivateRoute>
                <BookClubs />
              </PrivateRoute>
            } />
            <Route path="/swap-shelf" element={
              <PrivateRoute>
                <SwapShelf />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/quotes" element={<QuoteFeed />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;