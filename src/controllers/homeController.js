const connection = require('../config/database');
const {getAllFilm,getAllAccount} = require('../sevices/CRUDSevices'); 
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');


const getHomepage = (req,res)=> {
    return res.render('main screen.ejs')
}

const getHomePage = (req,res)=>{
    return res.render('main screen admin.ejs')
}

const postCreateFilm = async (req,res)=>{
    console.log(req.body);
    let Name = req.body.Name;
    let Director = req.body.Director;
    let Duration = req.body.Duration;
    let Genre = req.body.Genre;
    let Release_date = req.body.Release_date;
    let Script = req.body.Script;
        let [result, fields]= await connection.query(
        `   INSERT INTO Film (Name,Director,Duration,Genre,Release_date,Script) VALUES(?,?,?,?,?,?)`,[Name,Director,Duration,Genre,Release_date,Script]
        );
        console.log("check: ",result);
        res.redirect('/List');
}


const getListFilm = async (req,res)=> {
    const itemsPerPage = 30;
    const page = req.params.page || 1;
    const offset = (page - 1) * itemsPerPage;

  try {
    const query = `SELECT * FROM Film LIMIT ${itemsPerPage} OFFSET ${offset}`;
    const [results] = await connection.query(query);

    res.render('List Film.ejs', { listFilm: results, currentPage: page,itemsPerPage:itemsPerPage });
  } catch (err) {
    console.error(err);
    res.status(500).send('ERROR');
  }
};

const getLogin  = (req,res)=>{
    return res.render('Login.ejs')
}
const getCreatFilm = (req,res)=>{
    return res.render('Creat.ejs')
}
const getUpdatePage = async (req,res)=>{
    const FilmId = req.params.Id;
    let [result, fields] = await connection.query('select * from Film where Id = ?',[FilmId]);
    let film =result && result.length > 0 ? result[0] : {};

    res.render('Edit.ejs',{filmEdit: film})
}
const postUpdateFilm = async (req,res)=>{
    let FilmId = req.body.Id
    let Name = req.body.Name;
    let Director = req.body.Director;
    let Duration = req.body.Duration;
    let Genre = req.body.Genre;
    let Release_date = req.body.Release_date;
    let Script = req.body.Script;
    
        let [result, fields]= await connection.query(
        `   UPDATE Film SET Name=?,Director=?,Duration=?,Genre=?,Release_date=?,Script=? WHERE Id = ?`,[Name,Director,Duration,Genre,Release_date,Script,FilmId]
        );
        // res.send('Update user succeed!')
        res.redirect('/List');
}
const getDeleteFilm = async (req,res)=>{
    let FilmId = req.params.Id;
    let [result, fields] = await connection.query('select * from Film where Id = ?',[FilmId]);
    let film =result && result.length > 0 ? result[0] : {}; 

    res.render('delete.ejs',{filmEdit: film})
}

const postDeleteFilm = async (req,res)=> {
    let FilmId = req.body.Id;
    let [result, fields]= await connection.query(
        `DELETE FROM Film WHERE Id =?;`,[FilmId]
    );
    res.redirect('/List')
}

const getSignIn = (req,res)=>{
    res.render('Login.ejs');
}

const postSignIn = async (req,res)=>{
    let Email = req.body.Email;
    let Password = req.body.Password;
    let [result,fields] = await connection.query('select * from account where Email = ? and Password = ?',[Email,Password]
    )
    let numberOfAccount =result && result.length > 0 ? result[0] : {};
    if(result.length >0) {
        res.redirect(`/User/${numberOfAccount.Id}`);
    }
    else{
        res.redirect('/');
    }

}
const getSignOut = (req,res)=>{
    res.redirect('/')
}
const getSignUp = (req,res)=>{
    res.render('Signup.ejs')
}
const postSignUp = async (req,res)=>{
    console.log(req.body);
    let Email = req.body.Email;
    let Password = req.body.Password;
    const [result, fields]= await connection.query(
        'select * from account where Email = ? ',[Email]
        );
        if(result.length >0) {
            console.log('tai khoan da ton tai')
        }
        else{
        const [result, fields]= await connection.query(
                `   INSERT INTO account (Email,Password) VALUES(?,?)`,[Email,Password]
                );
        }
        console.log("check: ",result);
        res.redirect('/');
}

const importData = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
  
      const table = 'Film';
      const fields = Object.keys(data[0]);
      const values = data.map(obj => Object.values(obj));
  
      const sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES ?`;
  
     await  connection.query(sql, [values])
     res.redirect('/List');
  
    } catch (error) {
      console.error('Import error: ', error);
      res.status(500).json({ message: 'An error occurred during import' });
    }
  };
const getImport = (req,res)=>{
    res.render('index.ejs')
}
const postExport = async (req,res)=>{
    try {
      const [rows, fields] = await connection.query('SELECT * FROM Film'); // Thực hiện truy vấn bằng Promises
  
      const ws = xlsx.utils.json_to_sheet(rows);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Dữ liệu từ MySQL');
  
      const filePath = path.join(__dirname, 'exported_data.xlsx');
      xlsx.writeFile(wb, filePath);
  
      res.download(filePath, 'exported_data.xlsx', (err) => {
        if (err) {
          console.error('Lỗi khi tải tệp:', err);
        }
        fs.unlinkSync(filePath); // Xóa tệp sau khi tải xong
      });
    } catch (error) {
      console.error('Lỗi:', error);
      res.status(500).send('Internal Server Error');
    }
  }
const getExport = (req,res)=>{
    res.render('export.ejs')
}
module.exports = {
    postExport,getExport,getImport,importData,getSignUp,postSignUp,getHomePage,getSignOut,getHomepage,getListFilm,getLogin,getCreatFilm,postCreateFilm,getUpdatePage,postUpdateFilm,getDeleteFilm,postDeleteFilm,getSignIn,postSignIn
}

