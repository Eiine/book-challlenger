const bcryptjs = require('bcryptjs');
const session = require('express-session');

const db = require('../database/models');
const Author = require('../database/models/Author');

const mainController = {
  home: async (req, res) => {
    
   
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: async (req, res) => {
    let category=req.cookies.user
    
    let id=req.params.id
    
    
    let datos=await db.Book.findAll({ where: id={id},include: [{ association: 'authors' }] });
      
      
      res.render("bookDetail",{data:datos,category})
    
   
  },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: async (req, res) => {
    
    
    let title=req.body.title.toLowerCase()
    let libros= await db.Book.findAll()
    
    const books= await libros.filter(libro=>libro.dataValues.title.toLowerCase().includes(title))
    
    res.render("search",{ books });


  },
  deleteBook:async (req, res) => {
    
    //debera aplñicarse las siguientes sentencias en la base de datos para
    //que este endpoint funcione de manera correcta
    //use library;
    //alter table booksauthors drop foreign key booksauthors_ibfk_2 ;
    //select * from booksauthors;
    
   
   const borrar= await db.Book.destroy({where:{id:req.params.id}});
    res.redirect("/")
  },
  authors: (req, res) => {
    
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: async (req, res) => {
    
    let id= req.params.id
    let data= await db.Book.findAll({where: { id:id }})
           
      res.render("authorBooks",{data})
    

    ;
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  logout:(req,res)=>{

    req.session.destroy();
    res.clearCookie("user")
    res.redirect("/")

  },
  
  processLogin: async (req, res) => {
    let {email,password}=req.body;
    
    //Compara el usuaruio exista en la base de datos y si no existe redirige a register
    let ComprobandoUsuarios= await db.User.findOne(({ where: { Email:email} }))
    
    
    if (ComprobandoUsuarios===null) {
      
      res.render("register")
      
    
    }else{
      let category=ComprobandoUsuarios.CategoryId
      //comprueba la contraseña con la registrada si es corrta renderiza y envia books a home
      let comprobandoPass= await bcryptjs.compare(password, ComprobandoUsuarios.Pass)
       if(comprobandoPass===true){
          //definiendo el roll del usuario
          res.cookie("user", category,"logueado");
         
        let books= await db.Book.findAll({
          include: [{ association: 'authors' }]
        })
        
        
        res.redirect("/")
       }else{
        
        res.render("register")
       }
    }



  },
  edit: async (req, res) => {
    let id=req.params.id
    
    

    let info= await db.Book.findAll({ where: id={id}})
    
    const dato = {
      title: info[0].dataValues.title,
      cover: info[0].dataValues.cover,
      description:info[0].dataValues.description,
      id:info[0].dataValues.id,
      
    }
    
    res.render('editBook', {id: id, data:dato})
    
  },
  processEdit:async (req, res) => {
    let id=req.params.id
    
    console.log(id);
    let {title, cover, description}=req.body
    
    let modificar= await db.Book.update({
      title:title,
      cover:cover,
      description:description
    },{
      where:{id:id}
    }

    )
  
    let books= await db.Book.findAll({
      include: [{ association: 'authors' }]
   
    
  })
  
    res.render('home',{books});
  }
};

module.exports = mainController;
