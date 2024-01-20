   

   // 1 ссылка

   const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

   let data = await fetch(url);
   data = await data.json();

   // 2 ссылка

   const secondUrl = 'https://restcountries.com/v3.1/all';

   let flags = await fetch(secondUrl);
   flags = await flags.json();
   
   console.log(data);
   console.log(flags);

   let box = document.querySelector('div > p');
   let flagsBox = document.querySelector('div > span');
  
  box.innerHTML = data.map((currency, index) => {
    const countriesWithCurrency = [];
    
    for (const country of flags) {
      if (country.currencies && country.currencies[currency.cc]) {
        countriesWithCurrency.push(country);
      }
    }
  
    return `<div style="display : flex; align-items: center; background: darkcyan; padding: 10px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); color: white">
              <div>
               <p style="font-size: 25px">${currency.txt}(${currency.cc})</p>
               <p>Курс до гривні: ${currency.rate.toFixed(3)} грн</p>
              </div>
              <div style = "margin-left: 30px; display: flex; gap: 20px; flex-wrap: wrap">
                ${countriesWithCurrency.map(country => `
                  <img width="100px"; height = "60px" src="${country.flags.png}" alt="flag of ${country.altSpellings}" title="${country.altSpellings}">
                `).join('')}
              </div>
            </div>`;
  });
   //
   let todayData = data.map( currency => `${currency.exchangedate}`);
   let todayDataArr = todayData[0]

   let h1 = document.querySelector('header > h1');

   h1.innerHTML += todayDataArr
