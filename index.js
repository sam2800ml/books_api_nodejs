import  Express  from "express";
import fs from "fs";
import bodyParser from "body-parser"


const app = Express();
app.use(bodyParser.json());

const readData = () => {
    try{
        const data = fs.readFileSync("./db.json")
        return JSON.parse(data);
    }catch(error){
        console.log(error)
    }
}

const writeData = (data) =>{
    try {
        fs.writeFileSync(`./db.json`,JSON.stringify(data)) // se pasan los datos a el formate en json
    } catch (error) {
        console.log(error)
    }

}


app.get("/libros", (req,res) => {
    const data = readData()
    res.json(data.books)
})

app.get( "/libros/:id" , ( req , res )=>{
    const data = readData()
    const id = parseInt(req.params.id);
    const book = data.books.find((book)=> book.id === id );
    res.json(book)
})

app.post( "/libros" , (req,res)=>{
    const data = readData();
    const body = req.body;
    const newBook ={
        id: data.books.length +1,
        ...body
    }
    data.books.push(newBook)
    writeData(data)
    res.json(newBook)
})

app.put("/libros/:id",(req,res)=>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book)=> book.id===id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    }
    writeData(data)
    res.json({message:"El libro ha sido actualizado"});
})

app.delete("/libros/:id", (req,res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book)=> book.id===id);
    data.books.splice(bookIndex,1);
    writeData(data);
    res.json({message:`Se ha eliminado el libro con id ${id}`})
})

app.get("/", (req, res) => {
    res.send("Hola muy  a todos, aca santiago 777")
})

app.listen(8000, () => {
    console.log("puerto 8000")
} );
