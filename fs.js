
const fs =  require('fs')

console.log('start');
// fs.writeFileSync('hello.txt','hello world');

fs.writeFile("papai.txt", "papai is a good boi", ()=>{
    console.log('done');
    fs.readFile("papai.txt", (error, data)=>{
        console.log(error, data.toString());
        
    })
})

fs.appendFile("papai.txt"," papairobo", (err, data)=>{
    console.log(data);
    console.log(err);
    
})
console.log('end');

