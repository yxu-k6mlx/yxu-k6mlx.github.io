const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function clock() {
    const time = new Date()
    
    update_time("Local Time", time);
    update_time("UTC Time", time); 
    update_time("Pacific Daylight Time", time);
    update_time("Eastern Daylight Time", time)
    update_time("China Standard Time", time);
    update_time("Pacific Standard Time", time);
    update_time("Eastern Standard Time", time);
}

function update_time(timezone, time){
    if (timezone == "Local Time") {
        const local_time_array = [time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), weekdays[time.getDay()]]; 
        document_updater(timezone, local_time_array); 
    }
    else {
        const local_time_array = time_calculator(timezone, time); 
        document_updater(timezone, local_time_array); 
    }
}

function document_updater(row_name, time_array){
    const row_str = ""
    const output_formatter = [
        ("00" + time_array[0]).slice(-2), "at", ("00" + time_array[1]).slice(-2), ":", ("00" + time_array[2]).slice(-2), ":", ("00" + time_array[3]).slice(-2), "@", row_name
    ]

    for (const i = 0; i < 9; i ++){
        row_str += "<td>" + output_formatter[i] + "</td>"; 
    }

    document.getElementById(row_name).innerHTML = row_str; 
}

/* 
    params: 
        timezone - String: name of the timezone in string 
    return: 
        time offset in mins 
 */ 
function offset_lookup(timezone){
    switch (timezone) {
        case ("UTC Time"): 
            return 0; 
        case ("Pacific Daylight Time"): 
            return (-7 * 60);
        case ("Pacific Standard Time"): 
            return (-8 * 60); 
        case ("Central Daylight Time"): 
            return (-5 * 60);
        case ("Central Standard Time"): 
            return (-6 * 60);
        case ("Eastern Daylight Time"): 
            return (-4 * 60)
        case ("Eastern Standard Time"): 
            return (-5 * 60)
        case ("China Standard Time"): 
            return (+8 * 60); 
        default: 
            return 0; 
    }
}

/* 
    params: 
        timezone - String: name of the timezone in string 
        utc_time - Date() object
    return: 
        an array of display elements 
        [0  , 1 , 2  , 3  , 4           ]
        [day, hr, min, sec, weekday(str)]
 */ 
function time_calculator(timezone, utc_time){
    const local_time_array = [utc_time.getUTCDate(), utc_time.getUTCHours(), utc_time.getUTCMinutes(), utc_time.getUTCSeconds(), utc_time.getUTCDay()]; 
    const local_offset_in_mins = offset_lookup(timezone); 

    const offset_mins = local_offset_in_mins % 60; 
    const offset_hours = Math.floor(local_offset_in_mins / 60); 

    local_time_array[1] += offset_hours; 
    local_time_array[2] += offset_mins; 

    if (local_time_array[2] > 59) {
        local_time_array[1] += 1; 
        local_time_array[2] -= 60; 
    }
    else if (local_time_array[2] < 0){
        local_time_array[1] -= 1; 
        local_time_array[2] += 60; 
    }

    if (local_time_array[1] > 23) {
        local_time_array[0] += 1; 
        local_time_array[4] += 1; 
        local_time_array[1] -= 24; 
    }
    else if (local_time_array[1] < 0) {
        local_time_array[0] -= 1; 
        local_time_array[4] -= 1; 
        local_time_array[1] += 24; 
    }

    local_time_array[4] = weekdays[local_time_array[4]]; 
    return local_time_array; 
}