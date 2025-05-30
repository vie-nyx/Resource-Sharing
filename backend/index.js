const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');
const path = require('path'); 

const pdfRoutes = require('./routes/pdfs');  
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE','PUT'],
  credentials: true
}));

const fs = require('fs');
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/pdfManager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  app.get('/user/:email', (req, res) => {
    const { email } = req.params;
  
    FormDataModel.findOne({ email: email })
      .then(user => {
        if (user) {
          console.log(user);
          const { name, email } = user; 
          console.log(name, email); // Exclude sensitive data like password
          res.json({ name, email });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
          const { fullName, email, password } = req.body;
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})
app.use('/api/pdfs', pdfRoutes);
app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});