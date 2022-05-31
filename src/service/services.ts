import Services, { ServicesDocument } from "../model/services";

const findAll = async () => {
    try {
        const response = await Services.find({});

        const hash = Object.create(null);
        const services: any = [];

        response.forEach((o:any) => {
            var key = ['category'].map((k) => { return o[k]; }).join('|');

            if (!hash[key]) {
                hash[key] = { category: o.category, items: [] };
                services.push(hash[key]);
            }

            ['category'].forEach(() => { hash[key]['items'].push(o) });
        });

        return services;
    } catch (error) {
        console.log('error', error);
    }
}

export { findAll }