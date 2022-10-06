import {Module} from "@nestjs/common";
import {SpendingController} from "./spending.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {SpendingModel, SpendingModelSchema} from "./spending.model";
import {SpendingService} from "./spending.service";

@Module({
    controllers: [SpendingController],
    providers: [SpendingService],
    imports: [
        MongooseModule.forFeature([
            {name: SpendingModel.name, schema: SpendingModelSchema},
        ])
    ],
    exports: [SpendingService],
})
export class SpendingModule {
}
