# Backend for my news website
Written in NodeJS + Express + JavaScript. 
##
## Getting started

Step 1. Restore datebase in postgreSQL via file.
######
Step 2. Use 
``` npm i ``` to upload packages from npm to your computer.
######
Step 3. Then you need to edit files in "super-ultra-hyper-mega-secret" (kinda lol) folder. You should edit file ```config.js``` with uri connection to postgreSQL.  
It should be in this format: 
```postgres://userName:userPassword@hostname:port/voltage```. Default postgres' port is 5432. I really don't recommend editing other files.
######
Step 4. To run this application, you can use two ways:
#####
First way:
You can use npm scripts via
```npm run prod```
<br>
Second way:
You can use a direct link to the index.js file via
```node index.js```

###
## Additional information
The project is in a complete revision. A more performance-oriented, architecturally correct version using the Golang language will be introduced in the future.
