const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // if (context.auth.token.admin !== true) {
    //     return { error: 'Only admins can add other admins' }
    // }
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            userLevel: "admin"
        })
    }).then(() => {
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
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an cordinator.`
        }
    }).catch(err => {
        return err;
    });
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