module.exports = {
    login(email, pass, cb) {
        console.log('auth module - login executed');
        cb = arguments[arguments.length - 1]
        if (localStorage.token) {
            if (cb) cb(true)
            this.onChange(true)
            return
        }
        pretendRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
                this.onChange(true)
            } else {
                if (cb) cb(false)
                this.onChange(false)
            }
        })
    },

    getToken() {
        return localStorage.token
    },

    logout(cb) {
        console.log('auth module - logout executed');
        delete localStorage.token
        if (cb) cb()
        this.onChange(false)
    },

    loggedIn() {
        console.log('auth module - checking if authenticated');
        return !!localStorage.token
    },

    onChange() {
        console.log('auth module - onChange executed');
    }
}

function pretendRequest(email, pass, cb) {
    console.log('auth module - mock authentication request');
    setTimeout(() => {
        if (email === 'joe@example.com' && pass === 'password1') {

            console.log('auth module - mock authentication succeeded');
            cb({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            })
        } else {
            console.log('auth module - mock authentication failed');
            cb({ authenticated: false })
        }
    }, 0)
}