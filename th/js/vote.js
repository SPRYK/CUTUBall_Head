const dictionary_of_name = {
    'C1': 'อามรยา',
    'C2': 'ซีพีรณัฐ'
}

function ConfirmVote(html_link, b) {
    if (!b) {
        Modal_alert('Alert!', "Invalid");
    } else if ($('input[type="checkbox"]:checked').length < 1) {
        Modal_alert('Alert!', 'กรุณาเลือกผู้สมัครหนึ่งคน');
    } else {
        var selected_name = "",
            selected_id = ""
        $('input[type="checkbox"]:checked').each(function(index) {
            selected_id = $(this).val();
        })
        selected_name = dictionary_of_name[selected_id];
        selected_id = selected_id[1]
        Modal_agree('Warning!', 'คุณต้องการเลือก "' + selected_name + '" ใช่หรือไม่', function() {
            var args = getQueryStringArgs();
            var person = {
                "stuID": args["studentid"],
                "projectName": "TUCUBALL-CL", //ProjectName
                "vote": [selected_id]
            };
            $("#loader-container").css("display", "flex");
            $("#my-modal-button-yes").attr("disabled", true);
            // TODO : api 
            $.ajax({
                    url: "https://asia-east2-cunex-vote.cloudfunctions.net/api/vote",
                    type: "POST",
                    data: person,
                    dataType: "json",
                    success: function(result) {
                        console.log(result);
                        setTimeout(function() {
                            window.location.href = html_link + createURL(args);
                        }, 500);
                    },
                    error: function(error) {
                        console.log(error);
                        $("#loader-container").css("display", "none");
                        $("#my-modal-button-yes").attr("disabled", false);
                        Modal_alert('Error!', 'เกิดข้อผิดพลาด กรุณาลองใหม่ในช่วงเวลาถัดไป');
                    }
                })
                /*
                var exp = $.post("https://asia-east2-cunex-vote-uat.cloudfunctions.net/api/vote", person);
                exp.done(function(data) {
                    console.log(data);
                    if (data['status'] == '01') {
                        setTimeout(function() {
                            window.location.href = html_link + createURL(args);
                        }, 500);
                    } else {
                        Modal_alert('Error!', 'เกิดข่้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
                    }
                }).fail(err => {
                    Modal_alert('Error!', 'เกิดข้อผิดพลาด กรุณาลองใหม่ในช่วงเวลาถัดไป');
                });*/
        })
    }
}