/**
 * Created by zmiter on 3/9/16.
 */
function Graph(id, leftX, rightX, bottomY, topY) {
    var vm = this;
    vm.canvas = document.getElementById(id);
    vm.width = vm.canvas.width;
    vm.height = vm.canvas.height;
    vm.context = vm.canvas.getContext("2d");

    vm.plotNet = plotNet;
    vm.plotAxes = plotAxes;

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
        vm.context.closePath();
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

        vm.context.closePath();

        vm.context.strokeStyle = '#000';
        vm.context.stroke();
    }

    vm.plotNet();
    vm.plotAxes();
    return vm;
}
