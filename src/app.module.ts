import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SurveyModule } from './survey/survey.module';
import { Survey } from './survey.entity';
import { Agent } from './agent.entity';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Survey, Agent],
      synchronize: true,
    }),
    UsersModule,
    JwtModule.register({
      secret: 'secret', // you should move this to a config file
      signOptions: { expiresIn: '60m' },
    }),
    SurveyModule,
    AgentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
