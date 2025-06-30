import mongoose, { Schema, Document } from "mongoose";
import { IEvent } from "../interfaces/event.interface";


export interface IEventModel extends IEvent, Document {}

const EventSchema = new Schema<IEventModel>({
  title: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postedByName: { type: String, required: true },
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  attendeeCount: { type: Number, default: 0 },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

 const Event= mongoose.model<IEventModel>("Event", EventSchema);
export default Event;