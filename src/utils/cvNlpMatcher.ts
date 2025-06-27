import cvData from '../data/cvData';

function cvNlpMatcher(input: string): string | null {
  const q = input.toLowerCase();

  // Education
  if (q.includes('education') || q.includes('study') || q.includes('school') || q.includes('college') || q.includes('university')) {
    return cvData.education.map(e => `${e.level} at ${e.institution}${e.major ? `, Major: ${e.major}` : ''}${e.cgpa ? `, CGPA: ${e.cgpa}` : ''}${e.gpa ? `, GPA: ${e.gpa}` : ''}${e.year ? `, Year: ${e.year}` : ''}`).join('\n');
  }
  // GPA/CGPA
  if (q.includes('gpa') || q.includes('cgpa')) {
    const hs = cvData.education.find(e => e.cgpa);
    const school = cvData.education.find(e => e.gpa);
    return `High School CGPA: ${hs?.cgpa || 'N/A'}\nSchool GPA: ${school?.gpa || 'N/A'}`;
  }
  // Experience
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('projects') || q.includes('project')) {
    return cvData.experience.map(e => `- ${e.title}${e.details ? `: ${e.details.join('; ')}` : ''}`).join('\n');
  }
  // Certifications
  if (q.includes('certification') || q.includes('certificate')) {
    return cvData.certifications.join(', ');
  }
  // Skills
  if (q.includes('skill') || q.includes('technical skill') || q.includes('soft skill')) {
    return `Technical Skills: ${cvData.skills.technical.join(', ')}\nSoft Skills: ${cvData.skills.soft.join(', ')}`;
  }
  // Languages
  if (q.includes('language') || q.includes('speak')) {
    return cvData.languages.map(l => `${l.name}: ${l.level}`).join(', ');
  }
  // About
  if (q.includes('about') || q.includes('yourself') || q.includes('bio') || q.includes('who are you')) {
    return [
      `Name: ${cvData.personal.name}`,
      `Location: ${cvData.personal.location}`,
      `Email: ${cvData.personal.email}`,
      `Website: ${cvData.personal.website}`,
      ...cvData.additionalInfo
    ].join('\n');
  }
  // Contact
  if (q.includes('contact') || q.includes('email')) {
    return `Email: ${cvData.personal.email}\nWebsite: ${cvData.personal.website}`;
  }
  // Portfolio
  if (q.includes('portfolio') || q.includes('github')) {
    return 'Portfolio: Portfolio Website, Website on Github';
  }
  // Awards
  if (q.includes('award') || q.includes('winner') || q.includes('hackathon')) {
    const hack = cvData.experience.find(e => e.title.toLowerCase().includes('hackathon') || e.title.toLowerCase().includes('winner'));
    return hack ? `${hack.title}: ${hack.details.join('; ')}` : 'No awards found.';
  }
  // Default
  return null;
}

export default cvNlpMatcher; 