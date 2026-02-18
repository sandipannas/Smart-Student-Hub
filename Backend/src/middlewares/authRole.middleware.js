//Role based authentication

export const authSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user) {//user database comes from authJWT function as a req after authentication
      return res.status(401).json({ message: "User unauthenticated" });//if user is NULL that means no authentication done
    }

    if (req.user.role !== "superAdmin") {//checks for superAdmin access if not return 403
      return res.status(403).json({ message: "Forbidden: Requires Super Admin role" });
    }
    //if superAdmin falls to next
    next();
  } catch (err) {
    console.error("Error in Super-admin auth:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User unauthenticated" });
    }

    if (req.user.role !== "admin") {//checks for Admin access if not return 403
      return res.status(403).json({ message: "Forbidden: Requires Admin role" });
    }
    //if Admin falls to next
    next();
  } catch (err) {
    console.error("Error in Admin auth:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authStudent = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User unauthenticated" });
    }

    if (req.user.role !== "student") {//checks for student access if not return 403
      return res.status(403).json({ message: "Forbidden: Requires Student role" });
    }
    //if student falls to next
    next();
  } catch (err) {
    console.error("Error in Student auth:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};