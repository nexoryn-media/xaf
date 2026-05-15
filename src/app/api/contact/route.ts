import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
}

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
] as const;

const isString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getEnvError = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  return missing.length ? `Missing mail configuration: ${missing.join(", ")}` : "";
};

export async function POST(request: Request) {
  const envError = getEnvError();

  if (envError) {
    console.error(envError);
    return Response.json(
      { message: "Mail service is not configured yet." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = isString(payload.name) ? payload.name.trim() : "";
  const email = isString(payload.email) ? payload.email.trim() : "";
  const company = isString(payload.company) ? payload.company.trim() : "";
  const message = isString(payload.message) ? payload.message.trim() : "";

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json(
      { message: "Please provide a valid name, email, and message." },
      { status: 400 },
    );
  }

  const port = Number(process.env.SMTP_PORT);

  if (!Number.isInteger(port)) {
    console.error("SMTP_PORT must be a number.");
    return Response.json(
      { message: "Mail service is not configured correctly." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = company ? escapeHtml(company) : "Not provided";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    await transporter.sendMail({
      from: `"Nexoryn Media Contact" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Nexoryn Media application from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / Website: ${company || "Not provided"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>New Nexoryn Media application</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company / Website:</strong> ${safeCompany}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    return Response.json({ message: "Application sent." });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return Response.json(
      { message: "We could not send your application. Please try again." },
      { status: 500 },
    );
  }
}
