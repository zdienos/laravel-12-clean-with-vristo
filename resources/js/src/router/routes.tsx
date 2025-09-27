import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
const Index = lazy(() => import('../pages/Index'));
const Brand = lazy(() => import('@/pages/Masters/Brand'));
const Basic = lazy(() => import('../pages/DataTables/Basic'));


const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />
    },
    {
        path: '/datatables/basic',
        element: <Basic />,
    },

    // {
    //     path: '/index',
    //     element: <Index />,
    // },
    // analytics page
    // Masters
    {
        path: '/masters/brand',
        element: <Brand />,
    }
];

export { routes };
