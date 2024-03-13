import { Request, Response } from "express";
import { Tattoo } from "../models/Tattoo";

const createTattoo = async (req: Request, res: Response) => {
  try {
    const { work, name, description, photo, price } = req.body;

    const descriptionregex = /^[\s\S]+$/;
    if (!(descriptionregex.test(description)) || description.length < 0 || description.length > 255) {
      return res.status(400).json({ message: "Invalid description" });
    }

    const priceRegex = /^\d{1,10}$/;
    if (!priceRegex.test(price)) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const newTattoo = await Tattoo.create({
      work,
      name,
      description,
      photo,
      price,
    }).save();

    return res.json({
      success: true,
      message: "Tattoo retrieved",
      data: newTattoo,
    });
  } catch (error) {
    console.error(error)
    return res.json({
      success: false,
      message: "Tattoo cant be created",
      error: error,
    });
  }
};

const updateTattoById = async (req: Request, res: Response) => {
  try {
    const { id, work, name ,description, photo, price } = req.body;

    const descriptionregex = /^[a-zA-Z]+$/;
    if (!descriptionregex.test(description) || description < 0 || description > 255) {
      return res.status(400).json({ message: "Invalid description" });
    }

    const priceRegex = /^\d{1,10}$/;
    if (!priceRegex.test(price)) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const updateWork = await Tattoo.update(
      {
        id,
      },
      {
        work,
        name,
        description,
        photo,
        price,
      }
    );

    return res.json({
      success: true,
      message: "Work updated",
      data: updateWork,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Work cant by updated",
      error: error,
    });
  }
};
const deleteTattoo = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;

    const tattooToRemove = await Tattoo.findOneBy({
      id,
    });
    if (tattooToRemove) {
      await Tattoo.remove(tattooToRemove);
    }

    return res.json({
      success: true,
      message: "Work deleted",
      data: tattooToRemove,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Work cant by deleted",
      error: error,
    });
  }
};

const getAllTattoos = async (req: Request, res: Response) => {
  try {
    const pageSize = parseInt(req.query.skip as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * pageSize;

    const users = await Tattoo.find({
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

export { createTattoo, updateTattoById, deleteTattoo, getAllTattoos };