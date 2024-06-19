import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import config from "../config";

export const seedAdmin = async () => {
  const isAdminExists = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  const salt = await bcrypt.genSalt(parseInt(config.salt_rounds!));
  const hashedPassword: string = await bcrypt.hash("admin@gmail.com", salt);

  if (!isAdminExists) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }
};
