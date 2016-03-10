/**
 * Created by zmiter on 3/9/16.
 */
function Graph(id, leftX, rightX, bottomY, topY) {
    var vm = this;
    var MAGIC_HEIGHT_CONST = 0.9;
    vm.accuracy = 0.002;

    vm.plotNet = plotNet;
    vm.plotAxes = plotAxes;
    vm.setBorders = setBorders;
    vm.plot = plot;

    vm.canvas = document.getElementById(id);
    vm.width = vm.canvas.width;
    vm.height = vm.canvas.height;
    vm.setBorders(leftX, rightX, bottomY, topY);
    vm.context = vm.canvas.getContext("2d");

    vm.plotNet();
    vm.plotAxes();

    return vm;

    function plotNet() {
        vm.context.beginPath();
        var netStepX = vm.width * 0.05, netStepY = vm.height * 0.05;
        for (var i = 0; i < vm.width; i += netStepX) {
            vm.context.moveTo(i, 0);
            vm.context.lineTo(i, vm.height);
        }
        for (var i = 0; i < vm.height; i += netStepY) {
            vm.context.moveTo(0, i);
            vm.context.lineTo(vm.width, i);
        }
        vm.context.strokeStyle = '#eee';
        vm.context.stroke();
    }

    function plotAxes() {
        var middleX = vm.width / 2, middleY = vm.height / 2;
        vm.context.beginPath();

        vm.context.moveTo(middleX, vm.height);
        vm.context.lineTo(middleX, 0);
        vm.context.lineTo(middleX - 5, 5);
        vm.context.moveTo(middleX + 5, 5);
        vm.context.lineTo(middleX, 0);

        vm.context.moveTo(0, middleY);
        vm.context.lineTo(vm.width, middleY);
        vm.context.lineTo(vm.width - 5, middleY - 5);
        vm.context.moveTo(vm.width - 5, middleY + 5);
        vm.context.lineTo(vm.width, middleY);

        vm.context.strokeStyle = '#000';
        vm.context.stroke();
    }

    function setBorders(leftX, rightX, bottomY, topY) {
        if (leftX && rightX && bottomY && topY) {
            vm.leftX = leftX;
            vm.rightX = rightX;
            vm.bottomY = bottomY;
            vm.topY = topY;
        } else {
            if (!leftX && !rightX && !bottomY && !topY) {
                var proportion = vm.height / vm.width;
                vm.leftX = -5;
                vm.rightX = 5;
                vm.bottomY = vm.leftX * proportion;
                vm.topY = vm.rightX * proportion;
            }
        }
    }

    function plot(f) {
        vm.context.beginPath();
        var stepX = (vm.rightX - vm.leftX) * vm.accuracy,
            state = {
                x: vm.leftX, y: 0, x1: 0, y1: 0, lastY: 0, firstMove: true
            };
        while (state.x < vm.rightX) {
            state.y = f(state.x);
            state = drawOneLine(state);
            state.x += stepX;
        }
        vm.context.strokeStyle = 'green';
        vm.context.stroke();
    }

    function drawOneLine(state) {
        state.x1 = getXPosition(state.x);
        if (state.y !== undefined && !isNaN(state.y)) {
            state = performGraphicDrawing(state);
        } else {
            drawCircle(state.x1, vm.height / 2);
        }
        return state;
    }

    function drawCircle(x, y) {
        vm.context.beginPath();
        vm.context.fillStyle = 'red';
        vm.context.arc(x, y, 5, 0, Math.PI * 2, true);
        vm.context.closePath();
        vm.context.fill();
    }

    function performGraphicDrawing(state) {
        state.y1 = getYPosition(state.y);
        if (state.firstMove) {
            vm.context.moveTo(state.x1, state.y1);
            state.firstMove = false;
        } else {
            if (bigDifference(state)) {
                vm.context.moveTo(state.x1, state.y1);
                drawCircle(state.x1, state.y1);
            } else {
                if (considerableDifference(state)) {
                    // set graphic stroke
                    //vm.context.beginPath();
                    vm.context.strokeStyle = 'green';
                    vm.context.lineTo(state.x1, state.y1);
                    vm.context.stroke();
                } else {
                    vm.context.moveTo(state.x1, state.y1);
                }
            }
        }
        return state;
    }

    function bigDifference(state) {
        return (state.lastY <= 0 && state.y1 >= vm.height) ||
               (state.lastY >= vm.height && state.y1 <= 0);
    }

    function considerableDifference(state) {
        return Math.abs(state.lastY - state.y1) <= vm.height * MAGIC_HEIGHT_CONST;
    }

    function getYPosition(y) {
        return vm.height - (y - vm.bottomY) / (vm.topY - vm.bottomY) * vm.height;
    }

    function getXPosition(x) {
        return vm.width * (x - vm.leftX) / (vm.rightX - vm.leftX);
    }
}
