import { useEffect, useState} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (url === null) {
            setData(null)
            setLoading(false)
        } else {
            getData(url)
        }
    }, [url])

    const getData = (url) => {
        setLoading(true)
        fetch(url)
            .then(response => response.json())
            .then((json) =>{
                setLoading(false)
                setData(json)
            }).catch((error) => {
                setError(error)
                setLoading(false)
            })
    }

    return { data, loading, error }
}

export default useFetch
