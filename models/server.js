const express = require('express');
const cors = require('cors');
const { sequelize } = require('../database/connection');

// const { dbConnection } = require('../database/config');

class Server {
    constructor () {
        this.app = express();
        // this.port = process.env.PORT;
        this.port = 8080;

    
        this.detalleVentasPath = '/api/departamento';
        this.productosPath = '/api/empleado';
        this.ventasPath = '/api/empresa';
        this.ventasPath = '/api/puesto';
        this.ventasPath = '/api/usuario';
        
        // this.inventarioPath = '/api/inventario';
        // this.mantenimientoPath = '/api/mantenimiento';
        // this.mantenimientoMaquinaPath = '/api/mantenimientoMaquina';
        // this.maquinaReportePath = '/api/maquinaReporte';
        // this.permisoPath = '/api/permiso';
        // this.refaccionesPath = '/api/refacciones';
        // this.reportePath = '/api/reporte';
        // this.rolPath = '/api/rol';
        // this.sucursalPath = '/api/sucursal';
        // this.tipoMaquinaPath = '/api/tipoMaquina';
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB () {
        try {
            // initModels(sequelize);
            // await sequelize.sync({force:false});
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    middlewares () {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes () {
        this.app.use(this.clientePath, require('../routes/departamento'));
        this.app.use(this.detalleVentasPath, require('../routes/empleo'));
        this.app.use(this.productosPath, require('../routes/empresa'));
        this.app.use(this.ventasPath, require('../routes/usuario'));
        this.app.use(this.ventasPath, require('../routes/puesto'));
        // this.app.use(this.inventarioPath, require('../routes/inventario'));
        // this.app.use(this.mantenimientoPath, require('../routes/mantenimiento'));
        // this.app.use(this.mantenimientoMaquinaPath, require('../routes/mantenimientoMaquina'));
        // this.app.use(this.maquinaReportePath, require('../routes/maquinaReporte'));
        // this.app.use(this.permisoPath, require('../routes/permiso'));
        // this.app.use(this.refaccionesPath, require('../routes/refacciones'));
        // this.app.use(this.reportePath, require('../routes/reporte'));
        // this.app.use(this.rolPath, require('../routes/rol'));
        // this.app.use(this.sucursalPath, require('../routes/sucursal'));
        // this.app.use(this.tipoMaquinaPath, require('../routes/tipoMaquina'));
        // this.app.use(this.usuariosPath, require('../routes/usuarios'));
        // this.app.use(this.authPath, require('../routes/auth'));
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
