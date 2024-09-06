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

export const weatherData = ref(null);

export const getWeather = async (id) => {
    try {
        const res = await fetch(`api=id:${id}apicont`);
        const data = await res.json();
        weatherData.value = data;
    }
    catch {
        console.error('Error fetching weather data:', error);
    }
};