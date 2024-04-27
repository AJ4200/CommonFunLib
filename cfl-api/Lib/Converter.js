const axios = require('axios');
require('dotenv').config();

class Converter {
  constructor() {
    this.apiKey = process.env.FREECURRENCYAPI_KEY || 'your_default_api_key';
    this.exchangeRates = {};
  }

  async fetchExchangeRates() {
    try {
      const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${this.apiKey}`);
      this.exchangeRates = response.data.data;
    } catch (error) {
      console.error('An error occurred while fetching exchange rates:', error);
    }
  }

  convertCurrency(amount, fromCurrency, toCurrency) {
    if (!this.exchangeRates.hasOwnProperty(fromCurrency) || !this.exchangeRates.hasOwnProperty(toCurrency)) {
      console.error('Invalid currency specified.');
      return null;
    }

    const fromRate = this.exchangeRates[fromCurrency];
    const toRate = this.exchangeRates[toCurrency];
    const convertedAmount = (amount / fromRate) * toRate;

    return convertedAmount.toFixed(2);
  }

  convertLength(length, fromUnit, toUnit) {
    const units = {
      mm: 1,
      cm: 10,
      m: 1000,
      km: 1000000,
      inch: 25.4,
      foot: 304.8,
      yard: 914.4,
      mile: 1609344,
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit)) {
      console.error('Invalid unit specified.');
      return null;
    }

    const conversionFactor = units[fromUnit] / units[toUnit];
    const convertedLength = length * conversionFactor;

    return convertedLength.toFixed(2);
  }

  convertWeight(weight, fromUnit, toUnit) {
    const units = {
      mg: 1,
      g: 1000,
      kg: 1000000,
      lb: 453592.37,
      oz: 28349.52,
      ton: 1000000000,
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit)) {
      console.error('Invalid unit specified.');
      return null;
    }

    const conversionFactor = units[fromUnit] / units[toUnit];
    const convertedWeight = weight * conversionFactor;

    return convertedWeight.toFixed(2);
  }

  convertTemperature(temperature, fromUnit, toUnit) {
    let convertedTemperature;

    if (fromUnit === 'C' && toUnit === 'F') {
      convertedTemperature = (temperature * 9/5) + 32;
    } else if (fromUnit === 'F' && toUnit === 'C') {
      convertedTemperature = (temperature - 32) * 5/9;
    } else {
      console.error('Invalid temperature unit specified.');
      return null;
    }

    return convertedTemperature.toFixed(2);
  }

  convertLengthSystem(value, fromSystem, toSystem) {
    const lengthUnits = {
      metric: ['mm', 'cm', 'm', 'km'],
      imperial: ['inch', 'foot', 'yard', 'mile'],
    };

    if (!lengthUnits.hasOwnProperty(fromSystem) || !lengthUnits.hasOwnProperty(toSystem)) {
      console.error('Invalid length system specified.');
      return null;
    }

    let convertedValue;

    if (fromSystem === 'metric' && toSystem === 'imperial') {
      convertedValue = this.convertLength(value, 'm', 'yard');
    } else if (fromSystem === 'imperial' && toSystem === 'metric') {
      convertedValue = this.convertLength(value, 'yard', 'm');
    } else {
      console.error('Cannot convert between the same length systems.');
      return null;
    }

    return convertedValue;
  }
}

module.exports = Converter;
