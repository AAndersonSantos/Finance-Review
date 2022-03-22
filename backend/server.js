require('dotenv').config();
const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 8080
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(cors())

const usuarios = require('./models/users');
const financeiro = require('./models/financial');

//--------------------------------------- cadastrar ----------------------------
app.post("/cadastrar", async (req, res) => {

  let {first_name, last_name, email, password, confirmPassword} = req.body

  if(!first_name){
      return res.status(422).json({msg: "O campo nome é obrigatório"})
  }

  if(!last_name){
      return res.status(422).json({msg: "O campo sobrenome é obrigatório"})
  }

  if(!email){
      return res.status(422).json({msg: "O campo email é obrigatório"})
  }

  if(!password){
      return res.status(422).json({msg: "O campo password é obrigatório"})
  }

  if(password !== confirmPassword){
      return res.status(422).json({msg: "As senhas não conferem"})
  }

  const userExists = await usuarios.findOne({ where: {email: email}})

  if(userExists){
      return res.status(422).json({msg: "Esse email ja existe"})
  }

  //create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new usuarios({
      first_name,
      last_name,
      email,
      password: passwordHash,
  })

  try {

      await user.save()
      res.status(201).json({msg: "Usuario salvo com sucesso"})

  } catch (erro){
      console.log(erro)
      res.status(500).json({msg: "Aconteceu um erro"})
  }
})

//--------------------------------------- login ----------------------------
app.post("/login", async (req, res) => {

  const {email, password} = req.body

  if(!email){
      return res.status(422).json({msg: "O campo email é obrigatório"})
  }

  if(!password){
      return res.status(422).json({msg: "O campo password é obrigatório"})
  }

  //chech if user exists
  const user = await usuarios.findOne({ where: {email: email} })

  if(!user){
      return res.status(422).json({error: "Usuário não encontrado"})
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)

  const payload = {
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  }

  if(!checkPassword){
      return res.status(422).json({error: "senha inválida!"})
  }

  try {
      const secret = process.env.SECRET_KEY
      const token = jwt.sign(payload, secret, { expiresIn: '1h' })
      res.status(200).json({msg: "Autenticação realizada com sucesso", token})

  } catch (erro){
      console.log(erro)
      res.status(500).json({msg: "Aconteceu um erro"})
  }

})

//----------------------------------- perfil -------------------------------------
app.get('/perfil',  async (req, res) => {
  const secret = process.env.SECRET_KEY
  var decoded = jwt.verify(req.headers['authorization'], secret)
  const user = await usuarios.findOne({ _id: decoded._id })

    if (user) {
        res.status(200).json(user)
    }
      
    if (!user) {
        res.status(400).json({error: 'Usuario não existe!'})
    }
})

//---------------------------------- registrar-valor ------------------------------
app.post('/registrar-valor', (req, res) => {
  const userData = {
  cash_value: req.body.cash_value,
  description: req.body.description
}

financeiro.create(userData).then(function(){
      res.status(200).json({ message: 'Salvo com sucesso!' });
  }).catch(function(erro){
      res.send("Houve um erro: " + erro)
  })
    
})

//----------------------------------- lista de valores -----------------------------
app.get('/lista-de-valores', function(req, res) {
  financeiro.findAll().then((usuarios) => {
      res.status(200).json(usuarios)
  }).catch((err) => {
      res.status(400).json({error: "Houve um erro", err})
  })
})

//------------------------------------ lista de valores por Id -----------------------
app.get('/lista-de-valores/:id', function(req, res){
    financeiro.findByPk(req.params.id).then(function(posts){
        res.status(200).json(posts);
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

//-------------------------------------- Valor total --------------------------------
app.get('/total', function(req, res){
    financeiro.sum('cash_value').then(function(value){
        res.status(200).json(value);
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

//-------------------------------------- Editar -------------------------------------
app.put('/editar/:id', function(req, res){
  financeiro.update({ cash_value: req.body.cash_value, description: req.body.description}, {where: {'id': req.params.id}}).then(function(usuarios){
      res.status(200).json({ message: 'Atualizado com sucesso' });
  }).catch(function(erro){
      res.send("Houve um erro: " + erro)
  })
})

//---------------------------------------- Deletar ------------------------------------
app.delete('/deletar/:id', function(req, res){
    
    financeiro.destroy({where: {'id': req.params.id}}).then(function(){
        res.status(200).json({ message: 'Deletado com sucesso' });
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

app.listen(port, () => {
    console.log("Servidor conectado na porta: " + port)
})