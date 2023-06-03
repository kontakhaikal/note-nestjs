import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { WriteNoteRequest } from '../dto/write-note';
import { Note } from '../entities/note.entity';
import { NoteService } from './note.service';
import { Repository } from 'typeorm';
import { GetNotesRequest } from '../dto/get-note';
import { UseI18nValidator } from '../../validation/decorator';
import { DeleteNoteRequest } from '../dto/delete-note';
import { UpdateNoteRequest } from '../dto/update-note';
import { ResourceNotFoundError } from '../../error/resource-notfound-error';

@Injectable()
export class NoteServiceImpl implements NoteService {
  public constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  @UseI18nValidator(DeleteNoteRequest)
  async deleteNote(request: DeleteNoteRequest): Promise<void> {
    const note = await this.noteRepository.findOneBy({
      id: request.id,
      author: request.userCredential.id,
    });

    if (note === null) {
      throw new ResourceNotFoundError();
    }

    await this.noteRepository.delete({ id: request.id });
  }

  @UseI18nValidator(UpdateNoteRequest)
  async updateNote(request: UpdateNoteRequest): Promise<Note> {
    const note = await this.noteRepository.findOneBy({
      id: request.id,
      author: request.userCredential.id,
    });

    if (note === null) {
      throw new ResourceNotFoundError();
    }

    note.title = request.title;
    note.body = request.body;
    note.updatedAt = new Date();

    await this.noteRepository.update({ id: request.id }, note);

    return note;
  }

  @UseI18nValidator(GetNotesRequest)
  async getNotes(request: GetNotesRequest): Promise<Note[]> {
    return this.noteRepository.findBy({ author: request.userCredential.id });
  }

  @UseI18nValidator(WriteNoteRequest)
  async writeNote(request: WriteNoteRequest): Promise<Note> {
    const now = new Date();

    const note = new Note(
      randomUUID(),
      request.title,
      request.body,
      request.userCredential.id,
      now,
      now,
    );

    return await this.noteRepository.save(note);
  }
}
