/*
 * Name: Checkbox.js
 * Purpose: Checkbox component for show/hide column dropdown
 * 
 * Usage: MetricsTable.js
 */

//module imports here
import React from 'react'

/*
 * This is the component of Checkbox
*/
export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type='checkbox' ref={resolvedRef} {...rest} />
    </>
  )
})