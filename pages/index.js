import React from 'react'
import InternshipForm from './components/InternshipForm'
import Appointment from './components/appointment'
import Offer_letter from './components/offer_letter'
import Link from 'next/link'
import OfferLetterForm from './components/offer_letter'

function index() {
  return (
    <div>
      <Offer_letter />
      <InternshipForm />
      <Appointment />
      <OfferLetterForm />

    </div>
  )
}

export default index
