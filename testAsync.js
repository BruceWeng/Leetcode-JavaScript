function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(console.log(`Finish setTimeout in ${time} ms`));
        }, time);
    })
};

async function start() {
    console.log('start');
    await sleep(3000);
    console.log('end');
};

start();
console.log('After start()');
