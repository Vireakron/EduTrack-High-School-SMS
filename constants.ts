import { Student, GradeLevel } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@edutrack.edu',
    gradeLevel: GradeLevel.Junior,
    gpa: 3.8,
    attendanceRate: 98,
    avatarUrl: 'https://picsum.photos/200/200?random=1',
    activities: ['Debate Club', 'Varsity Tennis'],
    grades: [
      { subject: 'Mathematics', score: 92, letter: 'A' },
      { subject: 'Physics', score: 88, letter: 'B+' },
      { subject: 'Literature', score: 95, letter: 'A' },
      { subject: 'History', score: 90, letter: 'A-' },
    ],
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'm.chen@edutrack.edu',
    gradeLevel: GradeLevel.Senior,
    gpa: 3.95,
    attendanceRate: 99,
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    activities: ['Robotics', 'Student Council'],
    grades: [
      { subject: 'Mathematics', score: 98, letter: 'A+' },
      { subject: 'Physics', score: 96, letter: 'A' },
      { subject: 'Literature', score: 89, letter: 'B+' },
      { subject: 'Computer Science', score: 100, letter: 'A+' },
    ],
  },
  {
    id: '3',
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 's.miller@edutrack.edu',
    gradeLevel: GradeLevel.Sophomore,
    gpa: 3.2,
    attendanceRate: 85,
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    activities: ['Drama Club'],
    grades: [
      { subject: 'Mathematics', score: 78, letter: 'C+' },
      { subject: 'Biology', score: 85, letter: 'B' },
      { subject: 'Literature', score: 92, letter: 'A' },
      { subject: 'History', score: 80, letter: 'B-' },
    ],
  },
  {
    id: '4',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'j.wilson@edutrack.edu',
    gradeLevel: GradeLevel.Freshman,
    gpa: 2.8,
    attendanceRate: 90,
    avatarUrl: 'https://picsum.photos/200/200?random=4',
    activities: ['Football'],
    grades: [
      { subject: 'Mathematics', score: 72, letter: 'C-' },
      { subject: 'Science', score: 75, letter: 'C' },
      { subject: 'English', score: 82, letter: 'B-' },
      { subject: 'History', score: 78, letter: 'C+' },
    ],
  },
  {
    id: '5',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'e.davis@edutrack.edu',
    gradeLevel: GradeLevel.Junior,
    gpa: 4.0,
    attendanceRate: 100,
    avatarUrl: 'https://picsum.photos/200/200?random=5',
    activities: ['Volleyball', 'Yearbook'],
    grades: [
      { subject: 'Mathematics', score: 99, letter: 'A+' },
      { subject: 'Chemistry', score: 97, letter: 'A' },
      { subject: 'Literature', score: 98, letter: 'A+' },
      { subject: 'History', score: 96, letter: 'A' },
    ],
  },
];

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'Literature', 'History', 'Computer Science', 'Art', 'PE'
];
