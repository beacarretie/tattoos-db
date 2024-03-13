import { Request, Response } from "express";
import dayjs from "dayjs";
import { Appointment } from "../models/Appointment";

const createAppointment = async (req: Request, res: Response) => {
  try {
    const { tattoo_artist_id, tattoo_id, date } = req.body;
    const dateBody = dayjs(date);
    
    const checkDate = await Appointment.findOne({
      where: {
        tattoo_artist_id,
        date
      },
    })

    if(checkDate === null){

    }else{
      const CheckDate = dayjs(checkDate.date)
      if (CheckDate.isSame(dateBody)) {
        return res.status(400).json({message: "Date already in use for this tatto artist"})
      }
    }

    // if(checkDate !== null){
    //   const CheckDate = dayjs(checkDate.date)
    //   if (CheckDate.isSame(dateBody)) {
    //     return res.status(400).json({message: "Date already in use for this tatto artist"})
    // }

    const newAppointment = await Appointment.create({
      user_id: req.token.id,
      tattoo_artist_id,
      tattoo_id,
      date,
    }).save();

    return res.json({
      success: true,
      message: "Appointment retrieved",
      data: newAppointment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Appointment cant be created",
      error: error,
    });
  }
};

const updateAppointmentByUserId = async (req: Request, res: Response) => {
  try {
    const { id, tattoo_artist_id, tattoo_id, date, status } = req.body;
    const dateBody = dayjs(date);
    
    const checkDate = await Appointment.findOne({
      where: {
        tattoo_artist_id,
        date
      },
    })

    if(checkDate === null){
    }else{
      const CheckDate = dayjs(checkDate.date)
      if (CheckDate.isSame(dateBody)) {
        return res.status(400).json({message: "Date already in use for this tatto artist"})
      }
    }

    const updateAppointment = await Appointment.update(
      {
        id,
        // user_id: req.token.role === "user" ? req.token.id : req.body.user_id,
        user_id: req.token.id || req.body.user_id,
      },
      {
        tattoo_artist_id,
        tattoo_id,
        date,
        status
      }
    );

    return res.json({
      success: true,
      message: "Appointment updated",
      data: updateAppointment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Appointment cant by updated",
      error: error,
    });
  }
};

const deleteAppointmentByUserId = async (req: Request, res: Response) => {
  try {
    const appointmentToRemove = await Appointment.findOneBy({
      user_id: req.token.id || req.body.user_id,
      id: req.body.id,
    });
    if (appointmentToRemove) {
      await Appointment.remove(appointmentToRemove);
    }

    return res.json({
      success: true,
      message: "Appointment deleted",
      data: appointmentToRemove,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Appointment cant by deleted",
      error: error,
    });
  }
};

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const pageSize = parseInt(req.query.skip as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const skip = (page - 1) * pageSize;

    const appointments = await Appointment.find({
      skip: skip,
      take: pageSize,
    });

    return res.json({
      success: true,
      message: "users retrieved",
      data: appointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "users cant be retrieved",
      error: error,
    });
  }
};

export {
  createAppointment,
  updateAppointmentByUserId,
  deleteAppointmentByUserId,
  getAllAppointments
};