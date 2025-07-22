import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "student") {
      navigate("/unauthorized");
    }
  }, [user]);

  if (!user || user.role !== "student") return null;
  return children;
};

export default StudentRoute;
