import axios from "axios";

const instance = axios.create({
    baseURL : 'https://bank.gov.ua/',
})

export const currencyAPI = {
    getCurrencyAPI () {
        return instance.get('NBUStatService/v1/statdirectory/exchange?json', {
        })
            .then(response => {
                return response.data;
            })
    }
}