import React from 'react'

interface CheckOutWizardProps {
    activeStep: number
}

export default function CheckOutWizard({ activeStep = 0}: CheckOutWizardProps) {
  return (
    <div className='mb-5 flex flex-wrap'>
        {[
            'User Login', 
            'Shipping Address',
            'Payment Method', 
            'Place Order',
        ].map((step:string, index:number) => (
            <div key={step} className={`flex-1 border-b-2 text-center ${index <= activeStep ? 'border-indigo-500 text-indigo-500' : 'border-gray-400 text-gray-400'}`}>
                {step}
            </div>
        ))}
    </div>
  )
}
