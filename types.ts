export enum GradeLevel {
  Freshman = 'Freshman',
  Sophomore = 'Sophomore',
  Junior = 'Junior',
  Senior = 'Senior',
}

export interface SubjectGrade {
  subject: string;
  score: number; // 0-100
  letter: string; // A, B, C...
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: GradeLevel;
  gpa: number;
  attendanceRate: number; // Percentage
  grades: SubjectGrade[];
  avatarUrl: string;
  notes?: string;
  activities?: string[];
}

export type ViewState = 'dashboard' | 'students' | 'student-detail' | 'settings';