import { getState, getLoadingState } from "./state.js";
import formHandler from "./formHandling.js";
import img from '../../assets/tube-spinner.svg';
import getAssets from '../../assets/asset.js';
import { parse, isToday, isTomorrow, format } from 'date-fns'

const content = document.querySelector('#content');
const asset = getAssets();

const renderErrorMessage = () => {
    content.innerHTML = "";
    const errorMessage = document.createElement('h1');
    errorMessage.textContent = `Can't find location, try another one!`
    content.append(errorMessage);
}

const blockRender = (data, container) => {
    for (let i = 0; i < data.length; i++) {
        const parsedDate = parse(data[i].datetime, 'yyyy-MM-dd', new Date());
        const div = document.createElement('div');
        div.dataset.id = data[i].id;
        div.classList.add('grid-item');
        container.append(div);
        const img = document.createElement('div');
        if (data[i].icon == 'partly-cloudy-day') {
            img.innerHTML = asset.partiallyCloudySVG;
        } else if (data[i].icon == 'snow') {
            img.innerHTML = asset.snowySVG;
        } else if (data[i].icon == 'rain') {
            img.innerHTML = asset.rainySVG;
        } else if (data[i].icon == 'clear-day') {
            img.innerHTML = asset.clearSVG;
        } else if (data[i].icon == 'cloudy') {
            img.innerHTML = asset.cloudySVG;
        }
        const date = document.createElement('h2');
        const description = document.createElement('h3');
        const temp = document.createElement('h3');
        const feelsLike = document.createElement('h3');

        if (isToday(parsedDate)) {
            date.textContent = 'Today';
        } else if (isTomorrow(parsedDate)) {
            date.textContent = 'Tomorrow';
        } else {
            date.textContent = format(parsedDate, 'eee, do MMMM');;
        }

        description.textContent = data[i].description;
        temp.textContent = 'Temperature: ' + data[i].temp + '°F';
        feelsLike.textContent = 'Feels Like: ' + data[i].feelslike + '°F';

        div.append(img, date, description, temp, feelsLike);
    }
}

const render = () => {
    formHandler();
    content.innerHTML = "";
    const data = getState();
    const loading = getLoadingState();

    if (!data.days && !loading) {
        return;
    }

    if (loading) {
        const svg = document.createElement('img');
        svg.src = img;
        svg.classList.add('loader');
        content.append(svg);
    } else {
        const city = document.createElement('h1');
        city.textContent = data.resolvedAddress;
        const summary = document.createElement('p');
        summary.textContent = data.description;
        const topDiv = document.createElement('div');
        const bottomDiv = document.createElement('div');
        bottomDiv.classList.add('grid');
        topDiv.append(city, summary);
        content.append(topDiv, bottomDiv);
        blockRender(data.days, bottomDiv);
    }
}

export { render, renderErrorMessage };