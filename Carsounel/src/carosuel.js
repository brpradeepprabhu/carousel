(function () {

    var carosuel = function (ImageArray, x, y, mcHeight, mcWidth, stage, object) {

        var focalLength = 500, PosX = x, PosY = y, images_num = ImageArray.length, stager = stage,MovingTimer, ImageHolders = [], WholeContainer = new createjs.Container(), angleDifference = Math.PI * (360 / images_num) / 180;
        var floor = (object.floor === undefined) ? 150 : object.floor;
        var angleSpeed = (object.speed === undefined) ? 0.001 : object.speed;
        var radius = (object.radius === undefined) ? 200 : object.radius;
        for (var i = 0; i < ImageArray.length; i++) {
            var imageHolder = new createjs.Container();
            imageHolder.addChild(ImageArray[i]);
            var startingAngle = angleDifference * i;
            imageHolder.xpos = radius * Math.cos(startingAngle);
            imageHolder.zpos = radius * Math.sin(startingAngle);
            imageHolder.ypos = floor;
            imageHolder.name = String(i);
            imageHolder.currentAngle = startingAngle;
            var scaleRatio = focalLength / (focalLength + imageHolder.zpos);
            imageHolder.scaleX = imageHolder.scaleY = scaleRatio;
            imageHolder.x = PosX + imageHolder.xpos * scaleRatio;
            imageHolder.y = PosY + imageHolder.ypos * scaleRatio;
            imageHolder.name = i;
            WholeContainer.addChild(imageHolder);
            stager.addChild(WholeContainer);
            ImageHolders.push(imageHolder);
            MovingTimer = setInterval(
                function () {
                    Rotate();
                }, 100);
        }
        function Rotate() {

            for (var i = 0; i < ImageHolders.length; i++) {

                ImageHolders[i].currentAngle += angleSpeed;
                ImageHolders[i].xpos = radius * Math.cos(ImageHolders[i].currentAngle);
                ImageHolders[i].zpos = radius * Math.sin(ImageHolders[i].currentAngle);
                var scaleRatio = focalLength / (focalLength + ImageHolders[i].zpos);
                ImageHolders[i].scaleX = ImageHolders[i].scaleY = scaleRatio;
                ImageHolders[i].x = PosX + ImageHolders[i].xpos * scaleRatio;
                ImageHolders[i].y = PosY + ImageHolders[i].ypos * scaleRatio;
            }
            ImageHolders.sort(function (a, b) {
                if (a.zpos < b.zpos) {
                    return 1;
                } else {
                    return -1;
                }
            });
            for (var j = 0; j < ImageHolders.length; j++) {
                WholeContainer.setChildIndex(ImageHolders[j], j);
            }

        }

    };
    window.carosuel = carosuel;
}());