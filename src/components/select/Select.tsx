import React, { useEffect, useRef, useState } from 'react'
import styles from './Select.module.css'

export type SelectOption = {
  name: string
  value: any
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export function Select({ options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option)
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
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={styles.select}
    >
      <span className={styles.input}>{value?.name}</span>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option: SelectOption, index) => {
          return (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
                setSelectedIndex(selectedIndex)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option} ${
                option.name === value?.name ? styles.selected : ''
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

Select.defaultProps = {
  value: '',
}
