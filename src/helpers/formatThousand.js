const numberFormat = (number = 0) => {
    const thousand = new Intl.NumberFormat('en-IN')
    return thousand.format(number)
}
export default numberFormat