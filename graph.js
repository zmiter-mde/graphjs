/**
 * Created by zmiter on 3/9/16.
 */
function Graph(id, leftX, rightX, bottomY, topY) {
    var vm = this;
    vm.plotNet = plotNet;
    vm.plotAxes = plotAxes;
    vm.setBorders = setBorders;
    vm.plot = plot;

    vm.canvas = document.getElementById(id);
    vm.width = vm.canvas.width;
    vm.height = vm.canvas.height;
    vm.setBorders(leftX, rightX, bottomY, topY);
    vm.context = vm.canvas.getContext("2d");

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
        var x = vm.leftX, stepX = (vm.rightX - vm.leftX) / 100, y = 0;
        vm.context.moveTo(x, getYPosition(f(x)));
        while (x < vm.rightX) {
            x += stepX;
            y = f(x);
            console.log(getXPosition(x) + ' ' + getYPosition(y));
            vm.context.lineTo(getXPosition(x), getYPosition(y));
        }
        vm.context.strokeStyle = 'green';
        vm.context.stroke();
    }

    function getYPosition(y) {
        return vm.height - (y - vm.bottomY) / (vm.topY - vm.bottomY) * vm.height;
    }

    function getXPosition(x) {
        return vm.width * (x - vm.leftX) / (vm.rightX - vm.leftX);
    }

    vm.plotNet();
    vm.plotAxes();
    return vm;
}
