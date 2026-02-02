import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "it21.priyankasharma@svceindore.ac.in", pass: "ctxx upiz vcvm sbxn"
    },
});
const Sendmail = () => {
    const mailDetails = {
        from: 'ReactKickStart@gmail.com',
        to:"it21.priyankasharma@svceindore.ac.in" ,
        subject: 'Registration Successfully in Send Gmail Testing Environment React Kick Start...',
        // text: 'Your Registration has been Successfully in Send Gmai Testing Environment React Kick Start...',
        html :'<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width , initial-scale=1.0"> <title>Email Template</title> <style>body {margin: 0;padding: 0;font-family: Arial, sans-serif;background-color: #eaf2f8;}.email-container {max-width: 600px; margin: 30px auto;background: #ffffff;border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);overflow: hidden;animation: fadeIn 1.2s ease-in-out; }@keyframes fadeIn { from { opacity: 0;transform: translateY(20px);}to { opacity: 1;transform: translateY(0);  }}.header {  background-color: #2c3e50;  color: white;  padding: 20px;  display: flex;  align-items: center;  justify-content: space-between; }.header img { width: 60px;   } .header h1 { margin: 0; font-size: 24px; flex: 1; text-align: center; } .content { padding: 20px;text-align: center; } .content h2 { color: #2c3e50; font-size: 22px; } .content p { color: #7f8c8d; line-height: 1.6; }.content .button { display: inline-block; margin: 20px auto; padding: 10px 20px; background: #1abc9c; color: #fff; text-decoration: none; border-radius: 5px;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);transition: transform 0.3s, box-shadow 0.3s; } .content .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); }.social-links { margin-top: 20px;   } .social-links img { width: 32px; margin: 0 10px;transition: transform 0.3s;  }  .social-links img:hover { transform: scale(1.2); } .footer { background: #bdc3c7; text-align: center; padding: 10px; font-size: 14px; color: #2c3e50;}</style></head><body> <div class="email-container"><div class="header"> <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930"alt="Logo"><h1>REACTKICKSTART</h1></div><div class="content"><h2>Welcome to ReactKickstart..!</h2><p>Your registration was successful. You can now access all our features and services.</p><a href="#" class="button">Go to Dashboard</a><div class="social-links"><a href="#"><img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"  alt="Facebook"></a><a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram"></a></div></div><div class="footer"> &copy; 2025 ReactKickstart. All Rights Reserved. </div></div></body></html>',
    };

    transporter.sendMail(mailDetails, function (err, result) {
        if (err) {
            console.log({Massage : "Error to Sending Email : ", err});
        }
        else {
            console.log("Email sent successfully : ", result);
        };
    });
};
// export default Sendmail;
Sendmail();