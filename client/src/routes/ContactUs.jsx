import { useState } from "react";
import banner from '../assets/icons/PractitionerBackground.png';
import paleBanner from '../assets/icons/PaleGreenPractitionerBackground.png';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // TODO: Send formData to email handler
  }

  return (
    <>
      <div
          className="w-full h-64 sm:h-80 md:h-96 relative bg-white"
          style={{
              backgroundImage: `url(${banner}), url(${paleBanner})`,
              backgroundSize: 'cover, cover',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat',
          }}
      >
          <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-3xl sm:text-xl md:text-4xl lg:text-5xl font-fenix font-normal">
                  Contact Us
              </h1>
          </div>
      </div>

      <div id="contact-us">
        <p>Tell us a bit about yourself and we&apos;ll get in touch as soon as we can. </p>

        <div className="flex justify-center w-full px-4 ">
          <form
            className="flex flex-col items-stretch justify-center w-full p-4 bg-white rounded shadow"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={formData.lastName}
              name='lastName'
              placeholder="Last Name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={formData.firstName}
              name='firstName'
              placeholder="First Name"
              onChange={handleInputChange}
            />
            <input
              type="email"
              className="border rounded px-3 py-2 w-full"
              value={formData.email}
              name='email'
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={formData.phone}
              name='phone'
              placeholder="Phone Number"
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              className="border rounded px-3 py-2 w-full"
              rows="5"
              value={formData.message}
              placeholder="Message"
              onChange={handleInputChange}
            />
            <button
              className="bg-medium-pale-green hover:bg-green-600 rounded-full w-[204px] h-[43px] text-white font-medium px-6 py-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
