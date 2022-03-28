console.log("Client side javascript file is loading!");

/*fetch('http://api.weatherstack.com/current?access_key=d8b74402a466df44e7553508104ee8de&query=alexandria').then((response)=>{
    response.json().then((data)=>{
      console.log(data);
    });
});*/


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const result = document.querySelector('.result');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
  const location = search.value;
  fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
      if(data.error)
      result.textContent = data.error;
      else{
          result.textContent = data.location + " " + data.forecast;
      }
    });
});
});




