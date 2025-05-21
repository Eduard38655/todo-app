const dbconfig = {
  user:process.env.user ,
  password:process.env.password,
  server:process.env.server,
  database:process.env.database,
   options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export default dbconfig