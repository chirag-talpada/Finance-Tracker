import dayjs from "dayjs"

export const convertDate=(date)=> {
    return dayjs(date).format("YYYY-MM-DD")
}