import bcrypt from 'bcryptjs'
const users = [
    {
        name: "Siddharth Garg",
        email: "admin@admin",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true

    },
    {
        name: "Buyer 1",
        email: "buyer1@example",
        password: bcrypt.hashSync('123456', 10)

    },
    {
        name: "Buyer 2",
        email: "buyer2@example",
        password: bcrypt.hashSync('123456', 10)

    }
]

export default users;