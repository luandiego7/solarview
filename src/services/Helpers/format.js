export const dateBr = (date) => {
    if (date) {
        let fullDate = new Date(date+' 01:00:00');
        let day      = fullDate.getDate();
        let month    = (fullDate.getMonth() + 1);
        let year     = fullDate.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return [day, month, year].join('/');
    } else {
        return null;
    }
}

export const datetimeBr = (datetime) => {
    if (datetime) {
        let fullDate = new Date(datetime);
        let day      = fullDate.getDate();
        let month    = (fullDate.getMonth() + 1);
        let year     = fullDate.getFullYear();
        let hour     = (parseInt(fullDate.getHours())+3 < 10 ? '0'+fullDate.getHours() : fullDate.getHours());
        let minutes  = (parseInt(fullDate.getMinutes()) < 10 ? '0'+fullDate.getMinutes() : fullDate.getMinutes());
        let sec      = (parseInt(fullDate.getSeconds()) < 10 ? '0'+fullDate.getSeconds() : fullDate.getSeconds());

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return [day, month, year].join('/') + ' às ' + [parseInt(hour)+3, minutes, sec].join(':');
    } else {
        return null;
    }
}


export const dateUs = (date) => {
    let day      = date.getDate();
    let month    = '' + (date.getMonth() + 1);
    let year     = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return [year, month, day].join('-');
}