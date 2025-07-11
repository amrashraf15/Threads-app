import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import Topbar from "./components/Topbar.jsx";
import LeftSidebar from "./components/LeftSidebar.jsx";
import RightSidebar from "./components/RightSidebar.jsx";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Bottombar from "./components/Bottombar.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import CreateThreadPage from "./pages/CreateThreadPage.jsx";
import ThreadPage from "./pages/ThreadPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ActivityPage from "./pages/ActivityPage.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <Topbar />

      {/* Main layout after authentication */}
      <div className="flex pt-20">
        <LeftSidebar />
        
        <main className="flex-1  min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white">
          <Routes>
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/users/:id" element={authUser ? <AuthorPage/> : <Navigate to="/" />}/>
            <Route path="/create-thread" element={authUser ? <CreateThreadPage /> :<Navigate to="/" /> } />
            <Route path="/threads/:threadId" element={authUser ? <ThreadPage /> :<Navigate to="/" /> } />
            <Route path="/search" element={authUser ? <SearchPage /> :<Navigate to="/" /> } />
            <Route path="/activity" element={authUser ? <ActivityPage /> :<Navigate to="/" /> } />
          </Routes>
        </main>

        {authUser && <RightSidebar />}
      </div>
      <Bottombar/>
      <Toaster />
    </div>
  );
};

export default App;
