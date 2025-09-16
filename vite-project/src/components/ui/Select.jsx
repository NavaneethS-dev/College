import { forwardRef } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'Select an option',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const selectClasses = `
    input-field
    pr-10
    appearance-none
    cursor-pointer
    ${error ? 'input-error' : ''}
    ${className}
  `

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={selectClasses}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option 
              key={typeof option === 'string' ? option : option.value} 
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select