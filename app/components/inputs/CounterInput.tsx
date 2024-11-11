'use client'
import React from 'react'

interface CounterInputProps{
    value:number;
    onChange:(value:number)=>void;
}
const CounterInput = ({value,onChange}:CounterInputProps) => {
  return (
    <div>CounterInput</div>
  )
}

export default CounterInput