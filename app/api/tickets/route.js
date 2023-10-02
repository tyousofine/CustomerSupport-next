import connectMongoDB from "@/lib/mongodb";
import Ticket from "@/models/ticket";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const { title, body, priority, user_email } = await req.json();

    await connectMongoDB();
    await Ticket.create({ title, body, priority, user_email })
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 })
}


export async function GET() {
    await connectMongoDB();
    const tickets = await Ticket.find({});
    return NextResponse.json({ tickets })
}

export async function DELETE(req) {

    const id = req.nextUrl.searchParams.get('id')
    await connectMongoDB();
    await Ticket.findByIdAndDelete(id)
    return NextResponse.json({ message: "Topic deleted" })
}


