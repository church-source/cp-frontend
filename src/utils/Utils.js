export const calculateAge = (birthday) => {
    if(birthday == undefined) return ""
    let birthDate = new Date(birthday)
    let ageDifMs = Date.now() - birthDate.getTime()
    let ageDate = new Date(ageDifMs) // miliseconds from epoch
    let ageYears = Math.abs(ageDate.getUTCFullYear() - 1970)
    if(ageYears === 0) {
        let ageMonths = monthDiff(birthDate, new Date())
        if(ageMonths === 0) {
            let ageDays = daydiff(birthDate, new Date())

            if(ageDays === 0) {
                return "newborn"
            } else if (ageDays === 1) {
                return ageDays + " day"
            } else {
                return ageDays + " days"
            }
        } else if (ageMonths === 1) {
            return ageMonths + " month"
        } else {
            return ageMonths + " months"
        }
    } else if(ageYears === 1){
        return "1 year"
    } else {
        return ageYears + " years"
    }
 }

function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

function daydiff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24))
}

export const adjustForTimezone = (date) => {
    var timeOffsetInMS = date.getTimezoneOffset() * 60000;
    date.setTime(date.getTime() - timeOffsetInMS);
    return date
}