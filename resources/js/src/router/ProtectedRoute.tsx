import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { IRootState } from '../store';

const ProtectedRoute = () => {
    // const { isAuthenticated } = useSelector((state: IRootState) => state.auth);
    const { isAuthenticated, loading } = useSelector((state: IRootState) => state.auth);

    if (loading) {
        return <div>Loading...</div>; // atau spinner
    }
    // Ceknya jadi instan! Tidak ada loading.
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

export default ProtectedRoute;
