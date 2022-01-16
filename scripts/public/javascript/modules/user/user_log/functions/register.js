export default async function register(body) {
    const res = await fetch('/api/user/new', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        method: 'POST', 
        body: JSON.stringify(body)
    })

    const data = await res.json()
    message(data.message, res.status === 201 ? 'green' : 'red')

    if (res.status === 201) {
        User = data.User
        console.log(User)
        if (User.token) {
            setCookie('username', User.username, 14)
            setCookie('token', User.token, 14)
        }
        await setUserState(true)
    } else {
        throw new Error()
    }
}