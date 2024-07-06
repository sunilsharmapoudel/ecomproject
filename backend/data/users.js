import bcrypt from 'bcryptjs';

const users = [
    {
        name: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john.doe@example.com",
        password: bcrypt.hashSync("password", 10);
    }
]