import { ILang } from "~/types/lang";

const lang: ILang = {
    "@component-lang-button": "Idioma",
    "@component-create-whatsapp": {
        details: "Administra y automatiza operaciones desde un solo lugar",
        help_steps: {
            step1: "Abre WhatsApp en tu teléfono.",
            step2: "Toca *Menú* $menu en Android o *Configuración* $settings en iPhone.",
            step3: "Toca *Dispositivos vinculados* y luego *Vincular un dispositivo*.",
            step4: "Apunta tu teléfono a esta pantalla para escanear el código QR."
        },
        need_help_question: "¿Necesitas ayuda para comenzar?"
    },
    "@route-signin": {
        header: "Iniciar Sesión",
        form: {
            email: {
                label: "Correo electrónico",
                placeholder: "usuario@stexcore.com",
                validations: {
                    email: "Debe ser un correo electrónico válido",
                    required: "Campo requerido",
                    invalid_login: "Usuario y/o contraseña inválida!"
                }
            },
            password: {
                label: "Contraseña",
                placeholder: "Ingrese su contraseña",
                validations: {
                    min: "Se requiere mínimo 8 carácteres",
                    max: "Se requiere máximo 40 carácteres"
                }
            },
            submit: "Iniciar sesión"
        },
        footer: {
            dont_account_question: "¿No tienes una cuenta?",
            register_now: "Regístrate"
        }
    },
    "@route-signup": {
        header: "Registrate",
        form: {
            username: {
                label: "Nombre de usuario",
                placeholder: "Carlos Martinéz",
                validations: {
                    min: "Se requiere mínimo 4 carácteres",
                    max: "Se requiere máximo 40 carácteres"
                }
            },
            email: {
                label: "Correo electrónico",
                placeholder: "usuario@stexcore.com",
                validations: {
                    email: "Debe ser un correo electrónico válido",
                    required: "Campo requerido",
                    another_account: "Otra cuenta está usando este correo electrónico"
                }
            },
            password: {
                label: "Contraseña",
                placeholder: "Ingrese su contraseña",
                validations: {
                    min: "Se requiere mínimo 8 carácteres",
                    max: "Se requiere máximo 40 carácteres"
                }
            },
            confirm_password: {
                label: "Confirmar contraseña",
                placeholder: "Ingrese su contraseña de confirmación",
                validations: {
                    min: "Se requiere mínimo 8 carácteres",
                    max: "Se requiere máximo 40 carácteres"
                }
            },
            submit: "Crear cuenta"
        },
        footer: {
            have_account_question: "¿Ya tienes una cuenta?",
            login_now: "Iniciar sesión"
        }
    },
    "@route-signup-tcp-sended": {
        header: "Pin verificación enviado",
        text: "Verifica en la bandeja de entrada de tu correo electrónico para verifcar tu cuenta.",
        button: "Ir al inicio"
    },
    "@route-signup-tcp-expired": {
        header: "Enlace de verificación expirado",
        text: "El enlace de verificación que recibiste ha expirado. Por favor, solicita un nuevo enlace para continuar con la verificación de tu cuenta.",
        button: "Ir al inicio"
    },
    "@route-add-instance": {
        steps: {
            initial: {
                header: "Agregar instancia",
                form: {
                    instance_name: {
                        label: "Nombre de la instancia",
                        placeholder: "Mensajería principal",
                        validations: {
                            required: "Campo obligatorio",
                            max: "No puede superar los 40 caracteres de longitud"
                        }
                    },
                    platform: {
                        label: "Plataforma",
                        placeholder: "Seleccione una plataforma",
                        options: {
                            whatsapp: "WhatsApp",
                            telegram: "Telegram",
                            sms: "Mensajería SMS"
                        },
                        validations: {
                            required: "Campo obligatorio"
                        }
                    },
                    next: "Siguiente"
                }
            },
            sync_whatsapp: {
                header: "Vincula tu dispositivo con PrimeMSG",
                back: "Cancelar"
            }
        }
    },
    "@layout-dashboard": {
        sidebar: {
            dashboard: "Panel de control",
            add_instance: "Agregar instancia",
            instances: "Instancias",
            docs: "Documentación"
        }
    }
}

export default lang;