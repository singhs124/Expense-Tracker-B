export const fetchWithTimeOut = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options).catch(err => {
            console.error(`Fetch error for ${url}:`, err);
            throw new Error(`Connection failed: ${err.message}`);
        }),
        new Promise((_, reject) =>
            setTimeout(() => {
                reject(new Error('Request Timeout'))
            }, timeout)
        )
    ])
}