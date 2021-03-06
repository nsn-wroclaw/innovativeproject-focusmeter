// Setup meeting

$(function () {
    $("#title , #datepicker, #startHour, #endHour").jqBootstrapValidation();
});

function goBackToStartScreen() {
    window.location = './index.html';
}

$(document).ready(function () {
    var options = {
        pattern: 'dd mm yyyy', // Default is 'mm/yyyy' and separator char is not mandatory
        startYear: 2000,
        finalYear: 2099,
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    $('#datepicker').datepicker();

    $('#startHour').ptTimeSelect();

    $('#endHour').ptTimeSelect();

    $(".btn-success").click(function () {
        var date = $("#datepicker").val();

        var title = $("#title").val();

        var startHour = $("#startHour").val();

        var endHour = $("#endHour").val();

        var mac = "12-32-43-54-65-76";



        $.ajax({
            type: "POST",
            url: "http://antivps.pl:3033/addMeeting",
            data: {
                "date": date,
                "title": title,
                "startHour": startHour,
                "endHour": endHour,
                "mac": mac
            },
            processData: true,
            success: function (data) {
                alert("Meeting created!\nMeeting code: " + data.meetingCode);
                $("#code_1").val(data.meetingCode.charAt(0));
                $("#code_2").val(data.meetingCode.charAt(1));
                $("#code_3").val(data.meetingCode.charAt(2));
                $("#code_4").val(data.meetingCode.charAt(3));


            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 0) {
                    alert("Verify network.");
                } else if (jqXHR.status == 404) {
                    alert("Requested page not found.");
                } else if (jqXHR.status == 500) {
                    alert("Internal Server Error.");
                } else if (textStatus === "timeout") {
                    alert("Time out error.");
                } else {
                    alert("Uncaught Error.\n" + jqXHR.responseText);
                }
            }
        });
    });
});
