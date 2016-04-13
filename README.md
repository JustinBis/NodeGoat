# CS132 Security Lab
Group 45

## Attack 1
#### Vulnerability: Information Leak
too much information is leaked on login attempts

#### Description
When attempting a login, two possible error messages are returned: "Invalid username" or "Invalid password." This allows an attacker to learn if a username exists, which is more information than is needed in reporting the login error. This would allow an attacker to learn every username via brute force, or alternatively would allow an attacker to check if known usernames from previous data leaks exist on this website as well.

Instead, only a single error message should be returned ("Invalid username or password")

#### Files
/route/session.js

#### Fix
Change line 67 and 75 to read: `loginError: "Invalid username or password"`


## Attack 2
#### Vulnerability: Stored XSS
Forms on the site do not sanitize inputs properly to remove html

#### Description
Input forms that are relayed back to the user (such as the username) allow html to be submitted in addition to plain text. Then, the templating language (swig for this site) has autoescaping turned off, so this input is directly used and sent back to the user's browser, which sees it as html and renders it. In the worst case, this includes a &lt;script&gt; tag that causes the victim user to execute javascript.

#### Files
/route/server.js

#### Fix
Change line 72 to read "autoescape: true"
This reenables swig (the template engine)'s autoescaping so that stored XSS no longer works


## Attack 3
#### Vulnerability: Arbitrary Code Execution on Server

#### Description
The preTax, afterTax, and roth contribution variables in the contributions route use `eval()` to convert use inputs to integers. This allows any arbitrary input to be run as code on the server.

Instead, `parseInt()` should be used to perform this conversion.

#### Files
/route/server.js

#### Fix
Change line 72 to read "autoescape: true"
This reenables swig (the template engine)'s autoescaping so that stored XSS no longer works
