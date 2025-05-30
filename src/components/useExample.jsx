import { useCallback, useEffect, useState } from 'react'





async function sednHttpRequest(url, config) {

    const response = await fetch(url, config)
    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.error || "something went wrong")
    }

    return resData
}


export default function useHttp(url, config, initialData) {

    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    function clearData() {
        setData(initialData)
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true)

            try {
                const resData = await fetch(url, { ...config, body: data })
                setData(resData)
            }
            catch (error) {
                setError(error.meesage || "something went wrong")
            }
            setIsLoading(false)
        }

        , [config, url])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest()
        }
    }, [config, sendRequest])

    return ({
        isLoading,
        data,
        sendRequest,
        error,
        clearData
    })
}