import { forwardRef } from 'react'
import { AlertCircle } from 'lucide-react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const inputClasses = `
    input-field
    ${LeftIcon ? 'pl-10' : ''}
    ${RightIcon ? 'pr-10' : ''}
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
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <RightIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
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

Input.displayName = 'Input'

export default Input