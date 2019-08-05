
function clear() {
    return localStorage.clear()
}

async function get(key, defaultValue = null) {
    const value = await localStorage.getItem(key)
    let res = defaultValue
    if (value) {
        try {
            res = JSON.parse(value)
        } catch (e) {
            res = value
        }
    }
    return res
    // return value !== null ? JSON.parse(value) : defaultValue
}

function set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
    return localStorage.removeItem(key)
}

function multiGet(...keys) {
    return localStorage.multiGet([...keys]).then(stores => {
        const data = {}
        stores.forEach((result, i, store) => {
            data[store[i][0]] = JSON.parse(store[i][1])
        })
        return data
    })
}

function multiRemove(...keys) {
    return localStorage.multiRemove([...keys])
}

export default {
    clear,
    get,
    set,
    remove,
    multiGet,
    multiRemove,
}
