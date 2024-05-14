import { Body, Controller, Post } from "@nestjs/common";
import { CreateStudentDto } from "./dtos/create-student.dto";
import { StudentsService } from "./students.service";
import { Student } from "./student.entity";

@Controller('students')
export class StudentsController {
	constructor(private readonly studentsService: StudentsService) {}

	@Post()
	async create(@Body() data: CreateStudentDto): Promise<Student> {
		return await this.studentsService.create(data);
	}
}