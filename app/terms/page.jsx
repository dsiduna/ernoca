import React from 'react'

export const metadata = {
    title: 'Terms & Conditions | Ernoca',
    description: 'Terms and conditions of Your trusted Zimbabwean car and motor spares dealership. Let us trade, today.',
}


const Terms = () => {
    const termsAndConditionsText = `

    Welcome to Ernoca! These terms and conditions ("Terms") govern your use of the Ernoca platform, including the website and any services provided by Ernoca. By using our platform, you agree to comply with these Terms. Please read them carefully.
    
    1. User Responsibilities:
    
    1.1. When using Ernoca, you are responsible for providing accurate and up-to-date information. If you list a preowned car for sale, you must ensure that the information about the vehicle, including its condition, history, and documentation, is accurate and complete.
    
    1.2. You must have the legal authority to sell any vehicle you list on Ernoca. You must comply with all applicable laws and regulations, including those related to the sale and transfer of vehicles.
    
    1.3. You are responsible for any content you post on Ernoca, including text, images, and other media. You must not post any content that is false, misleading, defamatory, or infringes on the rights of others.
    
    2. Transactions:
    
    2.1. Ernoca provides a platform for buyers and sellers to connect and facilitate transactions. We do not guarantee the accuracy or availability of the listings posted on the platform. We do not endorse any specific seller or buyer.
    
    2.2. Transactions conducted through Ernoca are solely between the buyer and the seller. Ernoca is not a party to any transaction and is not responsible for any disputes or issues that may arise.
    
    2.3. You are responsible for communicating with other parties, verifying information, and making informed decisions before entering into any transaction. It is recommended to inspect the vehicle in person and conduct any necessary due diligence.
    
    3. Privacy and Data:
    
    3.1. Ernoca collects and uses personal information in accordance with its Privacy Policy. By using Ernoca, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.
    
    3.2. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. Please notify us immediately if you suspect any unauthorized use of your account.
    
    4. Limitation of Liability:
    
    4.1. Ernoca strives to provide a secure and reliable platform, but we cannot guarantee uninterrupted or error-free operation. The use of Ernoca is at your own risk.
    
    4.2. To the extent permitted by law, Ernoca and its affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the platform.
    
    5. Dispute Resolution:
    
    5.1. Any disputes arising from or in connection with these Terms shall be resolved through negotiation and good faith efforts. If a dispute cannot be resolved amicably, it shall be submitted to binding arbitration in accordance with the rules of the arbitration organization.
    
    5.2. These Terms shall be governed by and construed in accordance with the laws of Zimbabwe, without regard to its conflict of law principles.
    
    Please review these Terms in their entirety for a complete understanding of your rights and obligations when using Ernoca. If you do not agree with any part of these Terms, please refrain from using the platform. Ernoca reserves the right to amend these terms of service without the issuance of any notification to the users of the platform.`;

    return (
        <div className="p-4 xs:py-32 py-24 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Terms and Conditions</h1>
            <pre className="whitespace-pre-wrap w-full xs:w-1/2 text-md">{termsAndConditionsText}</pre>
        </div>
    )
}

export default Terms


