import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// function VerifyEmail() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get("token");

//   const [status, setStatus] = useState("Verifying your email...");

//   useEffect(() => {
//     const verifyUser = async () => {
//       if (!token) {
//         setStatus("No token found in URL");
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:8001/user/verify", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ backend ke according
//           },
//         });

//         const data = await res.json();

//         console.log("STATUS:", res.status);
//         console.log("RESPONSE:", data);

//         if (res.ok && data.success) {
//           setStatus("Email verified successfully! Redirecting...");
//           setTimeout(() => {
//             navigate("/login");
//           }, 3000);
//         } else {
//           setStatus(data.message || "Verification failed");
//         }
//       } catch (err) {
//         console.error("ERROR:", err);
//         setStatus("Network error. Please try again.");
//       }
//     };

//     verifyUser();
//   }, [token, navigate]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>{status}</h2>
//     </div>
//   );
// }

// export default VerifyEmail;

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Veryfying...");
  const token = searchParams.get("token");
  const navigate = useNavigate();

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
