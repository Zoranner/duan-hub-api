import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { NodesModule } from './nodes/nodes.module';
import { HistoriesModule } from './histories/histories.module';
import { PlayersModule } from './players/players.module';
import { HistoryUserRelModule } from './history_user_rel/history_user_rel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    ProjectsModule,
    NodesModule,
    HistoriesModule,
    PlayersModule,
    HistoryUserRelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
