// Dropdown.tsx

import { forwardRef, useImperativeHandle, useState } from 'react';
import {
    useFloating,
    useClick,
    useDismiss,
    useInteractions,
    offset,
    flip,
    shift,
    autoUpdate,
    FloatingPortal // <-- Untuk performa z-index yang lebih baik
} from '@floating-ui/react';

// Tentukan tipe props agar lebih jelas
interface DropdownProps {
    placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    btnClassName?: string;
    button: React.ReactNode;
    children: React.ReactNode;
    offset?: [number, number];
}

const Dropdown = forwardRef((props: DropdownProps, forwardedRef) => {
    // 1. State untuk membuka/menutup dropdown
    const [open, setOpen] = useState(false);

    // 2. Hook utama dari Floating UI
    const { refs, floatingStyles, context } = useFloating({
        open: open,
        onOpenChange: setOpen,
        placement: props.placement || 'bottom-end',
        // Middleware untuk mengatur posisi
        middleware: [
            offset(props.offset ? props.offset[1] : 8), // Jarak dropdown dari tombol
            flip(), // Balik posisi jika tidak cukup ruang
            shift({ padding: 5 }), // Geser agar tetap terlihat di layar
        ],
        // Otomatis update posisi saat scroll atau resize
        whileElementsMounted: autoUpdate,
    });

    // 3. Hook untuk interaksi (klik untuk buka/tutup)
    const click = useClick(context);
    // Hook untuk menutup saat klik di luar (escape key juga)
    const dismiss = useDismiss(context);

    // Gabungkan semua interaksi
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
    ]);

    // 4. useImperativeHandle tetap berfungsi sama
    useImperativeHandle(forwardedRef, () => ({
        close() {
            setOpen(false);
        },
    }));

    return (
        <>
            {/* Tombol pemicu */}
            <button
                ref={refs.setReference}
                type="button"
                className={props.btnClassName}
                {...getReferenceProps()}
            >
                {props.button}
            </button>

            {/* Portal untuk dropdown agar tidak terpotong oleh overflow parent */}
            <FloatingPortal>
                {open && (
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        className="z-1000"
                        {...getFloatingProps()}
                    >
                        {props.children}
                    </div>
                )}
            </FloatingPortal>
        </>
    );
});

export default Dropdown;
