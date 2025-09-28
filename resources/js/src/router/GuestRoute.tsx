// src/router/GuestRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { IRootState } from '../store';

const GuestRoute = () => {
    const { isAuthenticated, loading } = useSelector((state: IRootState) => state.auth);

    if (loading) {
        return <div>Loading...</div>; // spinner kalau mau
    }

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
