export default function faq () {
    return [
        {
            question: 'Qué hace un rig?',
            answer: {
                text:['Un rig minero es una computadora que aporta trabajo a una red que funciona con tecnología Blockchain, una base de datos descentralizada, formada por una sucesión de bloques de información.', 'Una vez que un rig agrega un nuevo bloque a la cadena se puede decir que las transacciones dentro de ese bloque fueron validadas y son irreversibles. El trabajo que aporta nuestro rig a la red es el de agregar nuevos registros de transacciones como bloques a la Blockchain a cambio de una recompensa.', 'Esa recompensa en criptomoneda pagada por la red es el retorno que recibe el minero por su trabajo.']
            }
        },
        {
            question: 'Cuánto rinde un rig?',
            answer: {
                intro: 'Las variables que influyen mayormente en el rendimiento son:',
                text: [
                    '1.- Potencia de minado del rig: mientras más potente sea el rig, mayor retorno va a tener. La potencia depende de la cantidad de las placas de video que lo componen y de la capacidad de cada una.', 
                    '2.- Dificultad de la red: los rigs funcionan aportando trabajo a la red sobre la que se decide minar y por ese trabajo reciben un pago. Las redes tienen sistemas de regulación automático de la dificultad, esta varía subiendo y bajando constantemente. En los momentos que la dificultad de la red sube, al rig le lleva más tiempo realizar el trabajo y obtener el pago, por eso su rendimiento proyectado en el tiempo baja. Por el contrario cuando la dificultad de la red baja, el rig puede completar trabajos más rápidamente y obtener más pagos, como consecuencia su rendimiento aumenta.',
                    '3.- Recompensa de la red: Es la cantidad de criptomoneda que recibe el rig como pago por su trabajo en la red. También se ajusta automáticamente y varía subiendo y bajando.',
                    '4.- Cotización de la criptomoneda: la cotización de las criptomonedas es volatil salvo excepciones: las stablecoins. En los momentos que la cotización de la criptomoneda minada sube, el valor en USD del pago que obtiene el rig por su trabajo aumenta. Y lógicamente cuando la cotización baja, el valor en USD del pago obtenido, baja. Nuestro CATALOGO muestra en tiempo real el rendimiento de todos los modelos de rigs disponibles con proyecciones de retorno mensuales y anuales.'
                ]
            } 
        },
        {
            question: 'Cómo cobro mi dinero?',
            answer: {
                text:['Los rigs generan un ingreso en criptomoneda que se deposita automáticamente en tu billetera virtual. Esos pagos recibidos se pueden acumular para especular con subidas en la cotización, hacer trading o cambiar por dólares o pesos.', 'Es importante mencionar en esta sección que los equipos se entregan configurados para hacer los pagos a tu billetera con una contraseña elegida por vos.', 'Por lo que es imposible que cualquier otra persona acceda a la configuración de los pagos de tu minero.']
            }
        }
    ]
}