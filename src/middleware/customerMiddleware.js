import prisma from "../app/database.js";

const customerMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json({
      errors: "Unauthorized",
    });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
      select: {
        token: true,
        role: true,
      },
    });

    if (!user) {
      res.status(401).json({
        errors: "Unauthorized",
      });
    } else if (user.role === "Admin") {
      res.status(400).json({
        errors: "you are not allowed to enter",
      });
    } else {
      req.user = user;
      next();
    }
  }
};

export default customerMiddleware;
