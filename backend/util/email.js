import { SMTPClient } from 'emailjs';
 
const client = new SMTPClient({
    user: process.env.EMAIL_NAME,
    password: process.env.EMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: true,
});
 
client.send(
    {
        text: 'i hope this works',
        from: `you <${process.env.EMAIL_NAME}@gmail.com>`,
        to: `me <${process.env.EMAIL_SEND_TO}>`,
        subject: 'testing emailjs',
    },
    (err, message) => {
        console.log(err || message);
    }
);