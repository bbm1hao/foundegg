var HomeController = {
	index:function(req,user){
		console.log(req.usr);
		res.view({
			user:req.user
		});
	}
};
module.export = HomeController;
