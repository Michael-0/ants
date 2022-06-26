const formal_name=({fName,mName,lName})=>{
    return `${fName} ${mName === undefined ? '' : (mName.length === 1 ? mName+'.' : mName)} ${lName}`;
};

export {formal_name};
