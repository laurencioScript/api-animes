import { Injectable } from '@nestjs/common';
import * as neatCsv from 'neat-csv';
import * as fs from 'fs';

@Injectable()
export class CsvService {
  async read(file) {
    return await neatCsv(file.buffer);
  }
}
