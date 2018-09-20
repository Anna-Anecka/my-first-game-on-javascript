let cvs = document.getElementById('canvas');

/*Создаем переменную,которая будет отвечать за вид нашей игры*/
let ctx = cvs.getContext('2d');

/*Создаем обьекты для каждого изображения*/
let bird = new Image();//птичка
let bg = new Image();//задний фон
let fg = new Image();//передний фон
let pipeUp = new Image();//препятствие сверху
let pipeBottom = new Image();//препятствие снизу

/*Загрузка изображений*/
bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';

/*Добавляем звуковые файлы*/
let fly = new Audio();
let score_audio = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';

/*создадим переменную,в которой будут лежать отступы между препятствиями*/
let gap = 90;

/*При нажатии на какую-либо кнопку*/
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos-=25;
    fly.play();
}

/*Создание блоков*/
let pipe = [];

/*Создаем обьект, в котором будут координаты для x и y*/
pipe[0] = {
    x: cvs.width,
    y: 0
};

let score = 0;
/*Позиция птички*/
let xPos = 10;
let yPos = 150;
let grav = 1.5;


/*Нарисуем все обьекты в canvas*/
function draw(){
    ctx.drawImage(bg, 0, 0);//указываем что рисуем bg(background и координаты 0 по оси х и 0 по y

    /*Рисуем блок в цикле*/
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); //распологаем pipeUp ,т.е препятствие сверху
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y +
        pipeUp.height + gap); //распологаем pipeBottom ,т.е препятствие снизу

        /*Делаем чтобы блоки передвигались*/
        pipe[i].x--;

        /*Делаем так,чтобы новые блоки создавались постоянно*/
        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        /*Пишем условие, которое проверяет столкновение птички и блока*/
        if(xPos + bird.width >= pipe[i].x
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height+
            gap) || yPos + bird.height >= cvs.height - fg.height){

            location.reload(); //Начинаем игру заново

        }

        /*Добавляем кол-во очков*/
        if(pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }


    ctx.drawImage(fg, 0, cvs.height - fg.height); //распологаем передний фон
    ctx.drawImage(bird, xPos, yPos); //распологаем птичку

    yPos+=grav;//Позицию птички всегда меняем на единицу

    /*Создаем стиль для текста*/
    ctx.fillStyle = '#000';

    /*Указываем шрифт текста*/
    ctx.font = '24px Verdana';

    /*Устанавливаем сам текст*/
    ctx.fillText('Счет: ' + score, 10, cvs.height - 20);

    /*Делаем анимацию,чтобы метод draw вызывался постоянно, птичка будет падать вниз*/
    requestAnimationFrame(draw);
}

/*Указываем,что когда загружена последняя картинка,тогда вызываем функцию draw*/
pipeBottom.onload = draw;
