export default async function login(body) {
    try {
        const res = await fetch('/api/user/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            method: 'POST', 
            body: JSON.stringify(body)
        })
    
        const data = await res.json()
        if (body.token) message(data.message)
        else message(data.message, res.status === 200 ? 'green' : 'red')
    
        if (res.status === 200) {
            User = data.User
            if (User.session.deviceToken) {
                setCookie('username', User.username, 14)
                setCookie('deviceToken', User.session.deviceToken, 14)
                setCookie('sessionToken', User.session.sessionToken, 14)
            }
            await setUserState(true)
            return
        } else {
            throw new Error()
        }
    } catch(e) {
        console.log(e)
    }
}