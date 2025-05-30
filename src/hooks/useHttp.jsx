import { useCallback, useState, useEffect } from "react";




async function sendHttpRequest(url, config) {

    const response = await fetch(url, config)
    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.error || 'something went wrong'
        )
    }
    return resData
}


export default function useHttp(url, config, initialData) {


    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    function clearData() {
        setData(initialData)
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true)

            try {
                const response = await sendHttpRequest(url, { ...config, body: data })
                setData(resData)
            }
            catch (error) {
                setError(error.message || 'something went wrong')
            }
            setIsLoading(false)
                , [url, config]
        }
    )
    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest()
        }
    }, [config, sendRequest])

    return (
        isLoading,
        data,
        error,
        sendRequest,
        clearData
    )
}