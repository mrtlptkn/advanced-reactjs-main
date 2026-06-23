import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface CustomTextInputHandle {
	focus: () => void;
	clear: () => void;
}

interface CustomTextInputProps {
	placeholder?: string;
	className?: string;
}

// forwardRef + useImperativeHandle: parent component, bu input'un DOM node'una doğrudan erişmek yerine
// sadece dışarıya açtığımız focus/clear metodlarını çağırabilir. İmplementasyon detayı (gerçek input elementi) gizli kalır.
export const CustomTextInput = forwardRef<
	CustomTextInputHandle,
	CustomTextInputProps
>(({ placeholder, className = '' }, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(ref, () => ({
		focus: () => inputRef.current?.focus(),
		clear: () => {
			if (inputRef.current) inputRef.current.value = '';
		},
	}));

	return (
		<input
			ref={inputRef}
			type="text"
			placeholder={placeholder}
			className={`border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 ${className}`}
		/>
	);
});

CustomTextInput.displayName = 'CustomTextInput';
