import {Transform} from "class-transformer";
import {toMongoObjectId} from "../../dtoHandlers/userIdHandler";

export class getChartDataDto {
    year: string;

    @Transform(toMongoObjectId)
    walletId: string;
}
