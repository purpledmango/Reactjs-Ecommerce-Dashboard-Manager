const getCookieData = (cookieName) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [cookieLabel, cookieValue] = cookie.trim().split('=');
        if (cookieLabel === cookieName) {
            return cookieValue;
        }
    }
    return null;
}

export default getCookieData;