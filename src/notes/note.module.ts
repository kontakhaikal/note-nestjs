import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './types';
import { NoteController } from './controllers/note.controller';
import { NoteServiceImpl } from './services/note.service.impl';
import { Note } from './entities/note.entity';

@Module({
  controllers: [NoteController],
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [
    {
      provide: Service.NOTE_SERVICE,
      useClass: NoteServiceImpl,
    },
  ],
})
export class NoteModule {}
