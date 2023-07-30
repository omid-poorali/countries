import { renderHook, act } from '@testing-library/react';
import { useControlled } from './useControlled';

describe('useControlled hook tests', () => {
  it('should control and change the state value if control is undefined', () => {
    const { result } = renderHook(() =>
      useControlled({
        controlled: undefined,
        default: 'defaultValue',
      }),
    );

    expect(result.current[0]).toEqual('defaultValue');

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toEqual('newValue');
  });

  it('should not change the state value if controlled is provided', () => {
    const { result } = renderHook(() =>
      useControlled({
        controlled: 'value',
        default: undefined,
      }),
    );

    expect(result.current[0]).toEqual('value');

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toEqual('value');
  });
});