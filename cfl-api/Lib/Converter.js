const axios = require('axios');
require('dotenv').config();

class Converter {
  constructor() {
    this.apiKey = process.env.FREECURRENCYAPI_KEY;
    this.exchangeRates = {};
  }

  async fetchExchangeRates() {
    if (!this.apiKey) {
      return;
    }

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

  convertArea(area, fromUnit, toUnit) {
    const units = {
      sqmm: 0.000001,
      sqcm: 0.0001,
      sqm: 1,
      hectare: 10000,
      sqft: 0.09290304,
      acre: 4046.8564224,
      sqkm: 1000000,
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit)) {
      console.error('Invalid area unit specified.');
      return null;
    }

    return ((area * units[fromUnit]) / units[toUnit]).toFixed(2);
  }

  convertDataSize(value, fromUnit, toUnit) {
    const units = {
      B: 1,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4,
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit)) {
      console.error('Invalid data unit specified.');
      return null;
    }

    return ((value * units[fromUnit]) / units[toUnit]).toFixed(2);
  }

  convertSpeed(value, fromUnit, toUnit) {
    const units = {
      mps: 1,
      kph: 0.2777777778,
      mph: 0.44704,
      knot: 0.5144444444,
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit)) {
      console.error('Invalid speed unit specified.');
      return null;
    }

    return ((value * units[fromUnit]) / units[toUnit]).toFixed(2);
  }

  convertTemperature(temperature, fromUnit, toUnit) {
    let convertedTemperature;

    if (fromUnit === 'C' && toUnit === 'F') {
      convertedTemperature = (temperature * 9/5) + 32;
    } else if (fromUnit === 'F' && toUnit === 'C') {
      convertedTemperature = (temperature - 32) * 5/9;
    } else if (fromUnit === 'C' && toUnit === 'K') {
      convertedTemperature = temperature + 273.15;
    } else if (fromUnit === 'K' && toUnit === 'C') {
      convertedTemperature = temperature - 273.15;
    } else if (fromUnit === 'F' && toUnit === 'K') {
      convertedTemperature = (temperature - 32) * 5/9 + 273.15;
    } else if (fromUnit === 'K' && toUnit === 'F') {
      convertedTemperature = (temperature - 273.15) * 9/5 + 32;
    } else if (fromUnit === toUnit) {
      convertedTemperature = temperature;
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

  convertNumberBase(value, fromBase, toBase) {
    const sourceBase = Number(fromBase);
    const targetBase = Number(toBase);

    if (!Number.isInteger(sourceBase) || !Number.isInteger(targetBase) || sourceBase < 2 || sourceBase > 36 || targetBase < 2 || targetBase > 36) {
      console.error('Invalid number base specified.');
      return null;
    }

    const parsed = parseInt(String(value), sourceBase);

    if (Number.isNaN(parsed)) {
      console.error('Invalid value for source base.');
      return null;
    }

    return parsed.toString(targetBase).toUpperCase();
  }

  convertDuration(value, fromUnit, toUnit) {
    const units = {
      ms: 1,
      s: 1000,
      min: 60000,
      hr: 3600000,
      day: 86400000,
    };

    if (!units.hasOwnProperty(fromUnit) || !units.hasOwnProperty(toUnit)) {
      console.error('Invalid duration unit specified.');
      return null;
    }

    return ((value * units[fromUnit]) / units[toUnit]).toFixed(4);
  }

  convertTimestamp(value, fromUnit, toUnit) {
    const date =
      fromUnit === 'seconds'
        ? new Date(Number(value) * 1000)
        : fromUnit === 'milliseconds'
          ? new Date(Number(value))
          : fromUnit === 'iso'
            ? new Date(String(value))
            : null;

    if (!date || Number.isNaN(date.getTime())) {
      console.error('Invalid timestamp specified.');
      return null;
    }

    if (toUnit === 'seconds') {
      return Math.floor(date.getTime() / 1000);
    }

    if (toUnit === 'milliseconds') {
      return date.getTime();
    }

    if (toUnit === 'iso') {
      return date.toISOString();
    }

    console.error('Invalid timestamp unit specified.');
    return null;
  }

  convertColor(value, fromFormat, toFormat) {
    const rgb = this.parseColor(value, fromFormat);

    if (!rgb) {
      return null;
    }

    if (toFormat === 'hex') {
      return `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
    }

    if (toFormat === 'rgb') {
      return `rgb(${rgb.join(', ')})`;
    }

    console.error('Invalid color format specified.');
    return null;
  }

  parseColor(value, format) {
    if (format === 'hex') {
      const hex = String(value).replace('#', '').trim();

      if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        console.error('Invalid hex color specified.');
        return null;
      }

      return [0, 2, 4].map((start) => parseInt(hex.slice(start, start + 2), 16));
    }

    if (format === 'rgb') {
      const channels = String(value)
        .replace(/[^\d,]/g, '')
        .split(',')
        .map((channel) => Number(channel.trim()));

      if (channels.length !== 3 || channels.some((channel) => !Number.isInteger(channel) || channel < 0 || channel > 255)) {
        console.error('Invalid rgb color specified.');
        return null;
      }

      return channels;
    }

    console.error('Invalid color format specified.');
    return null;
  }
}

module.exports = Converter;
