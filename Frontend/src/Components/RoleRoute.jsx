import { Navigate } from "react-router-dom";
import { getAuth } from "../auth";
const GetUserRole = ({ children, role }) => {
    const auth = getAuth();
    if (!auth || !auth.role) {
        return <Navigate to="/" replace />;
    }
    if (auth.role !== role) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
};
export default GetUserRole;
