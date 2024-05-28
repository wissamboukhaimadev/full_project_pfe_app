import nodemailer from "nodemailer"


export const send_email_central = (current: string, tension: string) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boukhaimawissam2004@gmail.com', // your Gmail address
            pass: 'hfju gqyi dyzy xgnc' //app password
        }
    });

    let mailOptions = {
        from: 'boukhaimawissam2004@gmail.com',
        to: 'Khalilboss2005@gmail.com',
        subject: 'Notifications',
        html: `
    <h1>wa hiya had zaml</h1>
    <p>tension rah kbira bzaf o db = </p>
    `,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}