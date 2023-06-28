import { useRef, useEffect } from 'react';

type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

const useThrottle = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  options: ThrottleOptions = {}
): T => {
  const { leading = true, trailing = true } = options;
  const timeoutRef = useRef<number | undefined>(undefined);
  const lastInvokeTimeRef = useRef<number>(0);
  const savedArgsRef = useRef<any[]>([]);
  const savedThisRef = useRef<any>(null);

  const invokeFunction = () => {
    fn.apply(savedThisRef.current, savedArgsRef.current);
    lastInvokeTimeRef.current = Date.now();
  };

  const leadingInvoke = () => {
    if (leading && Date.now() - lastInvokeTimeRef.current >= wait) {
      invokeFunction();
    }
  };

  const trailingInvoke = () => {
    if (trailing) {
      timeoutRef.current = window.setTimeout(() => {
        invokeFunction();
      }, wait);
    }
  };

  const throttledFn = (...args: any[]) => {
    savedArgsRef.current = args;
    savedThisRef.current = this;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    leadingInvoke();
    trailingInvoke();
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return throttledFn as T;
};

export default useThrottle;
