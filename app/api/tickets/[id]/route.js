import connectMongoDB from "@/lib/mongodb";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
    const { id } = params;
    const { title, body, priority, user_email } = await request.json()
    await connectMongoDB();

    await Ticket.findByIdAndUpdate(id, { title, body, priority, user_email })
    return NextResponse.json({ message: "Titcket updated" }, { status: 200 })
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const ticket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ ticket }, { status: 200 })

}

