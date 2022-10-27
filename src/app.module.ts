import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import environmentConfig from './config';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environmentConfig.DATABASE_CONFIG.HOST,
      port: parseInt(environmentConfig.DATABASE_CONFIG.PORT),
      username: environmentConfig.DATABASE_CONFIG.USER,
      password: environmentConfig.DATABASE_CONFIG.PASSWORD,
      database: environmentConfig.DATABASE_CONFIG.NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
