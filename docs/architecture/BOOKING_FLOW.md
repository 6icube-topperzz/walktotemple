# Booking Flow — Walk to Temple

> Last updated: 2026-06-02

## High-Level Flow

```
Browse packages -> Select package -> Select departure ->
Enter travellers -> Select pickup -> Review -> Pay -> Confirm
```

## Detailed Steps

### Step 1: Browse & Select
- Customer lands on `/packages` or landing page
- Filters by region / duration
- Clicks package -> `/packages/[slug]`
- Sees available departures with seats remaining

### Step 2: Initiate Booking (POST /api/v1/bookings/initiate)
- Requires JWT auth (redirect to login if none)
- Collects: departure date, adults, children, traveller details, pickup point, contact
- Creates `bookings` row with `status=pending`, `paymentStatus=pending`
- Returns `bookingId` and `totalAmount`

### Step 3: Payment
- Redirects to `/booking/payment?bookingId=...&amount=...`
- Razorpay checkout opens
- On success: handler fires

### Step 4: Confirm (POST /api/v1/bookings/confirm)
- Sends `{ bookingId, razorpayPaymentId }`
- Updates booking: `status=confirmed`, `paymentStatus=paid`
- Increments `departure_dates.bookedSeats`
- Redirects to `/booking/confirm`

### Step 5: Confirmation
- Shows success screen with booking number
- WhatsApp notification sent via notify service
- Customer views in `/my-bookings`

## Cancellation Flow
- Customer or admin sets `status=cancelled`, `cancelledAt=now`
- Refund processed per BOOKING_POLICY.md rules

## State Machine

```
[pending] --payment success--> [confirmed]
[pending] --cancel/timeout---> [cancelled]
[confirmed] --within window--> [cancelled]
```
