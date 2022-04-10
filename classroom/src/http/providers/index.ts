import { CoursesResolver } from '../graphql/resolvers/courses.resolver';
import { EnrollmentResolver } from '../graphql/resolvers/enrollments.resolver';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';
import { StudentsResolver } from '../graphql/resolvers/students.resolver';

const resolvers = [CoursesResolver, EnrollmentResolver, StudentsResolver];
const services = [CoursesService, EnrollmentsService, StudentsService];

export const providers = [...resolvers, ...services];
