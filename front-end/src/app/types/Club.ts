import { Team } from "./Team"

export type Club = {
    id: string,
    name: string,
    address: string,
    shortName: string,
    teams: Team[]
}