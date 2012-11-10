
/*
 * GET home page.
 */

exports.phone_index = function(req, res) {
  res.render('phone', { title: 'PrancerJS' });
};

exports.studio_index = function(req, res) {
	res.render('studio', { title: 'PrancerJS' });
};
