import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class SqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: this.configService.get<string>('API_DB_USERNAME'),
      password: this.configService.get<string>('API_DB_PASSWORD'),
      port: +this.configService.get<number>('API_DB_PORT'),
      host: this.configService.get<string>('API_DB_HOST'),
      database: this.configService.get<string>('API_DB_DATABASE'),
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      // autoLoadEntities: true,
    };
  }
}
