
const getCurrentDate=()=>{
    
    var cur_date = new Date();
    var utc = cur_date.getTime() + (cur_date.getTimezoneOffset() * 60 * 1000);
    var time_diff = 9 * 60 * 60 * 1000;
    var cur_date_korea = new Date(utc + (time_diff));
    
    return cur_date_korea

}

module.exports=getCurrentDate