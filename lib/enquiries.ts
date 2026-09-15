type Enquiry = {
  name: string
  phone: string
  service: string
  message: string
}

export async function sendEnquiry(enquiry: Enquiry) {
  const { default: emailjs } = await import('@emailjs/browser')
  return emailjs.send(
    'service_pv6cmir',
    'template_4798riz',
    enquiry,
    'AowSTnRMgS5_huZjn',
  )
}
