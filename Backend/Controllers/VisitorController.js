import VisitorProfile from "../Models/VisitorProfile.js";


const getAllVisitors = async (req, res) => {
    try {
        const visitors = await VisitorProfile.find({}).sort({ createdAt: -1 });
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while fetching visitors",
            error: error.message
        });
    }
};

export { getAllVisitors };
