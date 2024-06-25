console.log("Is Axios Available?", "axios" in globalThis);

axios.interceptors.request.use(
    (config)=>{
    console.log("Now we can intercept the request before " +
        "it sends to the server");
    console.log("REQUEST:", config);
    return config;
});

axios.interceptors.response.use(
    (config)=>{
        console.log("Now we can intercept the response before " +
            "it retrieves to the client app");
        // config.data = "Hello";
        return config;
    });

const btnSendGetRequest = document
    .getElementById('btn-send-get-request');

const btnSendPostRequest = document
    .getElementById('btn-send-post-request');

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

btnSendGetRequest.addEventListener('click', async()=>{
    const response1 = await fetch(API_URL);
    console.log("FETCH DATA:", await response1.json());

    const response2 = await axios(API_URL);
    console.log("AXIOS DATA:", response2.data);
});

btnSendPostRequest.addEventListener('click', async ()=>{
    const response1 = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            userId: 1,
            title: "New Task",
            completed: false
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const responseBody1 = await response1.json();
    console.log("FETCH RESPONSE BODY:", responseBody1);

    const response2 = await axios(API_URL, {
        method: "POST",
        data: {
            userId: 1,
            title: "New Task",
            completed: false
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("AXIOS RESPONSE BODY:", response2.data);
});