import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../Models/UserModel.js';
import transporter from '../Config/nodeMailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../Config/EmailTemplates.js';

const isRenderRequest = (req) => req.hostname?.includes('.onrender.com');


export const register = async (req, res)=> {
    const {name, email, password} = req.body;
    const isRender = isRenderRequest(req);


    if(!name || !email || !password) {
        return res.json({success : false, message : "Missing details"})
    }

    try {
        const existingUser = await UserModel.findOne({email})
        if(existingUser) {
            return res.json({success : false, message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({name, email, password : hashedPassword});
        await user.save();

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '7d'});
        res.cookie('token', token, {
            httpOnly : true,
            secure : isRender,
            sameSite : isRender ? 'none' : 'lax',
            maxAge : 7 * 24 * 60 * 60 * 1000
        });

        //Sending welcome email
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : 'Welcome to CRM',
            text : `Welcome to mini CRM system. Your account has been created with email id : ${email}`
        }
        await transporter.sendMail(mailOptions);

        return res.json({success : true});
  
    } catch(error) {
        res.json({success : false, message : error.message})
    }
}

export const login = async(req, res)=> {
    const {email, password} = req.body;
    const isRender = isRenderRequest(req);


    if(!email || !password) {
        return res.json({success : false, message : "Email and password are required"})
    }

    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            return res.json({success : false, message : "Invalid Email"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success : false, message : "Invalid password"});
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '7d'});
        res.cookie('token', token, {
            httpOnly : true,
            secure : isRender,
            sameSite : isRender ? 'none' : 'lax',
            maxAge : 7 * 24 * 60 * 60 * 1000
           });

        return res.json({success : true});

    } catch(error) {
        return res.json({success : false, message : error.message});
    }
}

export const logout = async(req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV == 'production' ? 'none' : 'strict'
        })

        return res.json({success : true, message : "Logged Out"});

    } catch(error) {
        return res.json({success : false, message : error.message});
    }
}

//send verification otp to user
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId; // ✅ get from req.userId instead of req.body

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing from request" });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            //text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Verification OTP sent on Email" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Verify the email using otp
export const verifyEmail = async (req, res) => {
    const userId = req.userId; // ✅ comes from middleware
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" }); // ✅ fixed typo
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


//Check if user is logged in or not
export const isAuthenticated = async(req, res)=> {
    try {
        return res.json({success : true});

    } catch(error) {
        res.json({success : false, message : error.message});
    }

}


//Send password reset otp
export const sendResetOtp = async(req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.json({success : false, message : "Email is required"});
    }

    try {

        const user = await UserModel.findOne({email});
        if(!user) {
            return res.json({success : false, message : "User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() +  15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password reset OTP',
            //text: `Your OTP for resetting your password is ${otp}. Reset your password using this OTP.`,
            html : PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };

        await transporter.sendMail(mailOptions);

        return res.json({success : true, message : "OTP sent to your Email."});

    } catch(error) {
        return res.json({success : false, message : error.message});
    }
}


//Reset user password
export const resetPassword = async(req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword) {
        return res.json({success : false, message : "Email, OTP and new password is required."});
    }

    try {

        const user = await UserModel.findOne({email});
        if(!user) {
            return res.json({success : false, message : "User not found"});
        }

        if(user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({success : false, message : "Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()) {
            return res.json({success : false, message : "OTP Expires"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success : true, message : "Password has been reset successfully"});

    } catch(error) {
        return res.json({success : false, message : error.message});
    }
}