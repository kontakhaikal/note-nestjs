import { Note } from '../entities/note.entity';
import { WriteNoteRequest } from '../dto/write-note';
import { GetNotesRequest } from '../dto/get-note';
import { UpdateNoteRequest } from '../dto/update-note';
import { DeleteNoteRequest } from '../dto/delete-note';

export interface NoteService {
  writeNote(request: WriteNoteRequest): Promise<Note>;
  getNotes(request: GetNotesRequest): Promise<Note[]>;
  deleteNote(request: DeleteNoteRequest): Promise<void>;
  updateNote(request: UpdateNoteRequest): Promise<Note>;
}
