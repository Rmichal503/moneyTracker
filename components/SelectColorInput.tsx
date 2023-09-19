import React, { Dispatch } from 'react'

const colorSelect = [
    {
        value: '#3b82f6',
        title: 'blue'
    },
    {
        value: '#64748b',
        title: 'slate'
    },
    {
        value: '#6b7280',
        title: 'gray'
    },
    {
        value: '#71717a',
        title: 'zinc'
    },
    {
        value: '#737373',
        title: 'neutral'
    },
    {
        value: '#78716c',
        title: 'stone'
    },
    {
        value: '#ef4444',
        title: 'red'
    },
    {
        value: '#f97316',
        title: 'orange'
    },
    {
        value: '#f59e0b',
        title: 'amber'
    },
    {
        value: '#eab308',
        title: 'yellow'
    },
    {
        value: '#84cc16',
        title: 'lime'
    },
    {
        value: '#22c55e',
        title: 'green'
    },
    {
        value: '#10b981',
        title: 'emerald'
    },
    {
        value: '#14b8a6',
        title: 'teal'
    },
    {
        value: '#06b6d4',
        title: 'cyan'
    },
    {
        value: '#0ea5e9',
        title: 'sky'
    },
    {
        value: '#6366f1',
        title: 'indigo'
    },
    {
        value: '#8b5cf6',
        title: 'violet'
    },
    {
        value: '#a855f7',
        title: 'purple'
    },
    {
        value: '#d946ef',
        title: 'fuchsia'
    },
    {
        value: '#ec4899',
        title: 'pink'
    },
    {
        value: '#f43f5e',
        title: 'rose'
    },
]

interface ColorSelect {
    value: string,
    title: string
}

export default function SelectColorInput({setSelectedColor}:{setSelectedColor:Dispatch<React.SetStateAction<ColorSelect | undefined>>}) {
  return (
    <select defaultValue='blue' className='outline-tremor-ring text-center bg-transparent text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis' onChange={(e) => {
        const colorValues = e.target.value.split(',')
        setSelectedColor({
            value: colorValues[0],
            title: colorValues[1]
        })
    }}>
        {colorSelect.map(({ value, title }) => {
            const upperCaseTitle = title.charAt(0).toUpperCase() + title.slice(1)
            return (
                <option key={value} value={[value, title]}>
                    {upperCaseTitle}
                </option>
            )
        })}
    </select>
  )
}
