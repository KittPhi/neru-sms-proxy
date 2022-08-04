import { Messages, Scheduler, Voice, neru } from 'neru-alpha';
const router = neru.Router();
const session = neru.createSession();
const voice = new Voice(session);

const contact = JSON.parse(process.env['NERU_CONFIGURATIONS']).contact; // contact:  { number: '19899450176', type: 'phone' }

await voice.onVapiAnswer('inboundCall').execute();

router.get('/', async (req, res, next) => {
  console.log('default route / has reached.');
  res.send("i'm alive!");
});

router.post('/inboundCall', async (req, res, next) => {
  try {
    const fromNumber = req.body.from;
    const last4Numbers = fromNumber.slice(-4);
    const lastNumbersSplit = last4Numbers.split('').join(' ');

    res.json([
      {
        action: 'talk',
        text: `Hello! We notice you are calling from ${lastNumbersSplit}. Thank you for calling`,
        bargeIn: true,
      },
      {
        action: 'input',
        type: ['dtmf'],
        dtmf: {
          timeOut: '10',
          submitOnHash: true,
        },
      },
    ]);
  } catch (error) {
    next(error);
  }
});

export { router };
