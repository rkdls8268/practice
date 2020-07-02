var express = require('express');
var router = express.Router();

const upload = require('../../modules/multer');
// var multer = require('multer');
// var upload = multer({
//     dest: 'upload/'
// })

const todolistController = require('../../controllers/todolistControllers');

router.get('/', todolistController.readAll);
router.get('/:todoId', todolistController.read);
router.get('/user/:userName', todolistController.readByUserName);
router.post('/', todolistController.write);
router.put('/:todoId', todolistController.update);
// image 는 field name
/**
 * error: unexpected token - in json at position 0 의 경우
 * headers에서 content-type 해제
 * multipart/form-data 로 들어온 데이터 처리하는 것❗
 */
router.put('/image/:todoId', upload.single('image'), todolistController.updateImage);
router.delete('/:todoId', todolistController.delete);

module.exports = router;