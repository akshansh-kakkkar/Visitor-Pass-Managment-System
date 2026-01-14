import Visitor from "../Models/VisitorModel.js";

const RegisterVisitor = async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);
        
        const { name, phone, email, company } = req.body;
        const photo = req.file ? req.file.path : null;
        if (!name || !phone || !email) {
            return res.status(400).json({
                message: "Plese provide all the credentials"
            })
        }

        const visitor = await Visitor.create({
            name,
            phone,
            email,
            company,
            photo
        })
        res.status(201).json({
            visitor: {
                _id: visitor._id,
                email: visitor.email,
                phone: visitor.phone,
                company: visitor.company,
                photo: visitor.photo
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export default RegisterVisitor;

