# API Reference — Walk to Temple

> Base URL (dev): `http://localhost:4008/api/v1`
> Base URL (prod): `https://<wtt-platform>.railway.app/api/v1`

## Authentication
Protected endpoints require: `Authorization: Bearer <jwt>`

## Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check — `{ status: 'healthy' }` |
| GET | `/packages` | All active packages (optional `?region=`) |
| GET | `/packages/featured` | Featured packages |
| GET | `/packages/:slug` | Package detail |
| GET | `/packages/:slug/itinerary` | Day-wise itinerary |
| GET | `/packages/:slug/departures` | Available departures |
| GET | `/packages/:slug/pickup-points` | Pickup locations |
| GET | `/packages/:slug/reviews` | Reviews |
| POST | `/enquiries` | Submit pre-booking enquiry |
| POST | `/auth/register` | Register customer |
| POST | `/auth/login` | Login → returns JWT |

### Protected (customer, JWT required)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/me` | Current user |
| POST | `/bookings/initiate` | Create pending booking |
| POST | `/bookings/confirm` | Confirm after payment |
| GET | `/bookings` | My bookings |
| GET | `/bookings/:id` | Booking detail |
| PUT | `/bookings/:id/cancel` | Cancel booking |
| POST | `/reviews` | Submit review |

### Admin (JWT + role=admin)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/stats` | Dashboard stats |
| GET | `/admin/packages` | All packages |
| POST | `/admin/packages` | Create package |
| PUT | `/admin/packages/:id` | Update package |
| DELETE | `/admin/packages/:id` | Soft-delete package |
| POST | `/admin/packages/:id/itinerary` | Add itinerary day |
| GET | `/admin/packages/:id/itinerary` | Get itinerary |
| POST | `/admin/packages/:id/pickups` | Add pickup point |
| POST | `/admin/departures` | Add departure date |
| PUT | `/admin/departures/:id` | Update departure |
| GET | `/admin/bookings` | All bookings |
| GET | `/admin/enquiries` | All enquiries |

## Error Format
```json
{ "statusCode": 400, "message": "Error message", "error": "Bad Request" }
```
