'use client';
import { Rating } from '@smastrom/react-rating'
import React from 'react'

interface ProductRateProps {
    rate: number,
    count: number
}

export default function ProductRate({rate, count} : ProductRateProps) {
  return (
    <div className='flex'>
        <Rating style={{ maxWidth: 100}} value={rate} readOnly />
        {count}{' '}
    </div>
  )
}
