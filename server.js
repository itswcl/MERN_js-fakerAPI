const faker = require('@faker-js/faker')
const express = require("express")
const app = express();
const port = 8080;

// Middleware after app and above app.get/app.post
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

class User {
    constructor() {
        this._id = faker.datatype.uuid();
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}

class Company {
    constructor() {
        this._id = faker.datatype.uuid();
        this.name = faker.company.companyName();
        this.address = {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        };
    }
}

// GET request to return a new user info
app.get("/api/users/new", (req, res) => {
    res.json(new User);
})
// GET request to return a new company info
app.get("/api/company/new", (req, res) => {
    res.json(new Company);
})
// GET request to return a new user and company info
app.get("/api/user/company", (req, res) => {
    res.json({
        user: new User,
        company: new Company
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})