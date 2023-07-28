/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import {useRef, useState, useCallback, useEffect} from 'react';

export interface UseControlledProps<T = unknown> {
	controlled: T | undefined;
	default: T | undefined;
	initialValue: T
}

export const useControlled = <T = unknown>({
	controlled,
	default: defaultProp,
	initialValue,
}: UseControlledProps<T>): [T, (newValue: T) => void] => {
	const {current: isControlled} = useRef(controlled !== undefined);
	const [valueState, setValue] = useState(defaultProp ?? initialValue);
	const value = (isControlled ? controlled : valueState) as T;

	if (process.env.NODE_ENV !== 'production') {
		useEffect(() => {
			if (isControlled !== (controlled !== undefined)) {
				console.error('elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled');
			}
		}, [controlled]);

		const {current: defaultValue} = useRef(defaultProp);

		useEffect(() => {
			if (!isControlled && defaultValue !== defaultProp) {
				console.error('a component is changing the default state of an uncontrolled after being initialized. To suppress this warning opt to use a controlled');
			}
		}, [JSON.stringify(defaultProp)]);
	}

	const setValueIfUncontrolled = useCallback((newValue: T) => {
		if (!isControlled) {
			setValue(newValue);
		}
	}, []);

	return [value, setValueIfUncontrolled];
};
