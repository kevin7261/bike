
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// ------------------------------------------------------

function getMonthText(m, language) {

    let text = getText_MonthName(m, language)

    return text;
}

function getDateText(y, m, d) {

    let y_str = y.toString().substring(2,4)
    let m_str = ((m < 10) ? "0" : "") + m.toString()
    let d_str = ((d < 10) ? "0" : "") + d.toString()

    return d_str + "." + m_str + "." + y_str;
}

function getWeekdayText(w, language) {

    let text = getText_WeekName(w, language)

    return text;
}

function getScaleText(i, language) {

    let text = getText_ScaleName(i, language)

    return text;
}

function getTypeText(i, language) {

    let text = getText_TypeName(i, language)

    return text;
}

