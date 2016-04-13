# CS132 Security Lab
Group 45

## Attack 1
#### Vulnerability: Information Leak
too much information is leaked on login attempts

#### Files
/route/session.js

#### Description
When attempting a login, two possible error messages are returned: "Invalid username" or "Invalid password." This allows an attacker to learn if a username exists, which is more information than is needed in reporting the login error. This would allow an attacker to learn every username via brute force, or alternatively would allow an attacker to check if known usernames from previous data leaks exist on this website as well.

Instead, only a single error message should be returned ("Invalid username or password")


#### Fix
Change line 67 and 75 to read: `loginError: "Invalid username or password"`


## Attack 2
#### Vulnerability: XSS
Forms on the site do not sanitize inputs properly to remove html

#### Files
/route/session.js

#### Description
When attempting a login, two possible error messages are returned: "Invalid username" or "Invalid password." This allows an attacker to learn if a username exists, which is more information than is needed in reporting the login error. This would allow an attacker to learn every username via brute force, or alternatively would allow an attacker to check if known usernames from previous data leaks exist on this website as well.

Instead, only a single error message should be returned ("Invalid username or password")


#### Fix
Change line 67 and 75 to read: `loginError: "Invalid username or password"`

