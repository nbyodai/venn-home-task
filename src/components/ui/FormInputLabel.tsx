export function FormInputLabel({name, label}: {name: string; label: string}) {
  return <label htmlFor={name} className="text-sm font-bold text-gray-800 ml-1">
    {label}
  </label>;
}
