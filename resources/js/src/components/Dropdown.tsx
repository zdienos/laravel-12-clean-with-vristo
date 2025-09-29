import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import {
    useFloating,
    offset,
    flip,
    shift,
    Placement,
} from "@floating-ui/react";

interface DropdownProps {
    button: React.ReactNode;
    children: React.ReactNode;
    btnClassName?: string;
    placement?: Placement;
    offsetValue?: number;
}

const Dropdown = (props: DropdownProps, forwardedRef: any) => {
    const [visibility, setVisibility] = useState(false);

    // Floating UI setup
    const { refs, floatingStyles } = useFloating({
        placement: props.placement || "bottom-end",
        middleware: [offset(props.offsetValue ?? 8), flip(), shift()],
    });

    // Close on outside click
    // const handleDocumentClick = (event: MouseEvent) => {
    //     if (
    //         refs.reference.current?.contains(event.target as Node) ||
    //         refs.floating.current?.contains(event.target as Node)
    //     ) {
    //         return;
    //     }
    //     setVisibility(false);
    // };
    const handleDocumentClick = (event: MouseEvent) => {
        const refEl = refs.reference.current;
        const floatEl = refs.floating.current;

        if (
            (refEl instanceof HTMLElement && refEl.contains(event.target as Node)) ||
            (floatEl instanceof HTMLElement && floatEl.contains(event.target as Node))
        ) {
            return;
        }

        setVisibility(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    }, []);

    // Imperative handle
    useImperativeHandle(forwardedRef, () => ({
        close() {
            setVisibility(false);
        },
    }));

    return (
        <>
            <button
                ref={refs.setReference}
                type="button"
                className={props.btnClassName}
                onClick={() => setVisibility((v) => !v)}
            >
                {props.button}
            </button>

            {visibility && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="z-50"
                    onClick={() => setVisibility(false)}
                >
                    {props.children}
                </div>
            )}
        </>
    );
};

export default forwardRef(Dropdown);
