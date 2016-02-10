var express                 = require('express'),
    router                  = express.Router(),
    SoundController         = require('../controllers/sound.controller');

router.route('/').get(SoundController.showAllSounds);
router.route('/ajax/sounds').get(SoundController.loadSoundsViaAjax);
router.route('/sound/:id/:slug').get(SoundController.showSingleSound);
router.route('/ajax/sound/:id').get(SoundController.loadSingleSoundViaAjax);

module.exports = router;