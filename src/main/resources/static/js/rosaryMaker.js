const rosaryImages = [];
const threadImages =[];
const displayThreadImages = [];
const crossImages = [];
const rosaryBalls = [];
const arrows = [];

const threadImageSideSize = 420.688837;

const arrowHeight = 40;
const arrowWidth = 25;
const spaceBetweenArrows = 30;

const topArrowRosaryColorChange = 140;
const leftArrowRosaryColorChange = 550;
const rightArrowRosaryColorChange = 652;

const topArrowThreadColorChange = topArrowRosaryColorChange + arrowHeight + spaceBetweenArrows;
const leftArrowThreadColorChange = leftArrowRosaryColorChange;
const rightArrowTheadColorChange = rightArrowRosaryColorChange;

const topArrowCrossTypeChange = topArrowThreadColorChange + arrowHeight + spaceBetweenArrows;
const leftArrowCrossTypeChange = leftArrowRosaryColorChange;
const rightArrowCrossTypeChange = rightArrowRosaryColorChange;

const topLeftCornerBallX = 132;
const topRightCornerBallX = 392;
const topCornerBallY = 54;

const middleLeftCornerBallX = 52;
const middleRightCornerBallX = 466;
const middleCornerBallY = 310;

const bottomCornerBallX = 259;
const bottomCornerBallY = 466;

const crossWitdh = 60;

var thread;
var cross;

function setup() {
    function ballPlacement() {
        //bottom
        rosaryBalls.push(
            new RosaryBall(ballPlaceholder, bottomCornerBallX, bottomCornerBallY+120, 1),
            new RosaryBall(ballPlaceholder, bottomCornerBallX, bottomCornerBallY+80, 2),
            new RosaryBall(ballPlaceholder, bottomCornerBallX, bottomCornerBallY+60, 3),
            new RosaryBall(ballPlaceholder, bottomCornerBallX, bottomCornerBallY+40, 4),
            new RosaryBall(ballPlaceholder, bottomCornerBallX, bottomCornerBallY, 5),
        );
        for (let i = 0; i < 10; i++) {
            rosaryBalls.push(new RosaryBall(ballPlaceholder, ((11-i) * bottomCornerBallX + (i+2) * middleLeftCornerBallX)/13, ((11-i) * bottomCornerBallY + (i+2) * middleCornerBallY)/13, 6 + i))
        }
        // dot
        rosaryBalls.push(
            new RosaryBall(ballPlaceholder, topLeftCornerBallX, topCornerBallY, 16));
        for (let i = 0; i < 10; i++) {
            rosaryBalls.push(new RosaryBall(ballPlaceholder, ((11-i) * middleLeftCornerBallX + (i+2) * topLeftCornerBallX)/13, ((11-i) * middleCornerBallY + (i+2) * topCornerBallY)/13, 17 + i))
        }
        rosaryBalls.push(
            new RosaryBall(ballPlaceholder, topRightCornerBallX, topCornerBallY, 27));
        for(let i = 0; i< 10; i ++) {
            rosaryBalls.push(new RosaryBall(ballPlaceholder, ((11-i) * topLeftCornerBallX + (i+2) * topRightCornerBallX)/13, ((11-i) * topCornerBallY + (i+2) * topCornerBallY)/13, 53, 28*i));}
        rosaryBalls.push(
            new RosaryBall(ballPlaceholder, middleLeftCornerBallX, middleCornerBallY, 38));
        for (let i = 0; i < 10; i++) {
            rosaryBalls.push(new RosaryBall(ballPlaceholder,((11-i) * topRightCornerBallX + (i+2) * middleRightCornerBallX)/13, ((11-i) * topCornerBallY + (i+2) * middleCornerBallY)/13, 39 + i))
        }
        rosaryBalls.push(
            new RosaryBall(ballPlaceholder, middleRightCornerBallX, middleCornerBallY, 49));
        for (let i = 0; i < 10; i++) {
            rosaryBalls.push(new RosaryBall(ballPlaceholder, ((11-i) * middleRightCornerBallX + (i+2) * bottomCornerBallX)/13, ((11-i) * middleCornerBallY + (i+2) * bottomCornerBallY)/13, 50 + i))
        }

        mainBall = new RosaryBall(rosaryImages[0], (leftArrowRosaryColorChange+arrowWidth+rightArrowRosaryColorChange)/2, topArrowRosaryColorChange+(arrowHeight/2), "Main Ball");
        mainBall.imagePointer = 0;
        mainBall.imageIterateForward = function () {
            if (mainBall.imagePointer === rosaryImages.length - 1) {
                mainBall.imagePointer = 0;
            } else {
                mainBall.imagePointer++;
            }
            mainBall.changeImg(rosaryImages[mainBall.imagePointer])
        };
        mainBall.imageIterateBackward = function () {
            if (mainBall.imagePointer === 0) {
                mainBall.imagePointer = rosaryImages.length - 1;
            } else {
                mainBall.imagePointer--;
            }
            mainBall.changeImg(rosaryImages[mainBall.imagePointer])
        };
        rosaryBalls.push(mainBall);
    }
    function sendEmail() {
        var email = ('amyndira@gmail.com');
        var subject = ('Rosary order');
        var body = ("\n\n\norder(please DO NOT delete): " + rosaryBalls.order());
        window.location.replace("mailto:" + email + '?subject=' +subject+ '&body=' +body);
    }
    function finishRosary() {

    }

    let canvas = createCanvas(800,800);
    let orderButton = createButton("Requesting an offer");

    orderButton.position(leftArrowRosaryColorChange,topArrowRosaryColorChange-spaceBetweenArrows);
    orderButton.mouseClicked(sendEmail);

    background(230);

    threadImages.push(loadImage("images/baseThread.png"),
                        loadImage("images/blueThread.png"),
                        loadImage("images/redThread.png"));
    thread = new Thread();
    thread.imageIterateForward = function () {
        if (thread.imagePointer === threadImages.length - 1) {
            thread.imagePointer = 0;
        } else {
            thread.imagePointer++;
        }
        thread.changeImg(threadImages[thread.imagePointer])
    };
    thread.imageIterateBackward = function () {
        if (thread.imagePointer === 0) {
            thread.imagePointer = threadImages.length - 1;
        } else {
            thread.imagePointer--;
        }
        thread.changeImg(threadImages[thread.imagePointer])
    };
    thread.changeImg(threadImages[0]);

    crossImages.push(loadImage("images/fullcross1.png"),
                        loadImage("images/cross1.png"),
                        loadImage("images/cross2.png"),
                        loadImage("images/cross3.png"));
    cross = new Cross();
    cross.imageIterateForward = function () {
        if (cross.imagePointer === crossImages.length - 1) {
            cross.imagePointer = 0;
        } else {
            cross.imagePointer++;
        }
        cross.changeImg(crossImages[cross.imagePointer])
    };
    cross.imageIterateBackward = function () {
        if (cross.imagePointer === 0) {
            cross.imagePointer = crossImages.length - 1;
        } else {
            cross.imagePointer--;
        }
        cross.changeImg(crossImages[cross.imagePointer])
    };
    cross.changeImg(crossImages[0]);

    ballPlaceholder = loadImage("images/ballPlaceholder.png");

    rosaryImages.push(loadImage("images/blueball.png"),
        redBall = loadImage("images/redball.png"),
        greenBall = loadImage("images/greenball.png"));

    ballPlacement();

    arrows.push(new LeftArrow(leftArrowRosaryColorChange,topArrowRosaryColorChange,mainBall.imageIterateBackward),
                new RightArrow(rightArrowRosaryColorChange,topArrowRosaryColorChange,mainBall.imageIterateForward),
                new LeftArrow(leftArrowThreadColorChange,topArrowThreadColorChange,thread.imageIterateBackward),
                new RightArrow(rightArrowTheadColorChange,topArrowThreadColorChange,thread.imageIterateForward),
                new LeftArrow(leftArrowCrossTypeChange,topArrowCrossTypeChange,cross.imageIterateForward),
                new RightArrow(rightArrowCrossTypeChange,topArrowCrossTypeChange,cross.imageIterateBackward))
}

function draw() {

    function drawRosaryBalls() {

        rosaryBalls.forEach(circle =>
            image(circle.image, circle.x, circle.y, circle.radius * 2, circle.radius * 2)
        );
    }
    function drawArrows() {

        arrows.forEach(arrow =>
            arrow.draw())
    }

    background(230);
    image(thread.image,50,50,threadImageSideSize,threadImageSideSize);
    image(thread.image,(leftArrowThreadColorChange+arrowWidth+rightArrowTheadColorChange)/2-15,topArrowThreadColorChange,30,(30/thread.image.width)*thread.image.height);
    image(cross.image,bottomCornerBallX-(crossWitdh/2),bottomCornerBallY+145,crossWitdh,(crossWitdh/cross.image.width)*cross.image.height);
    image(cross.image,(leftArrowCrossTypeChange+arrowWidth+rightArrowCrossTypeChange)/2-10,topArrowCrossTypeChange,20,(20/cross.image.width)*cross.image.height);
    drawRosaryBalls();
    drawArrows();

}

function mouseClicked() {
    //console.log("X: " + pmouseX + "| Y: " + pmouseY);
    rosaryBalls.forEach(circle => {
        if (isIntersect(circle)) {
            circle.changeImg(mainBall.image);
        }
    });
    arrows.forEach(arrow => {
        if (isArrowClicked(arrow.x,arrow.y)) {
            arrow.function();
        }
    });
}

rosaryBalls.order = function () {
    let order = "";
    for (let ball of rosaryBalls.slice(0,-1)) {
        order += (ball.id + " " + rosaryImages.indexOf(ball.image) + "; ");
    }
    return order;
};

function isIntersect(circle) {
    return Math.sqrt((pmouseX - circle.x - circle.radius) ** 2 + (pmouseY - circle.y - circle.radius) ** 2) <= circle.radius;
}

function isArrowClicked(x,y) {
    return pmouseX >= x
        && pmouseX <= x+arrowWidth
        && pmouseY >= y
        && pmouseY <= y+arrowHeight;
}

function RosaryBall(image,posX,posY,id) {
    this.image = image;
    this.id = id;
    this.radius = 10;
    this.x = posX - this.radius;
    this.y = posY - this.radius;
    this.changeImg = function(toChange) {this.image = toChange};
    return this;
}

function Thread(){
    this.imagePointer = 0;
    this.image = threadImages[0];
    this.changeImg = function(toChange) {this.image = toChange};
}

function Cross() {
    this.imagePointer = 0;
    this.image = crossImages[0];
    this.changeImg = function(toChange) {this.image = toChange};
}

function LeftArrow(x,y,functionToRun){
    this.draw = function() {
        let color = (30,30,30);
        fill(color);
        triangle(x+arrowWidth,y,x+arrowWidth,y+arrowHeight,x,y+(arrowHeight/2));};
    this.function = function() {functionToRun()};
    this.x = x;
    this.y = y;
    this.type = "left";
}

function RightArrow(x,y,functionToRun){
    this.draw = function() {
        let color = (30,30,30);
        fill(color);
        triangle(x,y,x,y+arrowHeight,x+arrowWidth,y+(arrowHeight/2));};
    this.function = function() {functionToRun()};
    this.x = x;
    this.y = y;
    this.type = "right";

}

/*rosaryBalls.load = function(stringInput) {
    let loaded = stringInput.replace("; ",";");
    loaded = loaded.split(";");
    for(let i = 0; i < rosaryBalls-1; i++) {
        if (loaded[i].split(""))
            }
    return loaded;
};*/