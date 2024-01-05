import { filter, debounce, includes } from "lodash";

const filterByDates =(row, to, from)=>{
    const dateFilter = filter(
        row.dashboard_data ? row.dashboard_data : row, function (o) {
            return new Date(o.date) <= new Date(to) && new Date(o.date) >= new Date(from)
        }
    )
    return dateFilter;
}
const handleIDSearch =(query, row) =>{
    if (query) {
        const searchData = filter(
            row, (o) => { 
                return includes(o.id.toString(), query)}
        )
        return searchData
    } else {
            return row
    }
}

export{
    filterByDates,
    handleIDSearch
}