const path = require('path');
const moment = require('moment');
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const { Op } = require('sequelize');
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);
// const { pool } = require(`${ROOT_DIR}/database/_old/db-config`);

// Consts
const { DISCOUNT_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`)
const admin_auth = require(`${ROOT_DIR}/middleware/user-admin`)

module.exports = function (app, root_path) {
    // ---------------- GET method
    app.get(DISCOUNT_URL + '/:code', token_auth, /*admin_auth,*/ async (req, res) => {
		try {
			var totalAmmount = req.query.totalAmmount;
			totalAmmount = parseFloat(totalAmmount)
			if (isNaN(totalAmmount)) totalAmmount = 0
			
			if (req.params.code) {
				const dcode = req.params.code;

				const now = moment();
				const discount = await Models.discount.findAll({
					where: {
						discount_code: dcode,
						minimum: {
							[Op.lte]: totalAmmount,
						},
						[Op.and]: {
							start_time: {
								[Op.or]: {
									[Op.eq]: null,
									[Op.lte]: now,
								}
							},
							end_time: {
								[Op.or]: {
									[Op.eq]: null,
									[Op.gte]: now,
								}
							},
							remaining: {
								[Op.gt]: 0
							}
						},
					},
					order: [
						['percentage', 'DESC'],
						['remaining', 'DESC'],
					]
				}) 
				return res.status(200).json({data: discount, now});
			} else {
				return res.status(401).json({msg: "Missing discount code"});
			}
		} catch (err) {
			console.error(err)
			return res.status(500).json({error : err});
		}
	})
    .get(DISCOUNT_URL, token_auth, admin_auth, async (req, res) => {
		try {
			var Discount = Models.discount;
			var discountobj = await Discount.findAll({
				raw: true,
				order: [
					['id', 'DESC']
				]
			})

			// console.log(discountobj)
			discountobj.forEach( (obj) => {
				obj.start_time = (moment(obj.start_time).local().format("YYYY-MM-DD HH:mm:ss"));
				obj.end_time = (moment(obj.end_time).local().format("YYYY-MM-DD HH:mm:ss"));
			})
			return res.status(200).json({data: discountobj});
		} catch (err) {
			// console.error(err)
			return res.status(500).json({error : err});
		}
	})
    .delete(DISCOUNT_URL + '/:id', token_auth, admin_auth, async (req, res) => {
		const id = req.params.id;
		console.log(id)
		var disobj = await Models.discount.findOne({
			where: {
				id: id
			}
		})
		if (disobj) {
			disobj.destroy() // no await
			return res.status(204).json()
		} else {
			return res.status(404).json("Discount with ID = " + id + " not found.")
		}
	})
	.post(DISCOUNT_URL, token_auth, admin_auth, async (req, res) => {
		try {
			const {error, params} = validate(req.body);
			if (error !== undefined && error.length !== 0) 
				return res.status(400).json({msg: "Bad request", error});
			
			Models.discount.create(params)
			.then( () => {return res.status(204).json();})
			.catch( (error) => {
				return res.status(400).json({msg: "Bad request", error: "Invalid values"})}
			)
		} catch (err) {
			console.error(err);
			return res.status(500).json({error : err});
		}
	})
	.put(DISCOUNT_URL, token_auth, admin_auth, async (req, res) => {
		try {
			const {error, params} = validate(req.body);
			if (! req.body.id)
				return res.status(400).json({msg: "Bad request", error: "Missing Coupon ID"});
			else params.id = req.body.id
			console.log(params)

			if (error !== undefined && error.length !== 0) 
				return res.status(400).json({msg: "Bad request", error});
			
			var coupon = await Models.discount.findOne( { where: {id: params.id}} );
			if (! coupon ) {
				return res.status(404).json({msg: "Not found", error: "Cannot find Coupon"});
			}
			coupon.set(params);

			coupon.save().then( () => {return res.status(204).json();})
			.catch( (error) => {
				return res.status(400).json({msg: "Bad request", error: "Invalid values"})}
			)
		} catch (err) {
			console.error(err);
			return res.status(500).json({error : err});
		}
	})
}

function validate(params) {
	var error = []
	const {discount_code, remaining, percentage, minimum, start_time, end_time} = params;

	if ( !(discount_code && remaining && percentage && minimum && start_time && end_time) )
		error.push('Missing values')
	else {
		if (typeof remaining !== 'number')
			error.push("'Remaining' value is Not a number")
		else
			if (remaining <= 0) 
				error.push("'Remaining' value must be greater than Zero")
		
		if (typeof percentage !== 'number')
			error.push("'Percentage' value is Not a number")
		else
			if (percentage < 0.0 || 1.0 < percentage)
				error.push("'Discount Percentage' value must be a Real number in range [0.0, 1.0]")
		
		if (typeof minimum !== 'number')
			error.push("'Minimum' value is Not a number")
		else if (minimum < 0.0)
				error.push("'Minimum Cost' cannot be negative")
		
		var st=-5, ed=-4;
		if ( isNaN(new Date(start_time)) ) {
			error.push("'Start Time' is an invalid Date")
		} else {
			st = (new Date(start_time)).getTime();
		}
		if ( isNaN(new Date(end_time)) ) {
			error.push("'End Time' is an invalid Date")
		} else {
			ed = (new Date(end_time)).getTime();
		}

		if (st >= ed) {
			error.push("'End Time' cannot be after 'Start Time'");
		}
	}
	return {
		error, params: {discount_code, remaining, percentage, minimum, start_time, end_time}
	}
}