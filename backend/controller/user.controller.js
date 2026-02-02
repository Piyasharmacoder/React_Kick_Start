
import { validationResult } from "express-validator";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { Roll } from "../model/association.js"
import SendMail from "../middleware/mail.js";
import generateOTP from "../middleware/generateOTP.js";
import sendOTP from "../middleware/generateOTP.js";

let EmailTemplate, subject;

// insert  into users table ( name , email , password, contactNumber, address,rollId ,  departmentId, isActive )values( "name" , "email" , "password"," contactNumbe"r, "address,rollId" ,  "departmentId", "isActiv")
export const SignUp = async (request, response) => {
    //error validation message using express -validator
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }

    // check  user  from database by email user exists or not
    let user = await User.findOne({ where: { email: request.body.email }, raw: true });

    if (!user) {

        // generate OTP
        let otp = generateOTP();
        // send OTP to user email
        EmailTemplate = `Your One Time Password (OTP) is: ${otp}`
        subject = "One Time Password (OTP)"
        sendOTP(
            request.body.email,
            subject, EmailTemplate);

        EmailTemplate = `<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width , initial-scale=1.0"> <title>Email Template</title> <style>body {margin: 0;padding: 0;font-family: Arial, sans-serif;background-color: #eaf2f8;}.email-container {max-width: 600px; margin: 30px auto;background: #ffffff;border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);overflow: hidden;animation: fadeIn 1.2s ease-in-out; }@keyframes fadeIn { from { opacity: 0;transform: translateY(20px);}to { opacity: 1;transform: translateY(0);  }}.header {  background-color: #2c3e50;  color: white;  padding: 20px;  display: flex;  align-items: center;  justify-content: space-between; }.header img { width: 60px;   } .header h1 { margin: 0; font-size: 24px; flex: 1; text-align: center; } .content { padding: 20px;text-align: center; } .content h2 { color: #2c3e50; font-size: 22px; } .content p { color: #7f8c8d; line-height: 1.6; }.content .button { display: inline-block; margin: 20px auto; padding: 10px 20px; background: #1abc9c; color: #fff; text-decoration: none; border-radius: 5px;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);transition: transform 0.3s, box-shadow 0.3s; } .content .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); }.social-links { margin-top: 20px;   } .social-links img { width: 32px; margin: 0 10px;transition: transform 0.3s;  }  .social-links img:hover { transform: scale(1.2); } .footer { background: #bdc3c7; text-align: center; padding: 10px; font-size: 14px; color: #2c3e50;}</style></head><body> <div class="email-container"><div class="header"> <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930"alt="Logo"><h1>REACTKICKSTART</h1></div><div class="content"><h2>Welcome to ReactKickstart..!</h2><p> Your One Time Password  is <h3> ${otp}</h3>.</p><a href="#" class="button">Go to Dashboard</a><div class="social-links"><a href="#"><img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"  alt="Facebook"></a><a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram"></a></div></div><div class="footer"> &copy; 2025 ReactKickstart. All Rights Reserved. </div></div></body></html>`
        subject = 'Your One Time Passwaord is to Varify your Email '
        SendMail(request.body.email, subject, EmailTemplate)



        // create user using create methode
        User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            contactNumber: request.body.contactNumber,
            rollId: request.body.rollId,
            isDeleted: request.body.isDeleted
        })
            //promiss response
            .then((result) => {
                EmailTemplate = '<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width , initial-scale=1.0"> <title>Email Template</title> <style>body {margin: 0;padding: 0;font-family: Arial, sans-serif;background-color: #eaf2f8;}.email-container {max-width: 600px; margin: 30px auto;background: #ffffff;border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);overflow: hidden;animation: fadeIn 1.2s ease-in-out; }@keyframes fadeIn { from { opacity: 0;transform: translateY(20px);}to { opacity: 1;transform: translateY(0);  }}.header {  background-color: #2c3e50;  color: white;  padding: 20px;  display: flex;  align-items: center;  justify-content: space-between; }.header img { width: 60px;   } .header h1 { margin: 0; font-size: 24px; flex: 1; text-align: center; } .content { padding: 20px;text-align: center; } .content h2 { color: #2c3e50; font-size: 22px; } .content p { color: #7f8c8d; line-height: 1.6; }.content .button { display: inline-block; margin: 20px auto; padding: 10px 20px; background: #1abc9c; color: #fff; text-decoration: none; border-radius: 5px;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);transition: transform 0.3s, box-shadow 0.3s; } .content .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); }.social-links { margin-top: 20px;   } .social-links img { width: 32px; margin: 0 10px;transition: transform 0.3s;  }  .social-links img:hover { transform: scale(1.2); } .footer { background: #bdc3c7; text-align: center; padding: 10px; font-size: 14px; color: #2c3e50;}</style></head><body> <div class="email-container"><div class="header"> <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930"alt="Logo"><h1>REACTKICKSTART</h1></div><div class="content"><h2>Welcome to ReactKickstart..!</h2><p>Your registration was successful. You can now access all our features and services.</p><a href="#" class="button">Go to Dashboard</a><div class="social-links"><a href="#"><img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"  alt="Facebook"></a><a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram"></a></div></div><div class="footer"> &copy; 2025 ReactKickstart. All Rights Reserved. </div></div></body></html>'
                subject = 'Registration Successfully in Send Gmail Testing Environment React Kick Start...'
                // send email massaege to user 
                SendMail(request.body.email, subject, EmailTemplate)
                return response.status(201).json({ message: "User SignUp successfully..", result })
            })
            .catch((err) => {
                return response.status(500).json({ error: "Internal server error..", err })
            })
    }
    else
        return response.status(500).json({ error: "This EmailId are Already Exist ......" });

}



export const Login = async (request, response, next) => {

    //error validation message using express -validator
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }

    //get user  email and password from request body
    let email = request.body.email;
    let password = request.body.password;
    // Send email Atribute 
     EmailTemplate = '<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width , initial-scale=1.0"> <title>Email Template</title> <style>body {margin: 0;padding: 0;font-family: Arial, sans-serif;background-color: #eaf2f8;}.email-container {max-width: 600px; margin: 30px auto;background: #ffffff;border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);overflow: hidden;animation: fadeIn 1.2s ease-in-out; }@keyframes fadeIn { from { opacity: 0;transform: translateY(20px);}to { opacity: 1;transform: translateY(0);  }}.header {  background-color: #2c3e50;  color: white;  padding: 20px;  display: flex;  align-items: center;  justify-content: space-between; }.header img { width: 60px;   } .header h1 { margin: 0; font-size: 24px; flex: 1; text-align: center; } .content { padding: 20px;text-align: center; } .content h2 { color: #2c3e50; font-size: 22px; } .content p { color: #7f8c8d; line-height: 1.6; }.content .button { display: inline-block; margin: 20px auto; padding: 10px 20px; background: #1abc9c; color: #fff; text-decoration: none; border-radius: 5px;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);transition: transform 0.3s, box-shadow 0.3s; } .content .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); }.social-links { margin-top: 20px;   } .social-links img { width: 32px; margin: 0 10px;transition: transform 0.3s;  }  .social-links img:hover { transform: scale(1.2); } .footer { background: #bdc3c7; text-align: center; padding: 10px; font-size: 14px; color: #2c3e50;}</style></head><body> <div class="email-container"><div class="header"> <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/06/Starbucks_Corporation_Logo_2011.svg-e1657703028844.png?auto=format&q=60&fit=max&w=930"alt="Logo"><h1>REACTKICKSTART</h1></div><div class="content"><h2>Welcome  Back to ReactKickstart..!</h2><p>Your SignIn was successful. You can now access all our features and services.</p><a href="#" class="button">Go to Dashboard</a><div class="social-links"><a href="#"><img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"  alt="Facebook"></a><a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram"></a></div></div><div class="footer"> &copy; 2025 ReactKickstart. All Rights Reserved. </div></div></body></html>'
     subject = ' WeLCome Back SignIn Successfully in Send Gmail Testing Environment React Kick Start...'


    // check  user  from database by email user exists or not
    let user = await User.findOne({ where: { email: email }, raw: true });

    // if user exists and password is correct then generate token
    if (user) {
        // compare password with user password saved in database
        // checkPassword - ek method
        if (User.checkPassword(password, user.password)) {

            //  payload contains uer Infromation or data  for generate token
            let payload = user;
            let secretkey = "piya@20";
            let token = jwt.sign(payload, secretkey, { expiresIn: '1m' });

            // send email Message  to user
            SendMail(request.body.email, subject, EmailTemplate)

            return response.status(200).json({ message: "Sign In Success", token: token, });
        } else {
            return response.status(401).json({ error: "Unauthorized user" });

        }
    }
    else
        return response.status(500).json({ error: "Internal Server error...." });

}


// select* from users
export const List = (request, response) => {
    User.findAll({ include: [{ model: Roll, as: 'roll' }] })   // provide assosiaction between user and users rolls show at on time 
        .then((result) => {
            return response.status(200).json({ message: "User list show ..", data: result })

        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })

}

// delete  from users where id = /?
export const SoftDelete = (request, response, next) => {
    //error validation message using express -validator
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }
    // update user
    User.update({
        isDeleted: request.body.isDeleted
    }, {
        where: { id: request.body.id }

    })
        .then((result) => {
            if (result) {
                return response.status(200).json({ message: "User deleted successfully.." })
            } else {
                return response.status(404).json({ message: "User not found.." })
            }

        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })

}

// update user details ( name , email , password, contactNumber, address,rollId ,  departmentId, isActive ) where id = userId;

export const Update = (request, response, next) => {

    //error validation message using express -validator
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({ errors: error.array() });
    }
    // update user
    User.update({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        contactNumber: request.body.contactNumber,
        address: request.body.address,
        rollId: request.body.rollId,
        isDeleted: request.body.isDeleted
    }, {
        where: {
            id: request.body.id
        }
    })
        .then((result) => {
            if (result[0]) {
                return response.status(200).json({ message: "User updated successfully.." })
            } else {
                return response.status(404).json({ message: "Unautherzied request....." })
            }
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error..", err })
        })
}




