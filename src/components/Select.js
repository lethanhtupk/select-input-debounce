import React from 'react'
import AsyncSelect from 'react-select/async'
import { stateOptions } from '../seeds'
import './Select.css'

let timeoutId

const filterStates = (inputValue) => {
  console.log('Fetching data from external source')
  return stateOptions.filter((state) => state.label.toLowerCase().includes(inputValue.toLowerCase()))
}

const debounce = (func, delay) => {
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func()
    }, delay)
  }
}

const loadOptions = (inputValue) => {
  return new Promise((resolve) => {
    debounce(() => resolve(filterStates(inputValue)), 500)()
  })
}

const SelectWithDebounce = () => {
  const loadDefaultOptions = (stateOptions) => {
    return stateOptions.slice(0, 10)
  }
  return (
    <div className='select-input'>
      <AsyncSelect loadOptions={loadOptions} cacheOptions defaultOptions={loadDefaultOptions(stateOptions)} />
    </div>
  )
}

export default SelectWithDebounce
