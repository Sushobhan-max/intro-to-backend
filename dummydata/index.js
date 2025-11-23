import express from 'express'
import mongoose from 'mongoose'
import Employee from './models/Employee.js'

const app = express();
const port = 3000;
await mongoose.connect('mongodb://localhost:27017/company');
const name = ["John", "Jane", "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah"];
// const salary = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
const languages = ["English", "Spanish", "Mandarin", "French", "German", "Japanese", "Russian", "Portuguese", "Italian", "Korean"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
// const isManager = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

// Helper functions to generate random values
function getRandomName() {
    return name[Math.floor(Math.random() * name.length)];
}
function getRandomSalary() {
    return Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
}
function getRandomLanguage() {
    return languages[Math.floor(Math.random() * languages.length)]
}
function getRandomCities() {
    return cities[Math.floor(Math.random() * cities.length)]
}
function getRandomBoolean() {
    return Math.random() > 0.5;
}


app.get('/generate', async (req, res) => {

    await Employee.deleteMany({}); // Clear existing data

    const employees = []

    for (let i = 0; i < 10; i++) {
        const emp = new Employee({
            name: getRandomName(),
            salary: getRandomSalary(),
            language: getRandomLanguage(),
            city: getRandomCities(),
            isManager: getRandomBoolean()
        });

        await emp.save();
        employees.push(emp);
    };
    res.json({ employees });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
