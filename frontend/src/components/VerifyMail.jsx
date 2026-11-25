//Verify.jsx

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { status, setStatus } = useAuthContext();

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setStatus("Token not found...");
        return;
      }

      try {
        const res = await fetch("http://localhost:8001/user/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus("Email verified successfully");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("Email not verified");
          return;
        }
      } catch (error) {
        setStatus("Server error", error);
        return;
      }
    };
    verifyUser();
  }, [token, navigate]);

  return <div>{status}</div>;
}
export default VerifyEmail;
