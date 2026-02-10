import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRoute from './Routes/AuthRoute.js';
import cors from "cors";
import ProtectedRoutes from './Routes/ProtectedRoutes.js';
import AdminRoutes from './Routes/AdminRoutes.js';
import VisitorRoutes from './Routes/VisitorRoutes.js';
import AppointmentRoutes from './Routes/AppointmentRoutes.js';
import PassRoutes from './Routes/PassRoutes.js';
import CheckLog from './Routes/CheckLogRoutes.js';
import ViewPass from './Routes/ViewPassRoutes.js';
import DownloadPassRoutes from './Routes/DownloadPassRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const app = express()
const Port = process.env.PORT || 3000
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(cors());
app.use(express.json());
app.use('/api/auth', AuthRoute);
app.use('/api/test', ProtectedRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/visitor', VisitorRoutes);
app.use('/api/visitor', AppointmentRoutes);
app.use('/api/visitor', PassRoutes);
app.use('/api/security', CheckLog);
<<<<<<< HEAD
app.use('/visitor', ViewPass);
app.use('/api/download-pass', DownloadPassRoutes);
app.use("/passes", express.static(path.join(dirname, "passes")));
=======
app.use('/visitor', ViewPass)
app.use('/uploads', express.static('uploads'))
>>>>>>> ebb1d09 (photo feature ready)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('mongodb database is connected');
}).catch((err) => {
    console.log(err);
})

app.listen(Port, () => {
    console.log(`app is listening at http://localhost:${Port}`);
})