const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function clock() {
    var time = new Date()
    var year = time.getFullYear(); 
    var month = time.getMonth(); 
    var day = time.getDate(); 
    var hour = time.getHours(); 
    var min = time.getMinutes(); 
    var sec = time.getSeconds(); 

    var display_year = ('000' + year).slice(-4); 
    var display_month = ('0' + (month + 1)).slice(-2); 
    var display_day = ('0' + day).slice(-2); 
    
    var today_date = display_year + "-" + display_month + "-" + display_day; 

    document.getElementById("today-date").innerHTML = today_date; 
    document.getElementById("weekday").innerHTML = weekdays[time.getDay()]; 
    
    var values = [year, month, day, hour, min, sec]
    update_local_times("Local Time", values); 

    var utc_values = [time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate(), time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds()]; 
    update_local_times("UTC", utc_values); 
    update_local_times("Pacific", utc_values); 
    update_local_times("Beijing", utc_values); 
}

function update_local_times(timezone, values){
    if (timezone == "Local Time") { 
        document_updater(timezone, values); 
    }
    else {
        var offset = offset_lookup(timezone); 
        var new_values = offset_calculator(offset, values);
        document_updater(timezone, new_values); 
    }
}

function document_updater(timezone, values){
    var local_day = values[2]; 
    var local_hour = ('0' + values[3]).slice(-2); 
    var local_min = ('0' + values[4]).slice(-2); 
    var local_sec = ('0' + values[5]).slice(-2); 

    var table_output = [
        local_day, "at", 
        local_hour, ":", 
        local_min, ":", 
        local_sec, "@", 
        timezone]
    
    console.log(timezone); 
    var row = document.getElementById(timezone);

    if (row) {
        var table_html = ""; 

        for (var i = 0; i < 9; i++) {
            table_html = table_html + "<td>" + table_output[i] + "</td>\n"; 
        }
        //table_html = table_html + "</tr>"; 

        row.innerHTML = table_html; 
    }
    else{
        var str = timezone + " row not found! \n"; 
        console.log(str); 
    }

}

function offset_lookup(timezone) {
    switch (timezone){
        case "Pacific": 
            return -7; 
        case "Beijing": 
            return +8; 
        default: 
            return 0; 
    }
}

function offset_calculator(offset, values){
    var utc_year = values[0]; 
    var utc_month = values[1]; 
    var utc_day = values[2]; 
    var utc_hour = values[3]; 
    console.log(utc_hour); 
    
    if (offset > 12 || offset < -12) {
        alert("The offset should not exceed 12 in absolute values. ");
    }
    else if (offset > 0) {
    // We need to add hours
        var local_hour = utc_hour + offset; 
        console.log(local_hour)
        if (local_hour > 23) {
            // We need to add another day
            var extra_hours = local_hour - 24; 
            local_hour = extra_hours; 
            values[3] = local_hour; 
            var local_day = utc_day + 1; 

            if (utc_month == 12 && local_day > 31) {
                var local_year = utc_year + 1; 
                var local_month = 1; 
                local_day = local_day - 31; 
                values[0] = local_year; 
            }
            else if (utc_month == 2 && get_leapyear(utc_year) && local_day > 29){
                // It's Feb and Leap year
                // Feb 29 -> Mar 1
                var local_month = 3; 
                local_day = local_day - 29; 
            }
            else if (utc_month == 2 && !(get_leapyear(utc_year)) && local_day > 28) {
                // Feb but not leap
                var local_month = 3; 
                local_day = local_day - 28; 
            }
            else if (local_day > 31 && (
                utc_month == 1 ||
                utc_month == 3 ||
                utc_month == 5 ||
                utc_month == 7 ||
                utc_month == 8 ||
                utc_month == 10
            )){
                var local_month = utc_month + 1; 
                local_day = local_day - 31; 
            }
            else if (local_day > 30 && (
                utc_month == 4 ||
                utc_month == 6 ||
                utc_month == 9 ||
                utc_month == 11
            )){
                var local_month = utc_month + 1; 
                local_day = local_day - 30;
            }
            else {
                var local_month = utc_month; 
            }
            
            values[1] = local_month; 
            values[2] = local_day; 
        }
        else {
            // We don't need to add days 
            values[3] = local_hour; 
        }
    }
    else if (offset < 0) {
        // We need to take away hours 
        var local_hour = utc_hour - offset; 
        if (local_hour < 0) {
            // We need to roll back 1 day
            var extra_hours = local_hour + 24; 
            local_hour = extra_hours; 
            var local_day = utc_day - 1; 
            if (utc_month == 1 && local_day <= 0) {
                var local_year = utc_year - 1; 
                var local_month = 12; 
                local_day = local_day + 31; 
                values[0] = local_year; 
            }
            else if (utc_month == 3 && get_leapyear(utc_year) && local_day <= 0){
                // It's March and Leap year
                // Feb 29 <- Mar 1
                var local_month = 2; 
                local_day = local_day + 29; 
            }
            else if (utc_month == 3 && !(get_leapyear(utc_year)) && local_day <= 0) {
                // Feb 28 <- Mar 1
                var local_month = 2; 
                local_day = local_day + 28; 
            }
            else if (local_day <= 0 && (
                utc_month == 5 ||
                utc_month == 7 ||
                utc_month == 10
            )){
                var local_month = utc_month - 1; 
                local_day = local_day + 30; 
            }
            else if (local_day <= 0 && (
                utc_month == 2 ||
                utc_month == 4 ||
                utc_month == 6 ||
                utc_month == 8 || 
                utc_month == 9 ||
                utc_month == 11
            )){
                var local_month = utc_month - 1; 
                local_day = local_day + 31;
            }
            else {
                var local_month = utc_month; 
            }
            
            values[1] = local_month; 
            values[2] = local_day; 
            values[3] = local_hour; 
        }
        else {
            // We don't need to roll back days 
            values[3] = local_hour; 
        }

    }
    return values; 
}

function get_leapyear(year){
    if (year % 100 == 0) {
        if (year % 400 == 0) {
            return true; 
        }
        else {
            return false; 
        }
    }
    else if (year % 4 == 0) {
        return true; 
    }
}