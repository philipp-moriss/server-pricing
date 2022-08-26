import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

const getMongoUrl = (configService: ConfigService) =>
  'mongodb+srv://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASS') +
  '@' +
  configService.get('MONGO_DATABASE') +
  '.rhexlsx.mongodb.net/?retryWrites=true&w=majority';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoUrl(configService),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
