// controllers 나 models 폴더 만들어서 넣어줘도 됨~

const passport = require('passport');
const User = require('../models/user');
const encrypt = require('../modules/encrypt');

const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
    function (username, password, done) {
        const result = await User.getUserByName(username);
        if (!result) {
            console.log('사용자를 찾을 수 없습니다.');
            return done(null, false);
        }
        const digest = await encrypt.encrypt(password, result[0].salt);
        console.log('passport.js - digest : ', digest);
        if(digest !== result.password) {
            console.log('비밀번호 오류입니다.');
            return done(null, false);
        }
        const dto = {
            name: result[0].nickname,
            email: result[0].email
        }
        done(null, dto);
    }
));

// 기본적으로 usename, password 를 요청으로 받는데, 이름은 passport가 정해둔 약속
// done 은 끝났다는 의미, 실제로 끝나고 나서의 결과값 반환

passport.serializeUser(async (user, done) => {
    console.log('serializeUser', user);
    // done의 두 번째 인자로 user로 구분해줄 수 있는 값인 id를 넣어줌
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // serializeUser의 done의 두 번째 인자로 넘어온 userIdx를 첫 번째 인자로 받아 사용
    console.log('deserializeUser', id);
    const result = await User.getUserByName()
})