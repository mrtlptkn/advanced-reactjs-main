import { describe, expect, it, vi } from 'vitest';
import debounce from './debounce';

describe('debounce', () => {
	it('ms süresi dolmadan fn çağrılmaz', () => {
		vi.useFakeTimers();
		const fn = vi.fn();
		const debounced = debounce(fn, 300);

		debounced();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(299);
		expect(fn).not.toHaveBeenCalled();

		vi.useRealTimers();
	});

	it('art arda çağrılarda sadece son çağrı tetiklenir', () => {
		vi.useFakeTimers();
		const fn = vi.fn();
		const debounced = debounce(fn, 300);

		debounced(1);
		debounced(2);
		debounced(3);

		vi.advanceTimersByTime(300);

		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith(3);

		vi.useRealTimers();
	});
});
