import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      // Authenticated Route
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Route>
      // Allow Any
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
    </Route>
  )
);
