const Config = {
    database: "C:\\ecosis\\dados\\ecodados.eco",
    host: '127.0.0.1',
    port: 3050,
    user: 'SYSDBA',
    password: 'masterkey',
    role: null,
    pageSize: 4096,
    timeout: 3000,
    lowercase_keys: false,
    retryConnectionInterval: 1000
};

module.exports = Config;

/*
module.exports = Config => {

    var options = {};

    options.host = '127.0.0.1';
    options.port = 3050;
    options.database = "C:\\ecosis\\dados\\ecodados.eco";
    options.user = 'SYSDBA';
    options.password = 'masterkey';
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null;            // default
    options.pageSize = 4096;        // default when creating database
    options.pageSize = 4096;        // default when creating database
    options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop
}

*/