export default async function login(body) {
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
        if (User.token) {
            setCookie('username', User.username, 14)
            setCookie('token', User.token, 14)
        }
        await setUserState(true)
    } else {
        throw new Error()
    }
}