import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI!;

const connectMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
};

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  phone: String,
  service: String,
  message: String,
  budget: String,
  urgency: String,
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectMongo();
    await Contact.create(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 });
  }
}
