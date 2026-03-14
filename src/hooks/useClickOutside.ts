import { useEffect, RefObject } from "react";

function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    onClickOutside: () => void,
    isOpen: boolean
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node))
                onClickOutside();
        };
        if(isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClickOutside]);
}
                   
export default useClickOutside;