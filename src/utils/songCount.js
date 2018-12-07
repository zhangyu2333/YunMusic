export const songCount = (num) => {
    if( num>100000 ){
        num = (num/10000).toFixed()+'万'
    }
    return num
}