import prisma from '../app/database.js';
import validation from '../validation/validation.js';
import responseError from '../error/error.js';
import bookingValidation from '../validation/booking-validation.js';
import fs from 'fs/promises';

const get = async () => {
  const result = await prisma.booking.findMany({
    include: {
      guest: {
        include: {
          country: true,
        },
      },
      room: true,
    },
  });

  return result;
};

const getById = async (id) => {
  const result = await prisma.booking.findUnique({
    where: {
      id: parseInt(id), // pastikan 'id' adalah id tamu
    },
  });

  if (!result) {
    throw new Error('Booking not found');
  }

  return result;
};

const post = async (request) => {
  try {
    const validate = await validation(bookingValidation, request);

    const { startDate, endDate, roomId } = validate; // Ambil startDate, endDate, dan roomId dari data yang divalidasi

    // Cek apakah ada booking lain dengan roomId yang sama dan rentang tanggal yang bertabrakan
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        AND: [
          {
            OR: [
              { startDate: { lte: startDate }, endDate: { gte: startDate } }, // Jika startDate booking baru berada di antara rentang booking yang sudah ada
              { startDate: { lte: endDate }, endDate: { gte: endDate } }, // Jika endDate booking baru berada di antara rentang booking yang sudah ada
              { startDate: { gte: startDate }, endDate: { lte: endDate } }, // Jika rentang booking baru sepenuhnya tertutupi oleh rentang booking yang sudah ada
            ]
          }
        ]
      },
    });

    if (overlappingBooking) {
      throw new Error('Room is already booked within the selected dates.');
    }

    // Step 1: Get the current year and month in Roman numeral format
    const today = new Date().toLocaleDateString('id-ID');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based
    const romanMonth = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][currentMonth - 1];

    // Step 2: Find the latest booking number for the current year
    const latestBooking = await prisma.booking.findFirst({
      where: {
        noBooking: {
          contains: `FM/${romanMonth}/${currentYear}`
        }
      },
      orderBy: {
        noBooking: 'desc'
      }
    });

    // Step 3: Generate the new booking number
    let newBookingNumber;
    if (latestBooking) {
      const lastNumber = parseInt(latestBooking.noBooking.split('/')[0]);
      const newNumber = String(lastNumber + 1).padStart(3, '0');
      newBookingNumber = `${newNumber}/FM/${romanMonth}/${currentYear}`;
    } else {
      newBookingNumber = `001/FM/${romanMonth}/${currentYear}`;
    }

    // Step 4: Create the booking with the new booking number
    const result = await prisma.booking.create({
      data: {
        ...validate,
        noBooking: newBookingNumber,
        paymentDate: today
      },
    });

    return result;
  } catch (error) {
    // Handle any errors here (logging, throwing custom errors, etc.)
    console.error('Error creating booking:', error);
    throw error; // Propagate the error up to the caller
  }
};

const update = async (request, params) => {
  const validate = await validation(bookingValidation, request);
  const booking = await prisma.booking.findFirst({
    where: {
      id: params,
    },
  });

  if (!booking) {
    throw new responseError(404, 'booking not found');
  }
  const result = await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      ...validate,
    },
  });
  return result;
};

const destroy = async (id) => {
  try {
    // Fetch the guest to get the image path
    const guest = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!guest) {
      throw new Error('Guest not found');
    }

    // Delete the guest from the database
    const deletedGuest = await prisma.booking.delete({
      where: { id: parseInt(id) },
    });

    return deletedGuest;
  } catch (error) {
    throw new Error('Failed to delete service: ' + error.message);
  }
};

export default {
  get,
  post,
  getById,
  update,
  destroy
};
