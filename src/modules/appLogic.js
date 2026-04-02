import { updateState, updateLoadingState } from "./state.js";
import { render, renderErrorMessage } from "./rendering.js";

const weatherData = async (location) => {
    const apiKey = 'M67BGAQEVSFJ39E5M7EU7GK3H';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    } catch(e) {
        console.error(e.message);
    }
}

const requiredData = async (location) => {
    updateLoadingState();
    render();
    try {
        const jsonData = await weatherData(location);
        const requiredData = {
            currentConditions: jsonData.currentConditions,
            description: jsonData.description,
            days: jsonData.days,
            resolvedAddress: jsonData.resolvedAddress,
        }

        requiredData.days.forEach((day) => {
            day.id = crypto.randomUUID();
        })

        updateState(requiredData);
        updateLoadingState();
        render();
    } catch(e) {
        updateLoadingState();
        renderErrorMessage();
    } finally {
        updateLoadingState();
    }
}

export { requiredData };