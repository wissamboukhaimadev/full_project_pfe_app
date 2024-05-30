import nodemailer from "nodemailer"


export const send_email_amphie = (temperature: string, humidity: string) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'boukhaimawissam2004@gmail.com', // your Gmail address
            pass: process.env.APPLICATION_PASSWORD as string//app password
        }
    });

    let mailOptions = {
        from: 'boukhaimawissam2004@gmail.com',
        to: 'akbouchabdelmajid@gmail.com',
        subject: 'Notifications',
        html: `
    <h2>Urgent Notification</h2>
    <p>the current values in amphie room of temperature and humidty are as follows: </p>
    <p>temperature : ${temperature} </p>
    <p>humidity : ${humidity} </p>
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