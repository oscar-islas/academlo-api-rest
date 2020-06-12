import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/users', userController.getUsers);

//Actividad:
//Crear el controlador para que pueda enviar un correo al cliente con una nueva contraseña
//1. buscar el usuario en la base de datos (comprobar que existe) -> si no existe enviar un mensaje de error
//2. generar una contraseña aleatoria
//3. encriptar la contraseña
//4. actualizar el campo del usuario con la contraseña generada (encriptada)
//5. enviar la contraseña sin encriptar por correo electronico
router.post('/reset-password', );

export default router;