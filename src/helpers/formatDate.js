const numberDate = (date) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("en", {year: "numeric", month: "short", day: "2-digit"})

    const [{value: Rmonth}, , {value: Rday}, , {value: Ryear}] = dtf.formatToParts(d)

    return `${Rday} ${Rmonth}, ${Ryear}`
}
export default numberDate