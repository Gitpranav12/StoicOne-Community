
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DashboardLayout from "./components/Dashboard";
// import Home from "./pages/Home";
// import Questions from "./pages/Questions";
// import Tags from "./pages/Tags";
// import Chat from "./pages/Chat";
import AdminDashboardPage from "./components/admin/AdminDashboardPage";
import UsersPage from "./components/user/UsersPage";
import DashboardHome from "./components/home/Dashboardhome";
import ModeratorPage from "./components/moderator/ModeratorPage";
import AskQuestionWrapper from "./components/ask_question/AskQuestionWrapper";
import QuestionsPage from "./components/questionlist/QuestionsPage";
import QuestionDetailsWrapper from "./components/questionlist/QuestionDetailsWrapper";
import AiAssistant from "./components/AiAssistant";
import Signup from "./pages/Signup/index";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login/index";
import TagsPage from "./components/tags/TagsPage";
import Articles from "./components/Articles";
import UserProfile from "./components/UserProfilePage/pages/UserProfile";
import { UserProvider } from "./components/UserProfilePage/context/UserContext";
import HowToAsk from './components/help/HowToAsk';
import HowToAnswer from './components/help/HowToAnswer';
import WhyEditPosts from './components/help/WhyEditPosts';
import ExploreCollectives from './components/collectives/ExploreCollectives';



export default function App() {


  return (
    <UserProvider>
      <Router>

        {/* <Routes>
         
          <Route path="/questions" element={<Questions />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/chat" element={<Chat />} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* home */}
          <Route path="/dashboard" element={<DashboardHome />} />
          {/* Admin Dashboard with nested tabs */}
          <Route path="/admin/*" element={<AdminDashboardPage />} />
          {/* User */}
          <Route path="/user" element={<UsersPage />} />
          <Route path="/moderator" element={<ModeratorPage />} />
          <Route path="/askquestion" element={<AskQuestionWrapper />} />
          <Route path="/questions" element={<QuestionsPage />} />
          {/* NEW: Question Details */}
          <Route path="/questions/:id" element={<QuestionDetailsWrapper />} />
          <Route path="/AiAssistant" element={<AiAssistant />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/Articles" element={<Articles />} />
          {/* User profile main page */}
          <Route path="/profile/*" element={<UserProfile />} />

          {/* Help Section */}
          <Route path="/help/how-to-ask" element={<HowToAsk />} />
          <Route path="/help/how-to-answer" element={<HowToAnswer />} />
          <Route path="/help/editing" element={<WhyEditPosts />} />
          {/* Explore all collectives */}
          <Route path="/collectives" element={<ExploreCollectives />} />

        </Routes>



      </Router>
    </UserProvider>

  );
}
// import { Routes, Route } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ModeratorPage from "./pages/ModeratorPage";
// import MemberPage from "./pages/MemberPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <Routes>
//         
//         <Route
//           path="/moderator"
//           element={
//             <ProtectedRoute roles={["Moderator"]}>
//               <ModeratorPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;
