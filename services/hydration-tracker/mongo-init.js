db.createUser(
    {
        user: process.env.MONGO_ROOT_USERNAME,
        pwd: process.env.MONGO_ROOT_PASSWORD,
        roles: [
            {
                role: "readWrite",
                db: process.env.MONGO_DB_NAME
            }
        ]
    }
);