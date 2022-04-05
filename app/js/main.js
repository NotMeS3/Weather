$(function () {
// =========================================================================================
    
    let date = new Date();
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let nowNumberDay = date.getDate()
    let nowDay = days[date.getDay()]
    let nowMonth = months[date.getMonth()]
    
    document.querySelector('.weather__day').textContent = `${nowDay}, ${nowNumberDay} ${nowMonth}`

    console.log(nowDay, nowNumberDay, nowMonth)


// =========================================================================================
    let FormCity = document.querySelector('.weather__form-select')
    let mycity;
    FormCity.addEventListener('change', () => {
        FormCity = document.querySelector('.weather__form-select')
        mycity = FormCity.value
        city(mycity)
    })
    
// =========================================================================================

    const city = function getCity (city) {
        return new Promise ((resolve, reject) => {
            fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&APPID=d1b67477cedd0d5f501dd1c04892739d`)
                .then(resp => {return resp.json()})
                .then(data => {
                    console.log(data)
                    document.querySelector('.weather__city-title').textContent = `Weather in ${data.list[0].name}`
                    document.querySelector('.weather__temperature-degree').innerHTML = `${Math.round(data.list[0].main.temp - 273)} &deg; `
                    
                    var weatherDesk = data.list[0].weather[0].description
                    switch (weatherDesk) {
                        case 'overcast clouds':
                            document.querySelector('.weather__sdelau').textContent = 'Небо слегка затянуто облаками :)'
                            break
                        case 'light rain':
                            document.querySelector('.weather__sdelau').textContent = 'На улице легкий дождик :)'
                            break
                        case 'broken clouds':
                            document.querySelector('.weather__sdelau').textContent = 'На небе рассеянные облачка :)'
                            break
                        case 'few clouds':
                            document.querySelector('.weather__sdelau').textContent = 'На небе немножко облачков :)'
                            break
                        case 'clear sky':
                            document.querySelector('.weather__sdelau').textContent = 'Небо кристально-чистое :)'
                            break
                        case 'scattered clouds':
                            document.querySelector('.weather__sdelau').textContent = 'Небо затянуто облачками :)'
                            break
                        case 'shower rain':
                            document.querySelector('.weather__sdelau').textContent = 'На улице идёт лёгкий дождик :)'
                            break
                        case 'rain':
                            document.querySelector('.weather__sdelau').textContent = 'На улице льет дождь :)'
                            break
                        case 'snow':
                            document.querySelector('.weather__sdelau').textContent = 'За окном идёт снежок :)'
                            break
                        case 'mist':
                            document.querySelector('.weather__sdelau').textContent = 'На улице туман :)'
                            break
                    }
                    document.querySelector('.weather__feeling').innerHTML = `Ощущается, как ${Math.round(data.list[0].main.feels_like - 273)} &deg;` 

                    document.querySelector('.weather__temperature-img').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="">`

                    document.querySelector('.weather__forecast-wind').innerHTML = `${Math.round(data.list[0].wind.speed)} м/с`
                    document.querySelector('.weather__forecast-humidity').innerHTML = `${data.list[0].main.humidity} %`
                    var dirWind = data.list[0].wind.deg
                    console.log(dirWind)
                    if (dirWind > 270 && dirWind < 360) {
                        document.querySelector('.weather__forecast-dirwind').textContent = 'С-З'
                    } else if (dirWind > 180 && dirWind < 270) {
                        document.querySelector('.weather__forecast-dirwind').textContent = 'Ю-З'
                    } else if (dirWind > 90  && dirWind < 180) {
                        document.querySelector('.weather__forecast-dirwind').textContent = 'Ю-В'
                    } else {
                        document.querySelector('.weather__forecast-dirwind').textContent = 'С-В'
                    }
                    switch (dirWind) {
                        case 270:
                            document.querySelector('.weather__forecast-dirwind').textContent = 'Западное'
                            break
                        case 0:
                            document.querySelector('.weather__forecast-dirwind').textContent = 'Северное'
                            break
                        case 90:
                            document.querySelector('.weather__forecast-dirwind').textContent = 'Восточное'
                            break
                        case 180:
                            document.querySelector('.weather__forecast-dirwind').textContent = 'Южное'
                            break
                    }
                })
                .catch(err => {return console.log('Ой...Что-то пошло не так, ', err)})
        })
    }
    city('Lipetsk')
// =========================================================================================


});

