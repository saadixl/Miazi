const axios = require('axios');

const main = async () => {
    console.log('Test service executed.');
    // Test /get_all_water_intake api
    const resp = await axios.post('http://hydration-tracker:3006/get_all_water_intake', {}, {
        headers: {
        'content-type': 'application/json'
        }
    });
    console.log(resp.data);
};

main();