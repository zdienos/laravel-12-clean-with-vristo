import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import { setUser, setLoading } from './store/authSlice';
import axios from './lib/axios';

function App({ children }: PropsWithChildren) {
    // Mengambil semua state yang dibutuhkan dengan useSelector
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const { isAuthenticated } = useSelector((state: IRootState) => state.auth);
    const sidebar = useSelector((state: IRootState) => state.themeConfig.sidebar); // <-- Ambil state sidebar di sini
    const dispatch = useDispatch();

    // useEffect untuk theme, ini sudah benar
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);

    // useEffect untuk cek autentikasi, ini juga sudah benar
    useEffect(() => {
        if (isAuthenticated) {
            return;
        }
        // const checkAuth = async () => {
        //     try {
        //         const { data: user } = await axios.get('/api/user');
        //         dispatch(setUser(user));
        //     } catch (error) {
        //         console.log('User not authenticated');
        //     }
        // };
        const checkAuth = async () => {
            try {
                const { data: user } = await axios.get('/api/user');
                dispatch(setUser(user));
            } catch (error) {
                dispatch(setLoading(false));
            }
        };
        checkAuth();
    }, [dispatch, isAuthenticated]);

    return (
        <div
            className={`${sidebar ? 'toggle-sidebar' : ''} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass
                } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
