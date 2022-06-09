export const getCookie = (name) => {
    // https://docs.djangoproject.com/en/1.11/ref/csrf/#ajax
    let cookieValue = null;

    if (document.cookie && document.cookie != "") {
        const cookies = document.cookie.split(";");
        
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
};

export const deleteConfig = () => {
    return (
        {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    );
};

export const getConfig = () => {
    return (
        {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }
    );
};

export const patchConfig = (postData) => {
    return (
        {
            method: "PATCH",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(postData)
        }
    );
};

export const postConfig = (postData) => {
    return (
        {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(postData)
        }
    );
};
