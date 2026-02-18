import isLoggedIn from "./useLogged";
import { useEffect } from "react";
import axios from "axios";
import useFacultyStore from "./useFacultyStore";
import useStudentStore from "./useStudentStore";


export default function UserData() {
  const isLogged = isLoggedIn((state) => state.isLogged);
  const role = localStorage.getItem("role");
  const admindetails=useFacultyStore((state)=>state.setUser)
  const student=useStudentStore((state)=>state.setStudent)
  useEffect(() => {
    const Data = async () => {
      try {
        const res = await axios.get("https://cognitivecampus.onrender.com/api/auth/user/me", {
          withCredentials: true,
        });

        if (res.status === 200) {
          console.log(res.data);
          if(role==="admin")
            admindetails(res.data.admin)
          if(role==="student")
            student(res.data.student)
        }
      } catch (err: any) {
        if (err.response) {
          console.error("Error Message:", err.response.data.message);
          alert("Network error");
        } else {
          console.error("Unexpected Error:", err.message);
        }
      }
    };

    if (isLogged) {
      Data();
    }
  }, [isLogged]);

 

  return null;
}
