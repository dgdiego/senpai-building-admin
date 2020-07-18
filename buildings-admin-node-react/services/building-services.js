const Building = require('../models/building');
const Apartament = require('../models/apartament');
const { threadId } = require('./db-connection');

const getBuildingById = async (id) => {
    try {
        const building = await Building.getBuildingById(id);
        if (building) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: building
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existe edificio con el ID ${id}`
            };
        }
    }
    catch (error) {
        throw error;
    }
}

const getBuildingByName = async (name) => {
    try {
        const building = await Building.getBuildingByName(name)
        if (building) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: building
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existe un edificio con nombre ${name}`
            };
        }
    }
    catch (error) {
        throw (error);
    }

}

const getAllBuildings = async () => {
    try {
        const buildings = await Building.getAllBuildings()
        if (buildings) {
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: buildings
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existen edificios`
            };
        }
    }
    catch (error) {
        throw (error);
    }

}

const create = async (parms) => {
    try {
        const { name } = parms;

        const building = await Building.getBuildingByName(name);
        if (building) {
            return {
                status: 400,
                success: false,
                message: `Ya existe un edificio con el nombre ${name}`
            }
        } else {
            const newBuilding = await Building.create(parms);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: newBuilding
            };
        }
    } catch (error) {
        throw (error);
    }
}

const update = async (parms) => {
    try {
        const { id, name } = parms;

        const building = await Building.getBuildingById(id);
        if (!building) {
            return {
                status: 400,
                success: false,
                message: `No existe un edificio con el ID ${id}`
            }
        } else {
            if (building.name != name) {
                const buildingAux = await Building.getBuildingByName(name);
                if (buildingAux) {
                    return {
                        status: 400,
                        success: false,
                        message: `Ya existe un edificio con nombre ${name}`
                    }
                }
            }

            const updatedBuilding = await Building.update(parms);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: updatedBuilding
            };
        }
    } catch (error) {
        throw (error);
    }
}

const deleted = async (parms) => {
    try {
        const { id } = parms;

        const building = await Building.getBuildingById(id);
        if (!building) {
            return {
                status: 400,
                success: false,
                message: `No existe un edificio con el id ${id}`
            }
        } else {
            const apartaments = await Apartament.getAllApartamentsByBuilding(id);
            if (apartaments && apartaments.length > 0) {
                return {
                    status: 400,
                    success: false,
                    message: `El edificio con ID ${id} tiene apartamentos asignados`
                }
            }
            else {
                const deleted = await Building.delete(id);
                return {
                    status: 200,
                    success: true,
                    message: 'OK',
                    data: deleted
                }
            }
        }
    }
    catch (error) {
        throw (error);
    }
}

module.exports = {
    create,
    update,
    deleted,
    getBuildingById,
    getBuildingByName,
    getAllBuildings
}