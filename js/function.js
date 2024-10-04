// date format
const dateformat = (data) =>{
    const hour = parseInt( data / 3600);
    let remainingTime = data % 3600;
    const minute = parseInt(remainingTime / 60);
    remainingTime = data % 60;
    return `${hour} hrs ${minute} min ago`
}

// btn color shift
