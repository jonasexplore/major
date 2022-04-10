import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';

import { Enrollment } from '../models';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  enrollments() {
    return this.enrollmentsService.listAll();
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findById(enrollment.courseId);
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findById(enrollment.studentId);
  }
}
