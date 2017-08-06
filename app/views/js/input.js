let importLocation;

$('#tempInput').click(() => {
    $('#importFile').click();
});

$('#importFile').change(() => {
    let fileLocation = document.getElementById('importFile').files[0].path;
    let filename = fileLocation.split('\\');
    $('#tempInput').val(filename[filename.length - 1]);
    importLocation = fileLocation;
});

$('#importBtn').click(() => {
    if (importLocation == null) {
        notify('Invalid Input');
        return;
    }

    $('.preloader').modal({backdrop: 'static', keyboard: false});

    setTimeout(() => {
        let result = readSimulation(importLocation);
        if (result) {
            window.location.href = 'test.html';
        }
        else {
            $('.preloader').modal('hide');
            notify('Invalid/Error reading document');
        }

    }, 2000);
    
});

$('#startBtn').click(() => {
    let trialInput = $('#trialInput').val();
    let drawInput = $('#drawInput').val();

    if(trialInput < 10 || trialInput > 100000) {
        notify('Invalid Input');
        return;
    }

    if(drawInput < 1 || drawInput > 5) {
        notify('Invalid Input');
        return;
    }
    $('.preloader').modal({backdrop: 'static', keyboard: false});

    setTimeout(() => {
        let result = startSimulation(trialInput, drawInput);
         window.location.href = 'test.html';
    }, 2000);
});


function notify(message) {
    alert(message);
}