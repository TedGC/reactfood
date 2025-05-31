



//the first one will be using hook for useHttp to sending Http requests to 
// fetch the date from the backend


import { useCallback, useEffect, useState } from 'react'




async function sendHttpRequest(url, config) {

    const response = await fetch(url, config)
    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.message || "something went wrong")
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
                const resData = await sendHttpRequest(url, { ...config, body: data })
                setData(resData)
            }
            catch (error) {
                setError(error.message || "something wentr wrong")
            }
            setIsLoading(false)
        }
        , [config, url])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            sendRequest()
        }
    }, [sendRequest, config])

    return ({
        isLoading,
        data,
        sendRequest,
        error,
        clearData
    }
    )
}


// slice actions using redux thunk method 


export const sendCardData = () => {
    return (dispatch) => () => {
        const fetchDat = async () => {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const data = await response.json()

            return data
        }

        try {
            const cardData = await fetchDat()
            dispatch(cartActions.replaceCart({
                items: cardData.items,
                totalQuantity: cardData.totalQuantity
            }))
        }
        catch (error) {
            dispatch(uiActions.showNotification({

            })))
        }
    }
}