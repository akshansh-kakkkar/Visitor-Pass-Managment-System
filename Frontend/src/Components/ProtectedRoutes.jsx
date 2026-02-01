import { getAuth } from "../auth";
import { Navigate } from "react-router-dom";
const Protection = ({ children }) => {
    const auth = getAuth();
    if (!auth || !auth.token) {
        return <Navigate to='/' replace />

    }
    return children;

}

export default Protection