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


export default function use