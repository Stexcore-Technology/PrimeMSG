/**
 * Lang route login --> /auth/signin
 */
export interface ILangRouteLogin {
    /**
     * Header form
     */
    header: string,
    /**
     * Form inputs
     */
    form: {
        /**
         * Email input
         */
        email: {
            /**
             * Label email input
             */
            label: string,
            /**
             * Placeholder email input
             */
            placeholder: string,
            /**
             * Validations
             */
            validations: {
                /**
                 * Required email
                 */
                required: string,
                /**
                 * Need to be email
                 */
                email: string,
                /**
                 * User/password invalid
                 */
                invalid_login: string
            }
        },
        /**
         * Password input
         */
        password: {
            /**
             * Label email input
             */
            label: string,
            /**
             * Placeholder email input
             */
            placeholder: string,
            /**
             * Validations
             */
            validations: {
                /**
                 * Min length validation
                 */
                min: string,
                /**
                 * Max length validation
                 */
                max: string
            }
        },
        /**
         * Submit button
         */
        submit: string
    },
    /**
     * Footer form
     */
    footer: {
        /**
         * Don't have an account?
         */
        dont_account_question: string,
        /**
         * Register now!
         */
        register_now: string
    }
}

/**
 * Lang route signup --> /auth/signup
 */
export interface ILangRouteSignup {
    /**
     * Header form
     */
    header: string,
    /**
     * Form inputs
     */
    form: {
        /**
         * Username input
         */
        username: {
            /**
             * Label username input
             */
            label: string,
            /**
             * Placeholder username input 
             */
            placeholder: string,
            /**
             * Username validations
             */
            validations: {
                /**
                 * Minlength validation
                 */
                min: string,
                /**
                 * Maxlength validation
                 */
                max: string
            }
        },
        /**
         * Email input
         */
        email: {
            /**
             * Label input
             */
            label: string,
            /**
             * Placeholder input
             */
            placeholder: string,
            /**
             * Validations input
             */
            validations: {
                /**
                 * Required input
                 */
                required: string,
                /**
                 * Email input
                 */
                email: string
            }
        },
        /**
         * Password input
         */
        password: {
            /**
             * Label input
             */
            label: string,
            /**
             * Placeholder input
             */
            placeholder: string,
            /**
             * Validations input
             */
            validations: {
                /**
                 * Min length validation
                 */
                min: string,
                /**
                 * Max length validation
                 */
                max: string
            }
        },
        /**
         * Confirm password
         */
        confirm_password: {
            /**
             * Label input
             */
            label: string,
            /**
             * Placeholder input
             */
            placeholder: string,
            /**
             * Validations input
             */
            validations: {
                /**
                 * Min length input
                 */
                min: string,
                /**
                 * Max length input
                 */
                max: string
            }
        },
        /**
         * Submit input
         */
        submit: string
    },
    /**
     * Footer input
     */
    footer: {
        /**
         * Have account?
         */
        have_account_question: string,
        /**
         * Signin now!
         */
        login_now: string
    }
}

/**
 * Lang route signup tcp sended --> /auth/signup/tcp-sended
 */
export interface ILangRouteSignupTcpSended {
    /**
     * Header modal
     */
    header: string,
    /**
     * Details text
     */
    text: string,
    /**
     * Go to home button
     */
    button: string
}

/**
 * Lang route signup tcp expired --> /auth/signup/tcp/[token]
 */
export interface ILangRouteSignupTcpExpired {
    /**
     * Header modal
     */
    header: string,
    /**
     * Details text
     */
    text: string,
    /**
     * Go to home button
     */
    button: string
}

/**
 * Lang layout dashboard
 */
export interface ILangLayoutDashboard {
    /**
     * Sidebar menu
     */
    sidebar: {
        /**
         * Dashboard link
         */
        dashboard: string,
        /**
         * Add instance link
         */
        add_instance: string,
        /**
         * Instances link
         */
        instances: string,
        /**
         * Documents
         */
        docs: string
    }
}

/**
 * Lang
 */
export interface ILang {
    /**
     * Components
     */
    "@component-lang-button": string,
    /**
     * Route login --> /auth/signin
     */
    "@route-signin": ILangRouteLogin,
    /**
     * Route signup --> /auth/signup
     */
    "@route-signup": ILangRouteSignup,
    /**
     * Route signup tcp sended --> /auth/signup/tcp-sended
     */
    "@route-signup-tcp-sended": ILangRouteSignupTcpSended,
    /**
     * Route signup tcp expired --> /auth/signin/tcp/[token]
     */
    "@route-signup-tcp-expired": ILangRouteSignupTcpExpired,
    /**
     * Layout dashboard --> /dashboard/*
     */
    "@layout-dashboard": ILangLayoutDashboard
}

/**
 * Segment to load lang
 */
export type ILangType = "es" | "en";