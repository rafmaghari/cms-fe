import {useCallback, useEffect, useRef} from 'react';

function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): (...args: Parameters<T>) => void {
    const latestCallback = useRef<(...args: Parameters<T>) => void>();
    const latestTimeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        latestCallback.current = callback;
    }, [callback]);

    return useCallback((...args: Parameters<T>) => {
        if (latestTimeout.current) {
            clearTimeout(latestTimeout.current);
        }
        latestTimeout.current = setTimeout(() => {
            latestCallback.current?.(...args);
        }, delay);
    }, [delay]);
}

export default useDebounce;
