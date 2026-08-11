import bcrypt from "bcryptjs";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";

export const seedTesterAdmin = async () => {
  try {
    const isTesterAdminExist = await prisma.user.findUnique({
      where: {
        email: config.tester_admin_email,
      },
    });

    if (isTesterAdminExist) {
      console.log("Tester Admin Already Exists!");
      return;
    }

    const name = config.tester_admin_name;
    const email = config.tester_admin_email;
    const password = config.tester_admin_password;

    if (!name || !email || !password) {
      throw new Error(
        "Tester Admin Name, Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.ADMIN,
        status: "ACTIVE",
        profile: {
          create: {
            bio: "Tester admin account.",
          },
        },
      },
    });

    console.log("Tester Admin Created : ", testerAdmin.email);
  } catch (error) {
    console.log("Error Seeding Tester Admin : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_admin_email,
      },
    });
  }
};

export const seedTesterCustomer = async () => {
  try {
    const isTesterCustomerExist = await prisma.user.findUnique({
      where: {
        email: config.tester_customer_email,
      },
    });

    if (isTesterCustomerExist) {
      console.log("Tester Customer Already Exists!");
      return;
    }

    const name = config.tester_customer_name;
    const email = config.tester_customer_email;
    const password = config.tester_customer_password;

    if (!name || !email || !password) {
      throw new Error(
        "Tester Customer Name, Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerCustomer = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.CUSTOMER,
        status: "ACTIVE",
        profile: {
          create: {
            bio: "Tester customer account — browse and book gear.",
          },
        },
      },
    });

    console.log("Tester Customer Created : ", testerCustomer.email);
  } catch (error) {
    console.log("Error Seeding Tester Customer : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_customer_email,
      },
    });
  }
};

export const seedTesterProvider = async () => {
  try {
    const isTesterProviderExist = await prisma.user.findUnique({
      where: {
        email: config.tester_provider_email,
      },
    });

    if (isTesterProviderExist) {
      console.log("Tester Provider Already Exists!");
      return;
    }

    const name = config.tester_provider_name;
    const email = config.tester_provider_email;
    const password = config.tester_provider_password;

    if (!name || !email || !password) {
      throw new Error(
        "Tester Provider Name, Email, Password Missing In Env File!!!",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const testerProvider = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.PROVIDER,
        status: "ACTIVE",
        profile: {
          create: {
            bio: "Tester provider account — list and manage gear.",
          },
        },
      },
    });

    console.log("Tester Provider Created : ", testerProvider.email);
  } catch (error) {
    console.log("Error Seeding Tester Provider : ", error);

    await prisma.user.delete({
      where: {
        email: config.tester_provider_email,
      },
    });
  }
};
