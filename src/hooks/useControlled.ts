/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback, useEffect } from 'react';

export interface UseControlledProps<T = unknown> {
  controlled?: T;
  default?: T;
}

/**
 * Custom React hook to manage value of input according to the given props (uncontrolled to controlled)
 * @param object -  value and default value of input as object (if there is a value prop it would be controlled type)
 * @returns Array that first item is value and second item is the setter method and would change value if is controlled type
 */
export const useControlled = <T = unknown>({
  controlled,
  default: defaultValueProp,
}: UseControlledProps<T>): [T, (newValue: T) => void] => {
  const isControlled = controlled !== undefined;
  const isDevMode = useRef(process.env.NODE_ENV !== 'production');
  const isControlledRef = useRef(isControlled);
  const defaultValueRef = useRef(defaultValueProp);

  const [state, setState] = useState(defaultValueProp);

  useEffect(() => {
    if (isDevMode.current) {
      if (isControlledRef.current !== (controlled !== undefined)) {
        console.error('input should not switch from uncontrolled to controlled (or vice versa).');
      }
    }
  }, [isDevMode, isControlledRef, JSON.stringify(controlled)]);

  useEffect(() => {
    if (isDevMode) {
      if (!isControlledRef.current) {
        if (defaultValueRef.current !== defaultValueProp) {
          console.error('changing the default state of an uncontrolled after being initialized.');
        }
      }
    }
  }, [isDevMode, isControlledRef, JSON.stringify(defaultValueProp)]);

  const value = (isControlled ? controlled : state) as T;

  const setValueIfUncontrolled = useCallback((newValue: T) => {
    if (!isControlled) {
      setState(() => newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled];
};