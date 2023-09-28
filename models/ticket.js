
import mongoose from "mongoose";
import { Schema } from "mongoose";

const ticketsSchema = new mongoose.Schema({
    title: String,
    body: String,
    priority: String,
    user_email: String,
}, {
    timestamps: true
}
);


let Ticket
try {
    Ticket = mongoose.model('tickets')
} catch (error) {
    Ticket = mongoose.model('tickets', ticketsSchema)
}

export default Ticket;