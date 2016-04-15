var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


/* The ProfileDAO must be constructed with a connected database object */
function ProfileDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof ProfileDAO)) {
        console.log("Warning: ProfileDAO constructor called without 'new' operator");
        return new ProfileDAO(db);
    }

    var users = db.collection("users");


    /*************** SECURITY ISSUE ****************
     ** Sensitive data should be handled with     **
     ** encyrption. Check out the "crypto" module **
     ***********************************************/

    this.updateUser = function(userId, firstName, lastName, ssn, dob, address, bankAcc, bankRouting, callback) {

        // Create user document
        var user = {};
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (address) {
            user.address = address;
        }
        if (bankAcc) {
            user.bankAcc = bankAcc;
        }
        if (bankRouting) {
            user.bankRouting = bankRouting;
        }
        if (ssn) {
            user.ssn = encrypt(ssn);//crypto.AES.encrypt(ssn, insecureSecret); //<- what if your server gets hacked?
            //encrypt sensitive fields!
        }
        if (dob) {
            user.dob = dob;
        }

        users.update({
                _id: parseInt(userId)
            }, {
                $set: user
            },
            function(err, result) {
                if (!err) {
                    console.log("Updated user profile");
                    return callback(null, user);
                }

                return callback(err, null);
            }
        );
    };

    this.getByUserId = function(userId, callback) {
        users.findOne({
                _id: parseInt(userId)
            },
            function(err, user) {
                if (err) return callback(err, null);

                // Here, we're finding the user with userID and
                // sending it back to the user, so if you encrypted
                // fields when you inserted them, you need to decrypt
                // them before you can use them.
                if(user.ssn){
                     user.ssn = decrypt(user.ssn);
                }
                callback(null, user);
            }
        );
    };
}

module.exports.ProfileDAO = ProfileDAO;
