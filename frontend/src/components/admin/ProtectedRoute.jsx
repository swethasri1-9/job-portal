import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'recruiter') {
      navigate("/unauthorized"); // optional route
    } else if (!user) {
      navigate("/login");
    }
  }, [user]); // ✅ watch user

  // While user is undefined/null → don't show anything
  if (!user || user.role !== 'recruiter') return null;

  return children;
};

export default ProtectedRoute;
