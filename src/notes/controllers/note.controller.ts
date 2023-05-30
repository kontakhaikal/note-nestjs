import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { Request } from 'express';
import { NoteService } from '../services/note.service';
import { Service } from '../types';

@Controller('notes')
export class NoteController {
  constructor(
    @Inject(Service.NOTE_SERVICE) private readonly noteService: NoteService,
  ) {}

  @Post()
  async writeNote(
    @Req() request: Request<{}, {}, { title: string; body: string }>,
  ) {
    const { title, body } = request.body;
    return await this.noteService.writeNote({
      title: title,
      body: body,
      userCredential: request.userCredential,
    });
  }

  @Get()
  async getNotes(@Req() request: Request) {
    return await this.noteService.getNotes({
      userCredential: request.userCredential,
    });
  }

  @Delete('/:id')
  async deleteNote(@Req() request: Request<{ id: string }, {}, {}>) {
    const id = request.params['id'];
    return await this.noteService.deleteNote({
      id,
      userCredential: request.userCredential,
    });
  }

  @Put('/:id')
  async updateNote(
    @Req()
    request: Request<{ id: string }, {}, { title: string; body: string }>,
  ) {
    const id = request.params['id'];
    return await this.noteService.updateNote({
      id,
      title: request.body.title,
      body: request.body.body,
      userCredential: request.userCredential,
    });
  }
}
