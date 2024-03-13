import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { Appointment } from "../models/Appointment";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, phone_number, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email) || email < 0 || email > 100) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const passswordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password) || password < 0 || password > 200) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      phone_number: phone_number,
      password: encryptedPassword,
    }).save();

    return res.json({
      success: true,
      message: "User created succesfully",
      token: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cant be created",
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email) || email < 0 || email > 100) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const passswordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password) || password < 0 || password > 200) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const user = await User.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User or password incorrect",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: true,
        message: "User or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    return res.json({
      success: true,
      message: "User logged succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "users cant be logged",
      error: error,
    });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy({
      id: req.token.id,
    });

    return res.json({
      success: true,
      message: "user profile retrieved",
      data: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "user profile cant be retrieved",
      error: error,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { username, email, phone_number, password } = req.body;

    if (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email) || email < 0 || email > 100) {
        return res.status(400).json({ message: "Invalid email" });
      }
    }

    if (password) {
      const passswordRegex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
      if (!passswordRegex.test(password) || password < 0 || password > 200) {
        return res.status(400).json({ message: "Invalid password" });
      }
    }

    if (phone_number) {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ message: "Invalid phone number" });
      }
    }

    const updateUser = await User.update(
      {
        id: req.token.id,
      },
      {
        username,
        email,
        phone_number,
        password,
      }
    );

    return res.json({
      success: true,
      message: "user updated",
      data: updateUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "user cant by updated",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pageSize = parseInt(req.query.skip as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * pageSize;

    const users = await User.find({
      skip: skip,
      take: pageSize,
    });

    return res.json({
      success: true,
      message: "users retrieved",
      data: users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "users cant be retrieved",
      error: error,
    });
  }
};

const getAllAppointmentsByUserId = async (req: Request, res: Response) => {
  try {
    const user_id = req.token.id;
    const AllYourAppointment = await Appointment.find({
      select: {
        id: true,
        user_id: true,
        tattoo_artist_id: true,
        tattoo_id: true,
        date: true,
        status: true,
        user: {
          id: true,
          username: true,
          email: true,
        },
        tattoo: {
          work: true,
          name: true,
          description: true,
          price: true,
        },
        tattoo_artist: {
          tattoo_artist: true,
          id: true,
        },
      },
      where: {
        user_id,
      },
      relations: {
        user: true,
        tattoo: true,
        tattoo_artist: true,
      },
    });

    const niceView = AllYourAppointment.map((user) => ({
      id: user.id,
      user_name: user.user.username,
      tattoo_artist_name: user.tattoo_artist.tattoo_artist,
      tattoo_artist_id: user.tattoo_artist.id,
      work: user.tattoo.work,
      name: user.tattoo.name,
      description: user.tattoo.description,
      price: user.tattoo.price,
      date: user.date,
      status: user.status,
    }));

    return res.json({
      success: true,
      message: "Appointments retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Appointments cant by retrieved",
      error: error,
    });
  }
};

const getAllAppointmentsBySuperAdmin = async (req: Request, res: Response) => {
  try {
    const AllYourAppointment = await Appointment.find({
      select: {
        id: true,
        user_id: true,
        tattoo_artist_id: true,
        tattoo_id: true,
        date: true,
        status: true,
        user: {
          id: true,
          username: true,
          email: true,
        },
        tattoo: {
          work: true,
          name: true,
          description: true,
          price: true,
        },
        tattoo_artist: {
          tattoo_artist: true,
          id: true,
        },
      },
      relations: {
        user: true,
        tattoo: true,
        tattoo_artist: true,
      },
    });

    const niceView = AllYourAppointment.map((user) => ({
      id: user.id,
      user_name: user.user.username,
      tattoo_artist_name: user.tattoo_artist.tattoo_artist,
      tattoo_artist_id: user.tattoo_artist.id,
      work: user.tattoo.work,
      name: user.tattoo.name,
      description: user.tattoo.description,
      price: user.tattoo.price,
      date: user.date,
      status: user.status,
    }));

    return res.json({
      success: true,
      message: "Appointments retrieved",
      data: niceView,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Appointments cant by retrieved",
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const userToRemove = await User.findOneBy({
      id,
    });
    if (userToRemove) {
      await User.remove(userToRemove);
    }

    return res.json({
      success: true,
      message: "User deleted",
      data: userToRemove,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User cant by deleted",
      error: error,
    });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body;

    const updateUser = await User.update(
      {
        id,
      },
      {
        role,
      }
    );

    return res.json({
      success: true,
      message: "user updated",
      data: updateUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "user cant by updated",
      error: error,
    });
  }
};

export {
  register,
  login,
  profile,
  getAllUsers,
  updateUserById,
  getAllAppointmentsByUserId,
  deleteUser,
  updateUserRole,
  getAllAppointmentsBySuperAdmin
};