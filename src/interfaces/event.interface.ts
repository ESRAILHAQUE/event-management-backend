import { Types } from "mongoose";

export interface IEvent {
  title: string;
  postedBy: Types.ObjectId;
  postedByName: string;
  dateTime: Date;
  location: string;
  description: string;
  attendeeCount: number;
  attendees: Types.ObjectId[];
}
