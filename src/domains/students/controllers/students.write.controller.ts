import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentsWriteService } from '../services/students.write.service';
import { StudentCreateDto } from '../dtos/student.create.dto';
import { StudentUpdateDto } from '../dtos/student.update.dto';
import { StudentUpdatePasswordDto } from '../dtos/student.update-password.dto';

@Controller('students')
export class StudentsWriteController {
  constructor(private readonly studentsWriteService: StudentsWriteService) {}

  @Post()
  async create(@Body() dto: StudentCreateDto) {
    return this.studentsWriteService.create(dto);
  }

  @Put(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: StudentUpdateDto,
  ) {
    return this.studentsWriteService.update(identifier, dto);
  }

  @Patch(':identifier/password')
  @HttpCode(204)
  async updatePassword(
    @Param('identifier') identifier: string,
    @Body() dto: StudentUpdatePasswordDto,
  ) {
    return this.studentsWriteService.updatePassword(identifier, dto);
  }

  @Delete(':identifier')
  @HttpCode(204)
  async delete(@Param('identifier') identifier: string) {
    return this.studentsWriteService.delete(identifier);
  }
}
