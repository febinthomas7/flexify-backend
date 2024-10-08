const generatePasswordUpdateTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Update Successful</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="width: 100%; max-width: 310px; background-color: #ffffff; padding: 20px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #dddddd;">
      <h2 style="margin: 0; font-size: 24px; color: #333333;">Password Update Successful</h2>
    </div>
    <div style="padding: 20px; font-size: 16px; color: #333333; line-height: 1.6;">
      <p style="margin-top: 0;">Hello,</p>
      <p>Your password has been updated successfully. You can now log in to your account using your new password.</p>
      <p>If you did not make this change, please contact our support team immediately to secure your account.</p>
      <p>Thank you for keeping your account secure!</p>
      <p>Best regards,<br>Flexifyy</p>
    </div>
    
  </div>
</body>
</html>
`;

const generateEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="width: 100%; max-width: 340px; background-color: #ffffff; padding: 20px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #dddddd;">
      <h2 style="margin: 0; font-size: 24px; color: #333333;">Password Reset Request</h2>
    </div>
    <div style="padding: 20px; font-size: 16px; color: #333333; line-height: 1.6;">
      <p style="margin-top: 0;">Hello,</p>
      <p>We received a request to reset your password. Please use the following OTP (One-Time Password) to reset your password. This OTP is valid for the next 10 minutes.</p>
      <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 20px; font-weight: bold; color: #ffffff; background-color: #4CAF50; border-radius: 5px;">
        ${otp}
      </div>
      <p>If you didn't request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
      <p>Best regards,<br>Flexifyy</p>
    </div>
    
  </div>
</body>
</html>
`;

module.exports = {
  generatePasswordUpdateTemplate,
  generateEmailTemplate,
};
