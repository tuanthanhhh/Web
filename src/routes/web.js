const express = require('express');
const {getImport,importData,getSignUp,postSignUp,getHomepage,getSignOut,getListFilm,getHomePage,postSignIn,getCreatFilm, postCreateFilm,getUpdatePage,postUpdateFilm,getDeleteFilm,postDeleteFilm,getSignIn} = require('../controllers/homeController');
const router = express.Router();
const multer = require('multer')

router.get('/',getHomepage);
router.get('/User/:Id',getHomePage);
// router.get('/Creat',getCreatFilm);
router.get('/List',getListFilm);

router.get('/Create',getCreatFilm);
router.get('/update/:Id',getUpdatePage);
router.get('/delete/:Id',getDeleteFilm);
router.get('/Sign-in',getSignIn);
router.get('/Sign-out',getSignOut)
router.get('/Sign-up',getSignUp)
router.get('/import',getImport)

router.post('/Create-film',postCreateFilm);
router.post('/update-film',postUpdateFilm);
router.post('/delete-film',postDeleteFilm);
router.post('/Sign-in',postSignIn)
router.post('/Sign-up',postSignUp)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/import', upload.single('file'), importData);

module.exports = router;



module.exports = router;