
/*
 * GET home page.
 */

exports.phone_index = function(req, res) {
  res.render('phone', { title: 'PrancerJS' });
};

exports.server_index = function(req, res) {
	res.render('server', { title: 'PrancerJS' });
};
