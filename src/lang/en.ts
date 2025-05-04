import type { ILang } from "~/types/lang";

const lang: ILang = {
    "@component-lang-button": "Language",
    "@component-create-whatsapp": {
        details: "Manage and automate operations in one place",
        help_steps: {
            step1: "Open WhatsApp on your phone.",
            step2: "Tap *Menu* $menu on Android or *Settings* $settings on iPhone.",
            step3: "Tap *Linked Devices*, then *Link a Device*.",
            step4: "Point your phone at this screen to scan the QR code."
        },
        need_help_question: "Need help getting started?"
    },
    "@route-signin": {
        header: "Log In",
        form: {
            email: {
                label: "Email",
                placeholder: "user@stexcore.com",
                validations: {
                    email: "Must be a valid email address",
                    required: "Field required",
                    invalid_login: "User/Password is invalid!"
                }
            },
            password: {
                label: "Password",
                placeholder: "Enter your password",
                validations: {
                    min: "A minimum of 8 characters is required",
                    max: "A maximum of 40 characters is required"
                }
            },
            submit: "Log in"
        },
        footer: {
            dont_account_question: "Don't have an account?",
            register_now: "Sign up"
        }
    },
    "@route-signup": {
        header: "Sign Up",
        form: {
            username: {
                label: "Username",
                placeholder: "Jane Doe",
                validations: {
                    min: "A minimum of 4 characters is required",
                    max: "A maximum of 40 characters is required"
                }
            },
            email: {
                label: "Email",
                placeholder: "user@stexcore.com",
                validations: {
                    email: "Must be a valid email address",
                    required: "Field required",
                    another_account: "Another account is using this email"
                }
            },
            password: {
                label: "Password",
                placeholder: "Enter your password",
                validations: {
                    min: "A minimum of 8 characters is required",
                    max: "A maximum of 40 characters is required"
                }
            },
            confirm_password: {
                label: "Confirm Password",
                placeholder: "Enter your confirmation password",
                validations: {
                    min: "A minimum of 8 characters is required",
                    max: "A maximum of 40 characters is required"
                }
            },
            submit: "Create account"
        },
        footer: {
            have_account_question: "Already have an account?",
            login_now: "Log in"
        }
    },
    "@route-signup-tcp-sended": {
        header: "Verification Pin Sent",
        text: "Check your email inbox to verify your account.",
        button: "Go to Home"
    },
    "@route-signup-tcp-expired": {
        header: "Verification Link Expired",
        text: "The verification link you received has expired. Please request a new link to continue verifying your account.",
        button: "Go to Home"
    },
    "@route-add-instance": {
        steps: {
            initial: {
                header: "Add Instance",
                form: {
                    instance_name: {
                        label: "Instance Name",
                        placeholder: "Main Messaging",
                        validations: {
                            required: "Required field",
                            max: "Cannot exceed 40 characters in length"
                        }
                    },
                    platform: {
                        label: "Platform",
                        placeholder: "Select a platform",
                        options: {
                            whatsapp: "WhatsApp",
                            telegram: "Telegram",
                            sms: "SMS Messaging"
                        },
                        validations: {
                            required: "Required field"
                        }
                    },
                    next: "Next"
                }
            },
            sync_whatsapp: {
                header: "Link Your Device to PrimeMSG",
                back: "Cancel"
            }
        }
    },
    "@layout-dashboard": {
        sidebar: {
            dashboard: "Dashboard",
            add_instance: "Add Instance",
            instances: "Instances",
            docs: "Documentation"
        }
    }
}

export default lang;