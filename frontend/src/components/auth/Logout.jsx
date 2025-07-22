// src/components/auth/Logout.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.get(`${USER_API_END_POINT}/logout`, {
          withCredentials: true,
        });
        dispatch(setUser(null)); // ✅ clear Redux user
        toast.success("Logged out successfully.");
        navigate("/login");
      } catch (error) {
        toast.error("Error logging out.");
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return null; // No UI, just triggers logout
};

export default Logout;
