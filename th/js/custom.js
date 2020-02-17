function createURL(args) {
    var queryString = "";
    var keys = Object.keys(args);
    for (i = 0; i < keys.length; i++) {
        queryString += ((i == 0) ? "?" : "&") + keys[i] + "=" + args[keys[i]];
    }
    return queryString;
}

function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : '');
    var args = {};
    var items = qs.length ? qs.split('&') : [];
    var item = null;
    var name = null;
    var value = null;
    for (i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

function printObject(o) {
    var out = "";
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert(out);
}

function gotoPage(html_link, boolean) {
    if (boolean) {
        window.location.href = html_link + createURL(getQueryStringArgs());
    } else {
        Modal_alert('Alert!', "Invalid");
    }
}

function CheckSubmit() {
    return $('#button').hasClass("submit");
}

function goBack() {
    window.history.back();
}

function CheckID() {
    var args = getQueryStringArgs();
    var stuID = args["studentid"];
    if (!stuID) {
        Modal_alert('Alert!', 'Invalid')
        return null;
    }
    var years = ["55", "56", "57", "58", "59", "60", "61", "62"];
    var person = {
        "stuID": args["studentid"],
        "projectName": "TUCUBALL-CL" //ProjectName
    };

    // TODO : api 
    $.ajax({
        url: "https://asia-east2-cunex-vote.cloudfunctions.net/api/idcheck",
        type: "POST",
        data: person,
        dataType: "json",
        success: function(data, textStatus, jqXHR) {
            console.log("success : ", data, textStatus, jqXHR);
            if (years.includes(stuID.substring(0, 2))) {
                if (data["status"] == "00") {
                    Modal_alert('Alert!', "คุณได้ทำการโหวตไปแล้ว");
                } else {
                    $('#button').addClass("submit");
                }
            } else {
                Modal_alert('Alert!', "เฉพาะนิสิตปัจจุบันเท่านั้นที่สามารถโหวตได้");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error : ", jqXHR, textStatus, errorThrown);
            Modal_alert('Error!', 'เกิดข้อผิดพลาด กรุณาลองใหม่ในช่วงเวลาถัดไป');
        }
    })

    // TODO : api
    /*
    var exp = $.post("https://asia-east2-cunex-vote-uat.cloudfunctions.net/api/idcheck", person);
    exp.done(function(data) {
        console.log(data);
        if (years.includes(stuID.substring(0, 2))) {
            if (data["status"] == "00") {
                Modal_alert('Alert!', "คุณได้ทำการโหวตไปแล้ว");
            } else {
                $('#button').addClass("submit");
            }
        } else {
            Modal_alert('Alert!', "เฉพาะนิสิตปัจจุบันเท่านั้นที่สามารถโหวตได้");
        }
    });*/
}