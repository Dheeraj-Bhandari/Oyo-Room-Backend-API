import Hotels from "../database/model/hotel.js";

export const addHotel = async (req, res) => {
  try {
    const newHotel = await Hotels.create({
      id: req.body.id,
      hotelName: req.body.hotelName,
      address: req.body.address,
      distance: req.body.distance,
      city: req.body.city,
      info: req.body.info,
      rating: req.body.rating,
      ratingCount: req.body.ratingCount,
      ratingStatus: req.body.ratingStatus,
      price: req.body.price,
      strikedPrice: req.body.strikedPrice,
      discount: req.body.discount,
      facility1: req.body.facility1,
      facility2: req.body.facility2,
      facility3: req.body.facility3,
      facilityX: req.body.facilityX,
      mainImage: req.body.mainImage,
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      image4: req.body.image4,
      image5: req.body.image5,
    });

    await newHotel.save();
    res.status(200).json(newHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotel = async (req, res) => {
  try {
    console.log("inside gethotel");

    let match = {};

    let page = parseInt(req.query.page) || 1;
    let docPerPage = 5;
    let skip = docPerPage * (page - 1);
    let limit = req.query.limit || docPerPage;

    if (req.query.city) {
      match.city = new RegExp(req.query.city, "i");
    }
    if (req.query.rating) {
      match.rating = new RegExp(req.query.rating, "i");
    }
    if (req.query.hotel) {
      match.hotelName = new RegExp(req.query.hotel, "i");
    }
    if (req.query.address) {
      match.address = new RegExp(req.query.address, "i");
    }
    if (req.query.facility) {
      match.$or = [
        { facility1: new RegExp(req.query.facility, "i") },
        { facility2: new RegExp(req.query.facility, "i") },
        { facility3: new RegExp(req.query.facility, "i") },
      ];
    }

    let pipeline = [
      { $match: match },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          datainfo: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
      {
        $project: {
          _id: 0,
          page: `${page}`,
          totalDocs : {$first : "$datainfo.count"},
          hotels: "$data",
        },
      },
    ];
    const hotels = await Hotels.aggregate(pipeline);

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotelById = async (req, res) => {
  try {
    //    console.log(req.params.id)
    const HotelById = await Hotels.findById(req.params.id);
    res.status(200).json(HotelById);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getHotelByQuery = async (req, res) => {
  try {
    console.log(req.params.query);
    const HotelByCity = await Hotels.find({
      $or: [
        { city: { $regex: req.params.query } },
        { hotelName: { $regex: req.params.query } },
        { address: { $regex: req.params.query } },
        { rating: { $regex: req.params.query } },
      ],
    });

    res.status(200).json(HotelByCity);
  } catch (error) {
    res.status(500).json(error);
  }
};
