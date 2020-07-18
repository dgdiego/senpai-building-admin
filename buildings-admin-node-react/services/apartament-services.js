const Apartament = require('../models/apartament');
const Building = require('../models/building');
const { threadId } = require('./db-connection');

const getAllApartamentsByBuilding = async (idBuilding) => {
    try {
        const apartaments = await Apartament.getAllApartamentsByBuilding(idBuilding);
        if (apartaments) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: apartaments
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existen apartamentos para el Edificio ${idBuilding}`
            };
        }
    }
    catch (error) {
        throw error;
    }
}

const getApartamentById = async (id) => {
    try {
        const apartament = await Apartament.getApartamentById(id)
        if (apartament) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: apartament
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existe el apartamento con el ID ${id}`
            };
        }
    }
    catch (error) {
        throw (error);
    }

}

const create = async (parms) => {
    try {
        const { number, building_id, type } = parms;

        const building = await Building.getBuildingById(building_id);
        if (!building) {
            console.log(`No existe un edificio con el ID ${building_id}`);
            return {
                status: 400,
                success: false,
                message: `No existe un edificio con el ID ${building_id}`
            }
        } else {
            const apartament = await Apartament.getApartamentByKey(number, building_id, type);
            if (apartament) {
                console.log(`Ya existe el apartamento ${number} para el edificio ${building.name}`)
                return {
                    status: 400,
                    success: false,
                    message: `Ya existe el apartamento ${number} para el edificio ${building.name}`
                }
            } else {
                const newApartament = await Apartament.create(parms);
                return {
                    status: 200,
                    success: true,
                    message: 'OK',
                    data: newApartament
                };
            }
        }
    } catch (error) {
        throw (error);
    }

    //}

    // Building.getBuildingById(building_id)
    //     .then((building) => {
    //         if (!building) {
    //             console.log('No existe el edificio');
    //             result = {
    //                 status: 400,
    //                 success: false,
    //                 message: `No existe un edificio con el ID ${building_id}`
    //             };
    //             return result;
    //         } else {
    //             console.log('Validé el edificio');
    //             return Apartament.getApartamentByKey(number, building_id, type)
    //         }
    //     })
    //     .then((found) => {
    //         if (!found) {
    //             console.log('No encontrado el apartamento');
    //             return Apartament.create(parms);
    //         } else {
    //             console.log(result);
    //             if (!result) {
    //                 console.log('Sin errores previos');
    //                 result = {
    //                     status: 400,
    //                     success: false,
    //                     message: `Ya existe el apartamento ${number} para el edificio`
    //                 };
    //             }
    //             return null;
    //         }
    //     })
    //     .then((created) => {
    //         if (created) {
    //             console.log('Luego del creado');
    //             resolve({
    //                 status: 200,
    //                 success: true,
    //                 message: 'OK',
    //                 data: created
    //             });
    //         } else {
    //             console.log('Sin crear');
    //             resolve(result);
    //         }
    //     })
    //     .catch((error) => {
    //         rejected(error);
    //     });

    //});
}

module.exports = {
    create,
    getApartamentById,
    getAllApartamentsByBuilding
}