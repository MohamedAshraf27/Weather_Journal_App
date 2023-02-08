/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = ',us&appid=d032c26b53033c1b8fe427a3cf61d66a&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener for generate
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    let zipCode = document.getElementById("zip").value;
    let userFeelings = document.getElementById("feelings").value;
    getWeatherData(baseURL,zipCode,apiKey)
    .then(function(data) {
        console.log(data);
        postWeatherData('/inData', {date: newDate, temperature: data.list[0].main.temp, userRes: userFeelings})
        updateUI();
    });
};

// Async function to make a get request to the API
const getWeatherData = async (URL, zip, Key) => {
    const res = await fetch(URL+zip+Key)
    try {
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
};
//Async function to post data 
const postWeatherData = async(url= "", data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
};
//async function 
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date is: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature is: ${allData.temperature}`;
        document.getElementById('content').innerHTML = `I feel ${allData.userRes}`;
    }
    catch {
        console.log("error", error);
    }
}