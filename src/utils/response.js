module.exports = (status, data, message) => {
  return {
    message: message || null,
    data: data || null,
    status: status == null ? true : success,
  };
};
