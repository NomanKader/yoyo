// src/config/bookingInfoData.js

const bookingInfoConfig = [
  // Booking info
  { key: "bookingId", title: "Booking ID" },
  { key: "checkInDate", title: "Check in" },
  { key: "checkOutDate", title: "Check out" },
  { key: "roomPrice", title: "Room Price" },
  { key: "lengthOfDay", title: "Length of Day" },
  { key: "totalAmount", title: "Total Amount" },

  // Section: Customer Info
  { key: null, title: "Customer Info", isSection: true },
  { key: "guestName", title: "Customer Name" },
  { key: "phone", title: "Phone No" },
  { key: "guestEmail", title: "Email Address" },

  // Section: Payment
  { key: null, title: "Payment", isSection: true },
  { key: "bookingStatus", title: "Payment Status" },
];

export default bookingInfoConfig;
