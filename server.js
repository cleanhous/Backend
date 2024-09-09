const app = require('./src/app.js');

const PORT = 3000;

app.get("/", (req,res)=>{
  res.send("Olá Mundo")
})

app.listen(PORT, () => {
  console.log('servidor escutando!')
})
