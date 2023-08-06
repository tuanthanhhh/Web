const express = require('express');
const {getSignUp,postSignUp,getHomepage,getSignOut,getListFilm,getHomePage,postSignIn,getCreatFilm, postCreateFilm,getUpdatePage,postUpdateFilm,getDeleteFilm,postDeleteFilm,getSignIn} = require('../controllers/homeController');
const router = express.Router();

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

router.post('/Create-film',postCreateFilm);
router.post('/update-film',postUpdateFilm);
router.post('/delete-film',postDeleteFilm);
router.post('/Sign-in',postSignIn)
router.post('/Sign-up',postSignUp)


module.exports = router;