/**
 * @typedef {object} error_response
 * @property {number} code - The status code of the error.
 * @property {Error|object} data - Error object or any data that is associated with the error.
 */

/**
 * @typedef {object} success_response
 * @property {number} code - The success status code.
 * @property {object|null} data - response data.
 */

/** @returns {success_response} */
const success = (data = null, code = 200) => ({ code, data });

/** @returns {error_response} */
const error = (data = null, code = 500) => ({ code, data });

module.exports = {
  success,
  error,
  Error: error,
  Success: success,
};