const getConsoleTime = () => {
    return new Date().toISOString().slice(0,19);
};

const printLog = (log) => {
    return console.log(`${getConsoleTime()} -> ${log}`);
};

module.exports = {
    printLog,
};
