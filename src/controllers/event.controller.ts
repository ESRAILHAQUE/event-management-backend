import { Request, Response } from "express";
import mongoose from "mongoose";
import Event from "../models/event.model";

export const getMyEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
       res.status(401).json({ message: "Unauthorized" }); return;
    }

    const events = await Event.find({ postedBy: user.id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add new event
export const addEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { title, location, description, datetime } = req.body;
    if (!title || !location || !description || !datetime) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newEvent = new Event({
      title,
      postedBy: user.id,
      postedByName: user.name,
      dateTime: new Date(datetime),
      location,
      description,
      attendeeCount: 0,
      attendees: [],
    });


    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { title, location, description, dateTime } = req.body;

    if (!title || !location || !description || !dateTime) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const event = await Event.findOne({ _id: id, postedBy: user.id });
    if (!event) {
      res.status(404).json({ message: "Event not found or unauthorized" });
      return;
    }

    event.title = title;
    event.location = location;
    event.description = description;
    event.dateTime = new Date(dateTime);

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const event = await Event.findOneAndDelete({ _id: id, postedBy: user.id });
    if (!event) {
      res.status(404).json({ message: "Event not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getDateRange = (filter: string) => {
  const now = new Date();
  let start: Date, end: Date;

  switch (filter) {
    case "today":
      start = new Date(now.setHours(0, 0, 0, 0));
      end = new Date(now.setHours(23, 59, 59, 999));
      break;
    case "current_week":
      const day = now.getDay(); // Sunday=0, Monday=1 ...
      start = new Date(now);
      start.setDate(now.getDate() - day + 1);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    case "last_week":
      const lastWeekEnd = new Date(now);
      lastWeekEnd.setDate(now.getDate() - now.getDay());
      lastWeekEnd.setHours(23, 59, 59, 999);
      end = lastWeekEnd;
      start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      break;
    case "current_month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case "last_month":
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    default:
      start = new Date(0);
      end = new Date();
  }
  return { start, end };
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { search = "", filter = "", date, startDate, endDate } = req.query;

    let query: any = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (date) {
      const selectedDate = new Date(date as string);
      const start = new Date(selectedDate.setHours(0, 0, 0, 0));
      const end = new Date(selectedDate.setHours(23, 59, 59, 999));
      query.dateTime = { $gte: start, $lte: end };
    }

    if (startDate && endDate) {
      query.dateTime = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    if (filter && !date && !(startDate && endDate)) {
      const { start, end } = getDateRange(filter as string);
      query.dateTime = { $gte: start, $lte: end };
    }

    const events = await Event.find(query).sort({ dateTime: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const joinEvent = async (req: Request, res: Response):Promise<void> => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
       res.status(404).json({ message: "Event not found" });return;
    }

    // Check if user already joined
    if (event.attendees.includes(user.id)) {
       res.status(400).json({ message: "You already joined this event" });
       return;
    }

    event.attendeeCount += 1;
    event.attendees.push(user.id);
    await event.save();

    res.json({
      message: "Joined successfully",
      attendeeCount: event.attendeeCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};