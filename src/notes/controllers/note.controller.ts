import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';
import { Service } from '../types';

@Controller('notes')
export class NoteController {
  constructor(
    @Inject(Service.NOTE_SERVICE) private readonly noteService: NoteService,
  ) {}

  @Post()
  async writeNote(
    @Req() req: Request<{}, {}, { title: string; body: string }>,
    @Res() res: Response,
  ) {
    const result = await this.noteService.writeNote({
      title: req.body.title,
      body: req.body.body,
      userCredential: req.userCredential,
    });

    return res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      status: HttpStatus.CREATED.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
      data: result,
    });
  }

  @Get()
  async getNotes(@Req() req: Request, @Res() res: Response) {
    const result = await this.noteService.getNotes({
      userCredential: req.userCredential,
    });

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      status: HttpStatus.OK.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
      data: result,
    });
  }

  @Delete('/:id')
  async deleteNote(@Req() req: Request<{ id: string }>, @Res() res: Response) {
    const result = await this.noteService.deleteNote({
      id: req.params.id,
      userCredential: req.userCredential,
    });

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      status: HttpStatus.OK.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
    });
  }

  @Put('/:id')
  async updateNote(
    @Req()
    req: Request<{ id: string }, {}, { title: string; body: string }>,
    @Res()
    res: Response,
  ) {
    const result = await this.noteService.updateNote({
      id: req.params.id,
      title: req.body.title,
      body: req.body.body,
      userCredential: req.userCredential,
    });

    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      status: HttpStatus.OK.toString(),
      path: req.originalUrl,
      timestamp: new Date(),
      data: result,
    });
  }
}
