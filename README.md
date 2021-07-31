# eos-application
The application side for the project EOS Monitor, includes backend and portal frontend (SEPA/B)
  
### Initial Setup
Uses a pretty similar structure to create-react-app, only difference mainly being the manual creation.
* Folder structure as follows (in client folder):
  * public
  * src
  * package.json  
  
The 'package.json' file holds all the dependancies and so when working on the project one should move into the client folder "`cd ./client`".
Then run the command "`npm install`", which should install all dependencies.
##### Any new dependencies/packages needed should be added to the list and the above command run again. (Or they can be added from the command line).    
  
    
The `index.html` file in the public folder doesn't need to be touched and the `index.js` file in src also doesn't need to be touched. The only files that would need modifying are
the `app.js` and `package.json` files. However files can be added to the mentioned folders.  

Most of the work should be done in the `src` folder, as one is to create pages, components and styles.
* components - for individual pieces that can be used main times (or to breakup chunks for simplicity).
* pages - the mainy different views to be used for routing purposes.
* styles - for any CSS styling (can choose to use bootstrap or SASS).
* app.js - can be modified, as this is the main component rendered and used for routing.

I suppose this is mainly for you @CompSciAlex, but anyone can view to understand.  
Let me know if anything else is needed.