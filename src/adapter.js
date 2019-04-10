const adapter = (() => {

    const baseUrl = "http://localhost:3000/pups"
    const header = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };

    const getAll = () => {
        return fetch(baseUrl).then(res => res.json())
    }

    const getOne = (id) => {
        return fetch(`${baseUrl}/${id}`).then(res => res.json)
    }

    const update = (id, body) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "PATCH",
            headers: header,
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    return {
        getAll, 
        getOne,
        update
    }
})()
