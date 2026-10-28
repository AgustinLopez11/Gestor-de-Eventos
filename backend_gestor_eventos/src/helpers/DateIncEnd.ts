export function ReturnDate_Inc_End(date: string | undefined, filtOptions: string | undefined) {

    if (date) {
        const start = new Date(date)
        const end = new Date(start)
        
        end.setDate(end.getDate() + 1)
        return { start, end }
    }
    else if (!date && filtOptions == "eventos proximos") {
        const start = new Date()
        start.setHours(0, 0, 0, 0)

        const end = new Date(start)
        end.setDate(end.getDate() + 4)
        return { start, end }
    }
    else {
        return { start: undefined, end: undefined }
    }
}