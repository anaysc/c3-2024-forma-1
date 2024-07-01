const request = require('supertest');
//const app = require('../../../src/index');
const sinon = require('sinon');
const worldCitiesRepository = require('../../../src/domain/cities/repository/worldCitiesRespository');
import { server, app } from '../../../src/index'

describe('GET /api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })

    afterEach(() => {
        sinon.restore();
    });

    test('should respond with an array of cities if data exists', async () => {
        //un ejemplo de lo que debería devolver searchCitiesByCountryName al buscar ciudades del país "Chile"
        const mockCities = [
            { name: 'Valparaíso', country: 'Chile' },
            { name: 'Quilpué', country: 'Chile' }
        ];

        sinon.stub(worldCitiesRepository, 'searchCitiesByCountryName').returns(mockCities);

        const response = await request(app.callback()).get('/api/cities/by_country/Chile');
        console.log(response.body);  // verificar la respuesta en la consola
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCities);
    });

    test('should respond with a message if no cities are found', async () => {
        //reemplazar la implementación real de la función con un array vacío para simular que no se encontraron ciudades
        sinon.stub(worldCitiesRepository, 'searchCitiesByCountryName').returns([]); 

        const response = await request(app.callback()).get('/api/cities/by_country/Chile');
        expect(response.status).toBe(200);
        console.log(response.body);  // verificar la respuesta en la consola
        expect(response.body).toEqual({ message: "No se encontraron ciudades para el país ingresado" });
        //edité usecase de getCitiesByCountryUseCase para que funcione el test
    });

    test('should respond with a 400 status if the country name contains non-alphabetic characters', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Ch1le'); //probamos poniendo un "1"
        expect(response.status).toBe(400);
        console.log(response.body);  // verificar la respuesta en la consola
        expect(response.body).toEqual({ message: "Solo se aceptan caracteres no numéricos" });
        //edité usecase de getCitiesByCountryUseCase para que funcione el test
    });

    it('should respond with a 400 status if the country name is less than 3 characters', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Pa');
        expect(response.status).toBe(400);
        console.log(response.body);  // verificar la respuesta en la consola
        expect(response.body).toEqual({ message: "El país/ciudad ingresado debe tener al menos 3 caracteres" });
        //edité usecase de getCitiesByCountryUseCase para que funcione el test
    });

});


describe('GET /api/cities/by_city_and_country/:city/:country', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should respond with a 400 status if the city name is less than 3 characters', async () => {
        const response = await request(server).get('/api/city/Va/country/Chile');
        expect(response.status).toBe(400);
        console.log(response.body);  // verificar la respuesta en la consola
        expect(response.body).toEqual({ message: "El país/ciudad ingresado debe tener al menos 3 caracteres" });
        //edité usecase de getCitiesByCityNameAndCountryUseCase para que funcione el test

    });
});