require('dotenv').config();

const express = require("express");
const userRoutes = require('./routes/users.js');
const employeeRoutes = require('./routes/employees.js');
const uomRoutes = require('./routes/uomRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');
const app = express();
const trChasierRoutes = require('./routes/trCashierRoutes.js');
const accountRoutes = require('./routes/accountRotes.js');
const authRoutes = require('./routes/authRoutes.js');
const middleware = require('./middleware/logs.js');
const middlewareAuth = require('./middleware/auth.js');
const cors = require('cors');

app.use(cors());
app.use(middleware);
app.use(express.json());

app.use('/auth', authRoutes);
const staticPath = process.env.UPLOAD_PATH || 'uploads';
app.use('/public-images', express.static(staticPath));

app.use(middlewareAuth);

app.use('/users', userRoutes);

app.use('/employee', employeeRoutes);

app.use('/uom', uomRoutes);

app.use('/item', itemRoutes);

app.use('/tr-cashier', trChasierRoutes);

app.use('/account', accountRoutes);

app.listen(process.env.PORT, () => {
    console.log('succesfully start server, listen at port 4000');
}
)