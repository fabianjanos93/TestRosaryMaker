const rosaryImages = [];
const circles = [];

const arrows = [];

const arrowHeight = 40;
const arrowWidth = 25;
const spaceBetweenArrows = 30;

const topArrowRosaryColorChange = 140;
const leftArrowRosaryColorChange = 550;
const rightArrowRosaryColorChange = 652;

const topArrowThreadColorChange = topArrowRosaryColorChange + arrowHeight + spaceBetweenArrows;
const leftArrowThreadColorChange = leftArrowRosaryColorChange;
const rightArrowTheadColorChange = rightArrowRosaryColorChange;

function setup() {
    function ballPlacement() {
        //bottom
        circles.push(
            new RosaryBall(rosaryImages[0], 215, 800, 1),
            new RosaryBall(rosaryImages[0], 215, 760, 2),
            new RosaryBall(rosaryImages[0], 215, 740, 3),
            new RosaryBall(rosaryImages[0], 215, 720, 4),
            new RosaryBall(rosaryImages[0], 215, 680, 5),
        );
        // dot
        circles.push(
            new RosaryBall(rosaryImages[0], 120, 440, 16),
            new RosaryBall(rosaryImages[0], 120, 140, 27),
            new RosaryBall(rosaryImages[0], 310, 140, 38),
            new RosaryBall(rosaryImages[0], 310, 440, 49),
        );
        //clockwise start left segment 1
        for (i = 0; i < 10; i++) {
            circles.push(new RosaryBall(rosaryImages[0], 165 - 5 * i, 660 - i * 20, 6 + i))
        }
        //new segment 2
        for (i = 0; i < 10; i++) {
            circles.push(new RosaryBall(rosaryImages[0], 120, 380 - i * 20, 17 + i))
        }
        //new segment 4
        for (i = 0; i < 10; i++) {
            circles.push(new RosaryBall(rosaryImages[0], 310, 200 + i * 20, 39 + i))
        }
        //new segment 5
        for (i = 0; i < 10; i++) {
            circles.push(new RosaryBall(rosaryImages[0], 310 - 5 * i, 480 + i * 20, 50 + i))
        }
        //new segment 3
        circles.push(
            new RosaryBall(rosaryImages[0], 120, 83, 28),
            new RosaryBall(rosaryImages[0], 140, 71, 29),
            new RosaryBall(rosaryImages[0], 160, 60, 30),
            new RosaryBall(rosaryImages[0], 180, 45, 31),
            new RosaryBall(rosaryImages[0], 203, 30, 32),
            new RosaryBall(rosaryImages[0], 228, 30, 33),
            new RosaryBall(rosaryImages[0], 250, 45, 34),
            new RosaryBall(rosaryImages[0], 270, 60, 35),
            new RosaryBall(rosaryImages[0], 290, 71, 36),
            new RosaryBall(rosaryImages[0], 310, 83, 37));

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
        circles.push(mainBall);
    }
    function sendEmail() {
        var email = ('amyndira@gmail.com');
        var subject = ('My permanent subject line');
        var body = ('My permanent body contents');
        document.write('<a href="mailto:' + email + '?subject=' +subject+ '&body=' +body+ '">' + 'Click here to send email as well' + '<'+'/a>');
    }
    let canvas = createCanvas(800,1000);
    let orderButton = createButton("Requesting an offer");
    orderButton.position(leftArrowRosaryColorChange,topArrowRosaryColorChange-spaceBetweenArrows);
    orderButton.mouseClicked(sendEmail);


    background(230);

    rosaryImages.push(loadImage("images/blueball.png"),
        redBall = loadImage("images/redball.png"),
        greenBall = loadImage("images/greenball.png"))

    ballPlacement();

    arrows.push(new LeftArrow(leftArrowRosaryColorChange,topArrowRosaryColorChange,mainBall.imageIterateBackward),
                new RightArrow(rightArrowRosaryColorChange,topArrowRosaryColorChange,mainBall.imageIterateForward,
                    new LeftArrow(leftArrowThreadColorChange,topArrowThreadColorChange,)))
}

function draw() {
    function drawRosaryBalls() {
        circles.forEach(circle =>
            image(circle.image, circle.x, circle.y, circle.radius * 2, circle.radius * 2)
        );
    }

    function drawArrows() {
        arrows.forEach(arrow =>
            arrow.draw())
    }

    background(230);
    drawRosaryBalls();
    drawArrows();
}

function mouseClicked() {
    circles.forEach(circle => {
        if (isIntersect(circle)) {
            console.log(circle.id);
            circle.changeImg(mainBall.image);
        }
    });
    arrows.forEach(arrow => {
        if (isArrowClicked(arrow.x,arrow.y)) {
            arrow.function();
        }
    });
}

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