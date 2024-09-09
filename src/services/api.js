import { reactive } from 'vue';
import { ref } from 'vue';

export const searchQuery = reactive({
    query: '',
    timeout: null,
    results: null
});


export const handleSearch = async () => {
    if (searchQuery.query !== '') {
        clearTimeout(searchQuery.timeout);

        searchQuery.timeout = setTimeout(async () => {
            try {
                const res = await fetch(`api=${searchQuery.query}`);
                const data = await res.json();
                searchQuery.results = data;
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 500);
    }
    else {
        searchQuery.results = null;
    }
};

export const weatherData =  ref(JSON.parse(sessionStorage.getItem('weatherData')) || null);

export const getWeather = async (id) => {
    try {
        const res = await fetch(`api=id:${id}api`);
        const data = await res.json();
        weatherData.value = data;
        sessionStorage.setItem('weatherData', JSON.stringify(data));
    }
    catch {
        console.error('Error fetching weather data:', error);
    }
};

export const titles = ['Today', 'Tomorrow', 'Day After'];

export const forDays = titles.map((title, index) => ({
    id: index,
    title: title
}));