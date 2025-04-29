import { ILang } from "~/types/lang";

const lang: ILang = {
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
                placeholder: "Carlos Cerdeño",
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
                    required: "Field required"
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