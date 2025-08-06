import * as React from "react";
import * as Label from "@radix-ui/react-label";

const Input = ({ label, placeholder, onValueChange, initialValue = "" }) => {
	const [value, setValue] = React.useState(initialValue);
	const [error, setError] = React.useState("");

	const validatePositiveInteger = (inputValue) => {
		// Si está vacío, no hay error
		if (inputValue === "") {
			setError("");
			return true;
		}

		// Verificar que solo contenga dígitos
		if (!/^\d+$/.test(inputValue)) {
			setError("Solo se permiten números enteros");
			return false;
		}

		const numValue = parseInt(inputValue, 10);

		// Verificar que sea positivo y esté en el rango permitido
		if (numValue <= 0) {
			setError("El valor debe ser un número positivo");
			return false;
		}

		if (numValue > 200) {
			setError("El valor máximo permitido es 200");
			return false;
		}

		setError("");
		return true;
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		
		// Permitir solo números y campo vacío
		if (inputValue === "" || /^\d+$/.test(inputValue)) {
			setValue(inputValue);
			const isValid = validatePositiveInteger(inputValue);
			
			// Notificar al componente padre del cambio
			if (onValueChange) {
				onValueChange({
					value: inputValue,
					isValid,
					numericValue: inputValue ? parseInt(inputValue, 10) : null
				});
			}
		}
	};

	const handleKeyPress = (e) => {
		// Prevenir caracteres no numéricos
		if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<div className="flex flex-col gap-1 px-5">
			<div className="flex flex-wrap items-center gap-4">
				<Label.Root
					className="text-sm font-medium leading-7 text-black"
				>
					{label}
				</Label.Root>
				<input
					className={`inline-flex h-9 w-[150px] lg:w-[250px] appearance-none items-center justify-center rounded px-2.5 text-sm leading-none text-black shadow-[0_0_0_1px] outline-none selection:bg-red-200 selection:text-black focus:shadow-[0_0_0_2px_black] ${
						error ? 'shadow-red-500 focus:shadow-red-500' : ''
					}`}
					type="text"
					value={value}
					placeholder={placeholder}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					autoComplete="off"
				/>
			</div>
			{error && (
				<span className="text-xs text-red-500 ml-0">
					{error}
				</span>
			)}
		</div>
	);
};

export default Input;


