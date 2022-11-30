const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require("./middlewares");

const router = express.Router();

//공통된 처리 - 무조건 수행
router.use((req, res, next) => {
    //로그인한 유저 정보
    //유저정보를 res.locals.user에 저장
    res.locals.user = req.user;
    //게시글을 follow 하고 되고 있는 개수
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    //게시글을 follow 하고 있는 유저들의 목록
    res.locals.followerIdList = [];
    next();
});

//메인 화면
router.get('/', (req, res, next) => {
    const twits = [];
    //템플릿 엔진을 이용한 출력
    //views 디렉토리의 main.html로 출력
    res.render('main', {
        title: 'NodeAuthentication',
        twits,
    });
});

//회원 가입 - 로그인이 되어있지 않은 경우만 수행
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
        title: '회원가입 - NodeAuthentication'
    });
});

//프로필 화면 처리 - 로그인 되어있는 경우에만 처리
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
        title: '내 정보 - NodeAuthentication'
    });
});

module.exports = router;