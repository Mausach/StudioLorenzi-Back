const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {
	
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'Kein Token in der Anforderung',
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRET_JWT);

		req.id = payload.id;
		req.userName = payload.userName;
		req.status = payload.status;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'ungültiger Token',
		});
	}

	next();
};

module.exports = {
	validarJWT,
};