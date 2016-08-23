module.exports = {
  "DATABASE_URI": "postgres://localhost:5432/web-refinery",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
  "consumerKey": "vqoyFq2Yff9vA5HzmmDiYAnm5",
"consumerSecret": "0UfQlOLfrHjJQOs1O6rrhQa0GAh6i8y3j0VIw1rOOpYIDyiiEe",
"callbackUrl": "http://localhost:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "INSERT_FACEBOOK_CLIENTID_HERE",
    "clientSecret": "INSERT_FACEBOOK_CLIENT_SECRET_HERE",
    "callbackURL": "INSERT_FACEBOOK_CALLBACK_HERE"
  },
  "GITHUB": {
"clientID": "10c89ad1d528255e1695",
"clientSecret": "55f7f77b2cfb92c33770a5b56287c6b8f0a04230",
"callbackURL": "http://localhost:1337/auth/github/callback"
  },

  "GOOGLE": {
 "clientID": "729684452588-dcvdg2ia72mpliicekhci2jite8rco5j.apps.googleusercontent.com",
"clientSecret": "jeY4ju8_R_o9V-8Q_Czs7eCx",
"callbackURL": "http://localhost:1337/auth/google/callback"
  },
  "LOGGING": true
};
