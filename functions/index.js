const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//Twillo Details
const accountSid = 'AC6ad17cc78693cc03ba7736af9863ff98';
const authToken = '6eae95409329133e6f770319e3e20bc5';
const client = require('twilio')(accountSid, authToken);

//Email service
var nodemailer = require('nodemailer');
var google = { "email": 'bloodcomponentsemail@gmail.com', "password": 'test1234!' }


exports.addAdminRole = functions.https.onCall((data, context) => {
    // if (context.auth.token.admin !== true) {
    //     return { error: 'Only admins can add other admins' }
    // }
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            userLevel: "admin"
        })
    }).then(async () => {
        functions.logger.info((await admin.auth().getUserByEmail(data.email)).customClaims)
        return {
            message: `Success! ${data.email} has been made an admin.`
        }
    }).catch(err => {
        return err;
    });
});



exports.addCordRole = functions.https.onCall((data, context) => {
    // if (context.auth.token.admin !== true) {
    //     return { error: 'Only admins can add Cordinators' }
    // }

    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            userLevel: "cord"
        })
    }).then(async () => {
        functions.logger.info((await admin.auth().getUserByEmail(data.email)).customClaims)
        return {
            message: `Success! ${data.email} has been made an cordinator.`
        }
    }).catch(err => {
        return err;
    });
});



exports.addHospitalCordRole = functions.https.onCall((data, context) => {

    const { email, hospitalName } = data

    if (email && hospitalName) {
        return admin.auth().getUserByEmail(email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                userLevel: "hospitalCord",
                hospital: hospitalName,
            })
        }).then(async () => {
            functions.logger.info((await admin.auth().getUserByEmail(data.email)).customClaims)
            return {
                message: `Success! ${email} has been made a hospital cordinator in ${hospitalName}.`
            }
        }).catch(err => {
            return err;
        });
    }
});



exports.removeRole = functions.https.onCall((data, context) => {
    // if (context.auth.token.admin !== true) {
    //     return { error: 'Only admins can add Cordinators' }
    // }

    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            userLevel: "none",
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has had their access removed.`
        }
    }).catch(err => {
        return err;
    });
});



exports.sendSMS = functions.https.onCall((data, context) => {

    try {
        //info recieved from client
        console.log("data from app:", data.list)

        //code for looping through list and sending multiple SMS
        data.list.forEach((person) => {

            //send person.msg to person.phone

            client.messages
                .create({
                    body: person.msg,
                    from: '+12058947917',
                    to: person.phone
                })
                .then(message => console.log(message.sid))
                .catch(err => console.log("error:", err))

            console.log(person.msg, ". Send to:", person.phone)
        })

        //return to confirm sent
        return {
            message: `Success! ${data.list.length} messages sent`
        }
    }
    catch (error) {
        return error.message;
    }
});



exports.sendEmail = functions.https.onCall((data, context) => {
    try {
        //info recieved from client
        console.log("data from app:", data.list)

        //code for gmail account - move to enviroment varible
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: google.email,
                pass: google.password
            }
        });

        //code for looping through list and sending multiple SMS
        data.list.forEach((person) => {

            //send person.msg to person.phone
            var mailOptions = {
                from: google.email,
                to: person.email,
                subject: 'Emergency Blood Request - Help Needed',
                html: person.msg
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            console.log(person.msg, ". Send to:", person.phone)

        })
        //return to confirm sent
        return {
            message: `Success! ${data.list.length} messages sent`
        }
    }
    catch (error) {
        return error.message;
    }
});


// Waiting for upgraded account to implement
/*
exports.scheduledNotifications = functions.pubsub.schedule('59 10 * * *').timeZone('Asia/Jerusalem').onRun(async()=> {

const sendToUsers = await admin.firestore().collection("users").where("notifications.ReminderFrequency", "!=", "0").get()

})*/