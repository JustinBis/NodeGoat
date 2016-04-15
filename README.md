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

## Attack 4 
#### Unprotected endpoint at /allocations
Any logged in user can access any other users allocations page

#### Description
The allocations page has a check to ensure a user is logged in, but performs the db lookup in the allocations collection using a user id passed in by a query parameter, which does not have to be tied to the user logged in. Therefore a user can be logged into any account, hit the /allocations/1 endpoint, and be shown the admin user's allocation page.

#### Files
/app/routes/allocations.js

#### Fix
Change line 21	to use session variable (req.session.userId) instead of query parameter (req.params.userId)

## Attack 5
#### Unprotected endpoint at /benefits
Any logged in user can access the benefits page

#### Description
The benefits page can have anyone (not just the admin) access it

#### Files
/app/routes/index.js

#### Fix
Added function isAdminLoggedIn, checking userId to be admin before accessing the benefits page

