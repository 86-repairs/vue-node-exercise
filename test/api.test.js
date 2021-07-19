const { request } = require('express');
const api = require('../api/api.js');
const got = require('got');



describe('API class', function() {
  let tenantUrl = 'http://localhost:8100';

  describe('GET /equipment/query ', function() {
    describe('When a valid manufacturer is passed', function() {
    test('it should return filtered results', async function() { 
      let manufacturer = 'Vulcan';
      let httpResponse = await got.get(`${tenantUrl}/equipment/query?manufacturer=${manufacturer}`);
      let resultObjects = JSON.parse(httpResponse.body);

      for(let resultObject of resultObjects){
        expect(resultObject.manufacturer === manufacturer);
      }
     });
    });

    describe('When an invalid manufacturer is passed', function() {
      test('it should return an empty array', async function() { 
        let manufacturer = "This doesn't exist";
        let httpResponse = await got.get(`${tenantUrl}/equipment/query?manufacturer=${manufacturer}`);
        let resultObjects = JSON.parse(httpResponse.body);
  
        expect(resultObjects.length === 0);

       });
      });

  });
});