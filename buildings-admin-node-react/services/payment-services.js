const Payment = require('../models/payment');
const Apartament = require('../models/apartament');
const { threadId } = require('./db-connection');
const moment = require('moment');

const getPaymentById = async (id) => {
    try {
        const payment = await Payment.getPaymentById(id);
        if (payment) {
            payment.date = moment(payment.date).format('DD/MM/YYYY');
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: payment
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existe un pago con el ID ${id}`
            };
        }
    }
    catch (error) {
        throw error;
    }
}

const getPaymentsByApartament = async (id) => {
    try {
        const payments = await Payment.getPaymentsByApartament(id);
        if (payments) {
            const parsedData = parsePayments(payments);

            return {
                status: 200,
                success: true,
                message: 'OK',
                data: parsedData
            };
        } else {
            return {
                status: 404,
                success: false,
                message: `No existen pagos para el apartamento ${id}`
            };
        }
    }
    catch (error) {
        throw error;
    }
}

const create = async (parms) => {
    try {
        const { apartament_id } = parms;

        const apartament = await Apartament.getApartamentById(apartament_id);
        if (!apartament) {
            return {
                status: 400,
                success: false,
                message: `No existe un apartamento con el ID ${apartament_id}`
            }
        } else {
            const newPayment = await Payment.create(parms);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: newPayment
            };
        }
    } catch (error) {
        throw (error);
    }
}

const update = async (parms) => {
    try {
        const { id } = parms;

        const payment = await Payment.getPaymentById(id);
        if (!payment) {
            return {
                status: 400,
                success: false,
                message: `No existe un pago con el ID ${id}`
            }
        } else {
            const newPayment = await Payment.update(parms);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: newPayment
            };
        }
    } catch (error) {
        throw (error);
    }
}

const deleted = async (parms) => {
    try {
        const { id } = parms;

        const payment = await Payment.getPaymentById(id);
        if (!payment) {
            return {
                status: 400,
                success: false,
                message: `No existe un pago con el ID ${id}`
            }
        } else {
            const deleted = await Payment.delete(id);
            return {
                status: 200,
                success: true,
                message: 'OK',
                data: deleted
            };
        }
    } catch (error) {
        throw (error);
    }
}

const parsePayments = (payments) => {
    var parsed = payments.map((payment) => {
        var date = moment(payment.date)
        var copy = { ...payment };
        copy.date = date.format('DD/MM/YYYY')

        return copy;
    });

    return parsed;
}

module.exports = {
    create,
    update,
    deleted,
    getPaymentById,
    getPaymentsByApartament
}