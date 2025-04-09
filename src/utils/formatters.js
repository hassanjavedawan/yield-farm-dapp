/**
 * Format a number to a specified number of decimal places
 * @param {number|string} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 4) => {
  if (!value) return '0';
  return parseFloat(value).toFixed(decimals);
};

/**
 * Format an address to a shortened form
 * @param {string} address - The address to format
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Format a currency value
 * @param {number|string} value - The value to format
 * @param {string} symbol - Currency symbol
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, symbol = '', decimals = 4) => {
  if (!value) return `0 ${symbol}`;
  return `${formatNumber(value, decimals)} ${symbol}`;
};

/**
 * Format a percentage
 * @param {number|string} value - The percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 2) => {
  if (!value) return '0%';
  return `${formatNumber(value, decimals)}%`;
};
