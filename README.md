React Apollo Prisma boilerplate. Comes with fully completed authorization, form validation, user messaging with pagination, and some other stuff.

1. Run prisma deploy in server directory
2. Place your endpoint in .env file (run 'prisma info' in server directory for HTTP link to copy & paste). Also change the secret field.
3. Run npm start for the client and server. Run locally at port 4000 (default) or deploy on zeit (preconfigured with CORS).