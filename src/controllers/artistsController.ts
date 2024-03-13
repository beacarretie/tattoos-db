import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artists";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Appointment } from "../models/Appointment";

const login = async (req: Request, res: Response) => {
  try {
    const { tattoo_artist, password } = req.body;

    const passswordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password) || password < 0 || password > 200) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const artist = await Tattoo_artist.findOneBy({
      tattoo_artist,
    });

    if (!artist) {
      return res.status(400).json({
        success: true,
        message: "Artist or password incorrect",
      });
    }

    if (!bcrypt.compareSync(password, artist.password)) {
      return res.status(400).json({
        success: true,
        message: "Artist or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: artist.id,
        role: artist.role,
        name: artist.tattoo_artist,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    return res.json({
      success: true,
      message: "Artist logged succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Artist cant be logged",
      error: error,
    });
  }
};

const registerTattoArtist = async (req: Request, res: Response) => {
  try {
    const { tattoo_artist, password, description, photo } = req.body;

    const tattoo_artistRegex = /^[a-zA-Z ']+$/;

    if (!tattoo_artistRegex.test(tattoo_artist) || tattoo_artist < 0 || tattoo_artist > 50) {
      return res.status(400).json({ message: "Invalid tattoo artist" });
    }

    const passswordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password) || password < 0 || password > 200) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newArtist = await Tattoo_artist.create({
      tattoo_artist,
      password: encryptedPassword,
      description,
      photo
    }).save();

    return res.json({
      success: true,
      message: "Artist created succesfully",
      token: newArtist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Artist cant be created",
      error: error,
    });
  }
};

const getAllArtist = async (req: Request, res: Response) => {
  try {
    const pageSize = parseInt(req.query.skip as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * pageSize;

    const artists = await Tattoo_artist.find({
      skip: skip,
      take: pageSize,
    });

    return res.json({
      success: true,
      message: "Artists retrieved",
      data: artists,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Artists cant be retrieved",
      error: error,
    });
  }
};

const getAllAppointmentsByArtistId = async (req: Request, res: Response) => {
  try {
    const artist_id = req.token.id;
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
          phone_number: true,
        },
        tattoo: {
          work: true,
          name: true,
          description: true,
          price: true,
          photo: true,
        },
        tattoo_artist: {
          tattoo_artist: true,
          photo: true,
        },
      },
      where: {
        tattoo_artist_id: artist_id,
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
      user_id: user.user.id,
      phone_number: user.user.phone_number,
      tattoo_artist_name: user.tattoo_artist.tattoo_artist,
      photo: user.tattoo_artist.photo,
      work: user.tattoo.work,
      description: user.tattoo.description,
      price: user.tattoo.price,
      tattoo: user.tattoo.name,
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

export {
  registerTattoArtist,
  login,
  getAllArtist,
  getAllAppointmentsByArtistId,
};