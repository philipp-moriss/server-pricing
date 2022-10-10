import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

const getMongoUrl = (configService: ConfigService) =>
  'mongodb+srv://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASS') +
  '@ponyweb.rhexlsx.mongodb.net/' +
  configService.get(process.env.NODE_ENV === 'test' ? 'MONGO_DATABASE_TEST' : 'MONGO_DATABASE_DEV') +
  '?retryWrites=true&w=majority';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoUrl(configService),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
