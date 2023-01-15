import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../../../common/helpers/handlers/userIdHandler";


export class getChartDataDto {
    year: string;
    isMobile?: boolean
    typeChart?: 'line' | 'pie'
    month?:string
    @Transform(toMongoObjectId)
    walletId: string;
}
