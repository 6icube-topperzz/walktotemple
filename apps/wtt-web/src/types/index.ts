export interface Package {
  id: string
  slug: string
  nameEn: string
  nameTe?: string
  descriptionEn: string
  descriptionTe?: string
  region: string
  startCity: string
  durationDays: number
  durationNights: number
  pricePerPerson: string
  priceChild?: string
  minPersons?: number
  maxPersons?: number
  inclusions?: string[]
  exclusions?: string[]
  highlights?: string[]
  templesCovered?: string[]
  coverImageUrl?: string
  images?: string[]
  isActive?: boolean
  isFeatured?: boolean
  totalBookings?: number
  rating?: string
}

export interface DepartureDate {
  id: string
  packageId: string
  departureDate: string
  returnDate: string
  totalSeats: number
  bookedSeats?: number
  priceOverride?: string
  status?: string
  notes?: string
}

export interface Booking {
  id: string
  bookingNumber: string
  packageId: string
  departureDateId: string
  adults: number
  children?: number
  totalAmount: string
  status: string
  paymentStatus: string
  contactName: string
  contactMobile: string
  createdAt?: string
}

export interface User {
  id: string
  email: string
  fullName: string
  mobile: string
  role: string
}
