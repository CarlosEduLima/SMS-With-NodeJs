require('dotenv').config();
const axios = require('axios');
const Totalvoice = require('totalvoice-node');
const client = new Totalvoice(process.env.TOTALVOICE_API_KEY);
const servers = [
    {
        name: "Servidor 1",
        url: "http://localhost:5000",
        developer: {
            name: "Carlos Eduardo",
            telefone: process.env.CARLOS_TELEPHONE
        },
        option:'call'
    },
    {
        name: "Servidor 2",
        url: "http://localhost:5002",
        developer: {
            name: "Carlos Eduardo",
            telefone: process.env.CARLOS_TELEPHONE
        },
        option:'sms'
    }
]

async function call() {
    console.log('Iniciando Monitoramento');
    for (const server of servers) {
        await axios({
            url: server.url,
        }).then((response) => {
            console.log(`${server.name} está no ar`);
        }).catch(() => {
            console.log(`${server.name} está fora do ar`);
            const message = `Olá, ${server.developer.name} o servidor ${server.name} está fora do ar`;
            const options = {
                velocidade: 2,
                tipo_voz: "br-Vitoria"
            };
            if(server.option === sms){
                client.sms.enviar(server.developer.telefone, message).then(() => {
                    console.log(`O desenvolvedor ${server.developer.name} foi avisado`);
                });
            }else{
                client.tts.enviar(server.developer.telefone, message, options).then(() => {
                    console.log(`O desenvolvedor ${server.developer.name} foi avisado`);
                });
            }
            
        });
    };
    console.log("Finalizando monitoramento")
};

call();
