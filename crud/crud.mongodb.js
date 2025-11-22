//crup operations in mongodb

//CREATE
use("CrudDb")
// to create collection in the database
db.createCollection("users")

//for insertion documents in the collection
// db.users.insertOne({
//     name:'papai',
//     couse: 'nodejs'
// })

// db.users.insertMany([
//   {
//     "name": "Java Programming",
//     "price": 20000,
//     "instructor": "Harry"
//   },
//   {
//     "name": "Python Basics",
//     "price": 15000,
//     "instructor": "Rohan"
//   },
//   {
//     "name": "JavaScript Mastery",
//     "price": 18000,
//     "instructor": "Ankit"
//   },
//   {
//     "name": "Node.js Backend",
//     "price": 22000,
//     "instructor": "Sneha"
//   },
//   {
//     "name": "React Developer Course",
//     "price": 25000,
//     "instructor": "Vikram"
//   },
//   {
//     "name": "Next.js Full Stack",
//     "price": 30000,
//     "instructor": "Priya"
//   }
// ]
// )


// READ
let a = db.users.find({price:20000})
// console.log(a);

// console.log(a.count());
// console.log(a.toArray());
let b = db.users.findOne({price:20000})
console.log(b);


// UPDATE
db.users.updateMany({price:20000},
    {$set:{price:21000}}
)

// DELETE
db.users.deleteMany({price:21000})