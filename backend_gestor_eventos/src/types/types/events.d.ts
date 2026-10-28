export type Event = {
    id: string,
    title: string,
    description?: string,
    date: string,
    time: string,
    place?: string,
    status: "Pendiente" | "Completado" | "Vencido",
    userId: string

}

export interface FiltroFechas {
    gt?: Date,
    gte?: Date,
    lt?: Date
    lte?: Date
}