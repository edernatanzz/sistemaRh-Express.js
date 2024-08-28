import express from 'express';
import cors from 'cors';
import funcionario from './controllers/funcionario.js';

const app = express();
const port = 1080;

// Middleware
app.use(express.json()); //JSON
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 

// Rotas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rotas POST
app.post('/createfuncionario', funcionario.createFuncionario);
//rota de get
app.get('/getfuncionarios', funcionario.GetFuncionarios);
//rotas edit
app.put('/putfuncionario/:id',funcionario.updateFuncionario);

//rota delete
app.delete('/deletefuncionario/:id', funcionario.deleteFuncionario);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
