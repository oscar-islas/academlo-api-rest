export default {
    "swagger": "2.0",
    "info": {
        "description": "API REST para una tienda en línea",
        "version": "1.0.0",
        "title": "Academlo Ecommerce",
        "contact": {
            "email": "oislasreyes@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "tags": [
        {
        "name": "Authorization",
        "description": "Rutas para poder manejar la autenticación y el registro de usuarios"
    }, {
        "name": "Users",
        "description": "Rutas para administrar los usuarios"
    }],
    "paths": {
        "/signup": {
            "post": {
                "tags": ["Authorization", "Users"],
                "description": "Registra un usuario en el sistema",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Objeto usuario que será requerido para poder agregarse en el sistema",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    }
                ],
                "responses": {
                    "405": {
                        "description": "Invalid input"
                    },
                    "default": {
                        "description": "successful operation"
                    }
                },
                "security":[{
                    "CSRF-Token": []
                }]

            }
        },
        "/csrf": {
            "get": {
                "tags": ["Authorization"],
                "description": "Obtiene un token CSRF",                
                "responses": {
                    "405": {
                        "description": "Invalid input"
                    },
                    "default": {
                        "description": "successful operation"
                    }
                },               
            }
        }
    },
    "definitions": {
        "User": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"                    
                },
                "name": {
                    "type": "string"                    
                },
                "password": {
                    "type": "string"
                },
                "cart": {
                    "type": "array",
                    "items": {
                        "type": "object"
                    }
                }
            }
        }
    },
    "securityDefinitions":{
        "CSRF-Token": {
            "type": "apiKey",
            "in": "header",
            "name": "CSRF-Token"
        },
        "JWT":{
            "type": "apiKey",
            "in": "cookie",
            "name": "token"
        }
    }
}