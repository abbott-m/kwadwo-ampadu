import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: 'kwadwo@blacheinc.com',
      subject: `[AR PORTFOLIO] New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background-color: #000; color: #00ffff; padding: 20px; border: 2px solid #00ffff; border-radius: 10px;">
          <h2 style="color: #00ffff; text-align: center; margin-bottom: 30px;">🚀 AR PORTFOLIO CONTACT PROTOCOL 🚀</h2>
          
          <div style="background-color: #001122; padding: 15px; border: 1px solid #00ffff; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #00ffff; margin: 0 0 10px 0;">CONTACT DETAILS:</h3>
            <p style="margin: 5px 0;"><strong>NAME:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>EMAIL:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>TIMESTAMP:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #001122; padding: 15px; border: 1px solid #00ffff; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #00ffff; margin: 0 0 10px 0;">MESSAGE PAYLOAD:</h3>
            <div style="background-color: #000; padding: 10px; border-left: 3px solid #00ffff; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #00ffff;">
            <p style="color: #888; font-size: 12px;">
              ✅ MESSAGE TRANSMITTED SUCCESSFULLY<br>
              🔒 SECURE AR PORTFOLIO SYSTEM v3.0.0<br>
              📡 ORIGIN: portfolio.kwadwo-ampadu-yeboah.com
            </p>
          </div>
        </div>
      `,
      // Plain text fallback
      text: `
AR PORTFOLIO CONTACT FORM SUBMISSION

From: ${name}
Email: ${email}
Time: ${new Date().toLocaleString()}

Message:
${message}

---
Sent via AR Portfolio System v3.0.0
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}