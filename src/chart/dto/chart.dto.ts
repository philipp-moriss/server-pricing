import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";

export class getChartDataDto {
    year: string;
    isMobile?: boolean
    typeChart?: 'line' | 'pie'
    month:string | null
    @Transform(toMongoObjectId)
    walletId: string;
}
