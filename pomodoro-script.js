const pluralize = require('./pluralize');
const notifier = require('node-notifier');
const WORK_DURATION = 25;
const REST_ICO_DIR = './icons/icon_rest.png';
const WORK_ICO_DIR = './icons/icon_work.png';
const path = require('path');
const WORD_FORMS = ['минута', 'минуты', 'минут'];
let counter = 1;

function pomodoroTimer() {
    notifier.notify({
        title: `Работа ${WORK_DURATION} ${pluralize(WORK_DURATION, WORD_FORMS)}`,
        message: 'Одно дело за раз',
        icon: path.join(__dirname, WORK_ICO_DIR)
    });

    let interval = setInterval(showTime, 60000);

    console.log('Работа началась в ', new Date().toLocaleTimeString());

    function showTime() {
        if (counter === 1) {
            console.log('Прошла 1 минута');

            counter++;
        } else if (counter === WORK_DURATION) {
            clearTimeout(interval);

            console.log('Время работы закончено!');

            notifier.notify({
                title: 'Перерыв!',
                message: 'Встать со стула, размяться.',
                icon: path.join(__dirname, REST_ICO_DIR)
            });
        } else {
            console.log(`Прошло ${counter} ${pluralize(counter, WORD_FORMS)}`);

            counter++;
        }
    }
}

module.exports = pomodoroTimer;
