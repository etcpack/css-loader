module.exports = function (fileurl) {
    return fileurl.replace(/(.+\.)([a-z0-9]+)$/, '$2');
};
