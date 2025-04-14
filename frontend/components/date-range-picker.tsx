'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { addDays, format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DateRangePicker() {
  const [date, setDate] = React.useState<{
    from: Date
    to: Date
  }>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const handlePresetChange = (preset: string) => {
    const today = new Date()

    switch (preset) {
      case 'last7days':
        setDate({
          from: addDays(today, -7),
          to: today,
        })
        break
      case 'last30days':
        setDate({
          from: addDays(today, -30),
          to: today,
        })
        break
      case 'last90days':
        setDate({
          from: addDays(today, -90),
          to: today,
        })
        break
      default:
        break
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="border-b p-3">
            <Select onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={range => {
              if (range?.from && range?.to) {
                setDate({ from: range.from, to: range.to })
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
