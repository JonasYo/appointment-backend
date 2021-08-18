var seeder = require('mongoose-seed');
var config = require('config');

const dbUri = config.get("dbUri");
console.log(dbUri);

seeder.connect(dbUri, function () {
    seeder.loadModels([
        'src/model/schedules.ts',
        'src/model/services.ts',
    ]);

    seeder.clearModels(['Schedules','Services'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });

    });
});

var data = [
    {
        'model': 'Schedules',
        'documents': [
            {
                hour: '08:30',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                hour: '09:00',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                hour: '09:30',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                hour: '10:00',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                hour: '10:30',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]
    }, 
    {
        'model': 'Services',
        'documents': [
            {
                name: 'Design de Sobrancelha',
                description: 'Teste Design de Sobrancelha',
                category: 'Sobrancelha',
                duration: 30,
                price: 60.0,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Maquiagem Social com Cílios',
                description: 'Teste',
                category: 'Estética Facial',
                duration: 90,
                price: 130.0,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: ' Sobrancelhas',
                description: 'Teste',
                category: 'Maquiagem',
                duration: 30,
                price: 40.0,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Design Sobrancelha + Buço',
                description: 'Teste',
                category: 'Maquiagem',
                duration: 60,
                price: 80.0,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Sobrancelhas + Buço',
                description: 'Teste',
                category: 'Maquiagem',
                duration: 30,
                price: 55.0,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Penteado',
                description: 'Teste',
                category: 'Maquiagem',
                duration: 60,
                price: 140.0,
                created_at: new Date(),
                updated_at: new Date(),
            },
      ],
    }
];