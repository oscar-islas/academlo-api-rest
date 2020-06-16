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
    "paths": {
        "/signup": {
            "post": {
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
                }
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
    }
}