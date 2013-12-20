var passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	LinkedInStrategy  = require('passport-linkedin-oauth2').OAuth2Strategy,
	YahooStrategy = require('passport-yahoo-oauth').Strategy,
	WeiboStrategy = require('passport-weibo').Strategy,
	QQStrategy = require('passport-qq').Strategy;
var verifyHandler = function(token,tokenSecret,profile,done){
	process.nextTick(function(){
		User.findOne(
			{
				or:[
					{uid:parseInt(profile.id)},
					{uid:profile.id}
				]
			}
		).done(function(err,user){
			if(user){
				return done(null,user);
			}else{
				User.create({
					provider:profile.provider,
					uid:profile.id,
					name:profile.displayName
				}).done(function(err,user){
					return done(err,user);
				});
			}
		});
	});
};
passport.serializeUser(function(user,done){
	done(null,user.uid);
});
passport.deserializeUser(function(uid,done){
	User.findOne({uid:uid}).done(function(err,user){
		done(err,user);
	});
});
module.exports = {
	express : {
		customMiddleware:function(app){
			passport.use(new GoogleStrategy({
                    clientID: '960279437304.apps.googleusercontent.com',
                    clientSecret: '1mR3T_8GQtTnvZaPogQUFhlw',
                    callbackURL: 'http://localhost:1337/auth/google/callback'
                },
                verifyHandler
            ));
            passport.use(new LinkedInStrategy({
                    clientID: '758d31l2wfxovv',
                    clientSecret: 'V5EZ8eTgmgd6ZcoA',
                    callbackURL: 'http://localhost:1337/auth/linkedin/callback'
                },
                verifyHandler
            ));
            passport.use(new YahooStrategy({
                    consumerKey: 'dj0yJmk9czNLTTk4NWVBTmxJJmQ9WVdrOVJqaElSbHBrTTJNbWNHbzlNalUxTmpZeE9UWXkmcz1jb25zdW1lcnNlY3JldCZ4PWE1',
                    consumerSecret: '1fc5e012e27d1126b8fc02839bc3f445f2ba44af',
                    callbackURL: 'http://localhost:1337/auth/yahoo/callback'
                },
                verifyHandler
            ));
            passport.use(new WeiboStrategy({
                    clientID: '1172217544',
                    clientSecret: 'adb12d008dcf63a126d3154fed4698a9',
                    callbackURL: 'http://localhost:1337/auth/weibo/callback'
                },
                verifyHandler
            ));
            passport.use(new QQStrategy({
                    clientID: '1101132057',
                    clientSecret: 'MXbMAe9igEn3dF2F',
                    callbackURL: 'http://localhost:1337/auth/qq/callback'
                },
                verifyHandler
            ));
            app.use(passport.initialize());
            app.use(passport.session());
		}
	}
}