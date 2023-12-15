import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Ernoca',
  description: 'Privacy Policy of Your trusted Zimbabwean car and motor spares dealership. Let us trade, today.',
}

const Privacy = () => {
  return (
    <div className="p-4 py-32 xs:py-24 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Privacy Policy</h1>
      <div className='text-md xs:w-full w-1/2'>
        <p className="mb-4">
          At Ernoca, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our platform.
        </p>
        <p className="mb-4">
          We may collect certain information from you, including your name, contact details, vehicle information, and location when you list your preowned car for sale or make a purchase. This information is used to facilitate the buying and selling process, verify identities, prevent fraud, and provide a personalized experience on our platform.
        </p>
        <p className="mb-4">
          We do not share your personal information with third parties without your consent, unless required by law or as necessary to fulfill the purpose of the transaction. We implement appropriate security measures to protect your data and ensure its confidentiality.
        </p>
        <p className="mb-4">
          By using Ernoca, you agree to the terms outlined in this Privacy Policy. For more details on our data practices, including how you can access, update, or delete your personal information, please read the full Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Privacy
