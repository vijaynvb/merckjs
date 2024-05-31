var a =1;

switch(a){
    case 1:
    case 3:
    case 5:
    case 8:
    case 10:
    case 12:
        console.log(`no of days in the given month of ${a} is 31`);
        break;
    case 2:
        console.log("no of days in the given month is 28");
        break;
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
        console.log("no of days in the given month is 30");
        break;
    default:
        console.log("this month does not exists");
        break;
}
