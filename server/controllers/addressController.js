import Address from "../models/Address.js";

//add address :/api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId; // from middleware
		const { address } = req.body;

		if (!address) {
			return res.json({ success: false, message: "Address payload missing" });
		}

		const required = [
			"firstName",
			"lastName",
			"email",
			"street",
			"city",
			"state",
			"zipcode",
			"country",
			"phone",
		];
		for (const key of required) {
			if (
				address[key] === undefined ||
				address[key] === null ||
				(String(address[key]).trim() === "")
			) {
				return res.json({ success: false, message: `Missing field: ${key}` });
			}
		}

		const payload = {
			...address,
			userId,
			zipcode: Number(address.zipcode),
		};

		if (Number.isNaN(payload.zipcode)) {
			return res.json({ success: false, message: "Invalid zipcode" });
		}

		await Address.create(payload);
    res.json({ success: true, message: "address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//get address : /api/address/get

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // comes from auth middleware

    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
