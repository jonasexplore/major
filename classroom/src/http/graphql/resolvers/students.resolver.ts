import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { Student } from '../models';
import { StudentsService } from '../../../services/students.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { CurrentUser } from '../../auth';
import { AuthUser } from '../../../types';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => Student)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.findByAuthUserId(user.sub);
  }

  @Query(() => [Student])
  students() {
    return this.studentsService.listAll();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listByStudentId(student.id);
  }
}
