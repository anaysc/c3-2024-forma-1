import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {

    const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country);

    if (cities.length === 0) {
        ctx.status = 200;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
    } else {
        ctx.status = 200;
        ctx.body = cities;
    }
    
    ///[^a-zA-Z]/ ^ dentro de los corchetes [] indica una negación, es decir, cualquier carácter que no esté en el rango especificado
    // osea, cualquier caracter que no sea una letra mayúsucla o minúscula
    if (/[^a-zA-Z]/.test(ctx.params.country)) {
        ctx.status = 400;
        ctx.body = { message: "Solo se aceptan caracteres no numéricos" };
        return;
    }

    if (ctx.params.country.length < 3) {
        ctx.status = 400;
        ctx.body = { message: "El país/ciudad ingresado debe tener al menos 3 caracteres" };
        return;
    }

    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    if (ctx.params.city.length < 3 || ctx.params.country.length < 3) {
        ctx.status = 400;
        ctx.body = { message: "El país/ciudad ingresado debe tener al menos 3 caracteres" };
        return;
    }
    return ctx;
}