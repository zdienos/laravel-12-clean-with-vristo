import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute'; // Import
const LoginBoxed = lazy(() => import('@/pages/Authentication/LoginBoxed'));

const Index = lazy(() => import('@/pages/Index'));
const Brand = lazy(() => import('@/pages/Masters/Brand'));
const Basic = lazy(() => import('@/pages/DataTables/Basic'));


const routes = [
    //authentication
    //Authentication
    {
        path: '/auth/signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    // dashboard
    {
        path: '/',
        element: <ProtectedRoute><Index /></ProtectedRoute>
    },
    {
        path: '/datatables/basic',
        element: <ProtectedRoute><Basic />,</ProtectedRoute>
    },
    {
        path: '/masters/brand',
        element: <ProtectedRoute><Brand /></ProtectedRoute>,
    }

    // {
    //     path: '/index',
    //     element: <Index />,
    // },
    // analytics page
    // Masters
];

export { routes };
