const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

export default passport.use(
  new KakaoStrategy(
    {
      callbackURL: '/auth/kakao/callback',
      clientID: process.env.KAKAO_ID
    },
    async (kakaoAccessToken, kakaoRefreshToken, profile, done) => {
      return done(null, {
        kakaoAccessToken,
        kakaoRefreshToken,
        profile
      });
    }
  )
);
