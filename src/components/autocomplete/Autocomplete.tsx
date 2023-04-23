import React, { useEffect, useState, useRef } from 'react'
import { TextField } from '../text-field'
import styles from './Autocomplete.module.css'

export type SelectOption = {
  name: string
  value: any
}

type AutocompleteProps = {
  options: SelectOption[]
  placeholder: string
  selectedValue: (value: SelectOption) => void
}

export function Autocomplete({
  options,
  placeholder,
  selectedValue,
}: AutocompleteProps) {
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [query, setQuery] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  function selectOption(option: SelectOption) {
    selectedValue(option)
    setQuery(option.name)
  }

  function handleBlur(event: any) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  function handleChange(event: { target: { name: string; value: string } }) {
    const input = event.target.value
    const filteredOptions = options.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(input.toLowerCase()) > -1
    )
    setSelectedIndex(0)
    setFilteredOptions(filteredOptions)
    setIsOpen(true)
    setQuery(input)
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue =
            highlightedIndex + (event.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
        default:
      }
    }
    containerRef.current?.addEventListener('keydown', handler)
    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [isOpen, highlightedIndex, filteredOptions])

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      tabIndex={-1}
      onClick={() => setIsOpen((prev) => !prev)}
      className={styles.autocomplete}
    >
      <TextField
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        type="text"
        name="autocomplete"
      />
      <ul
        className={`${styles.options} ${
          isOpen && filteredOptions.length ? styles.show : ''
        }`}
      >
        {filteredOptions.map((option: SelectOption, index) => {
          return (
            <li
              key={option.name}
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
                setSelectedIndex(selectedIndex)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`${styles.option} ${
                option.name === query ? styles.selected : ''
              } ${index === highlightedIndex ? styles.highlighted : ''}`}
            >
              {option.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
