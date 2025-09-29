import { lazy, ReactNode } from 'react';
import ProtectedRoute from './ProtectedRoute'; // Import
import GuestRoute from './GuestRoute';
const LoginBoxed = lazy(() => import('@/pages/Authentication/LoginBoxed'));

const Index = lazy(() => import('@/pages/Index'));
const Brand = lazy(() => import('@/pages/Masters/Brand'));
const Basic = lazy(() => import('@/pages/DataTables/Basic'));


export type AppRoute = {
    path: string;
    element: ReactNode;
    layout?: "blank" | "default"; // <-- bikin optional
    children?: AppRoute[];
};

export const routes: AppRoute[] = [
    {
        path: '/auth',
        element: <GuestRoute />,   // semua child route di bawah ini hanya untuk guest
        layout: 'blank',
        children: [
            {
                path: 'signin',
                element: <LoginBoxed />,
            },
        ],
    },
    {
        path: '/',
        element: <ProtectedRoute />, // semua child route di bawah ini butuh login
        children: [
            {
                // index: true,
                path: '/',
                element: <Index />,
                layout: 'default',
            },
            {
                // index: true,
                path: '/datatables/basic',
                element: <Basic />,
                layout: 'default',
            },
            {
                // index: true,
                path: '/masters/brand',
                element: <Brand />,
                layout: 'default',
            },
            // route lain yang butuh login
        ],
    },
];


