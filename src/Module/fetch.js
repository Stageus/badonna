async function useFetch(url){
    const data = await fetch(url)
    .then(response => response.json())
    .then(result => {
        return result
    })

    return data
}

export default useFetch