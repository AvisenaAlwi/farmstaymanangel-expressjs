import prisma from "../app/database.js";

async function getCounts() {
    try {
      const [guest, service, booking, facility, activity, room, gallery, review ,bookingCounts ] = await Promise.all([
        prisma.guest.count(),
        prisma.service.count(),
        prisma.booking.count(),
        prisma.facility.count(),
        prisma.activity.count(),
        prisma.room.count(),
        prisma.gallery.count(),
        prisma.review.count(),
        prisma.booking.groupBy({
          by: ['bookingMethod'],
          _count: {
            bookingMethod: true,
          },
        }),

      ]);

      // Ubah format respons sesuai kebutuhan frontend (opsional)
      const counts = {
        guest,
        service,
        booking,
        facility,
        activity,
        room,
        gallery,
        review,
        bookingCounts: bookingCounts.reduce((acc, item) => {
          acc[item.bookingMethod] = item._count.bookingMethod;
          return acc;
        }, {}),

      };

      return counts;
    } catch (error) {
      console.error('Error fetching counts:', error);
      throw error;
    }
  }

export default {
  getCounts,
};