import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedLogin({
    children
}: {
    children: ReactNode
}) {
    const token = localStorage.getItem("token")
    if (token) {
        return <Navigate to={"/dashboard"} replace />
    }
    return children
}