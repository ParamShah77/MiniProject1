import ClassicTemplate from './ClassicTemplate';
import MinimalJakeTemplate from './MinimalJakeTemplate';
import TechyModernTemplate from './TechyModernTemplate';
import StudentFresherTemplate from './StudentFresherTemplate';
import ProjectBasedTemplate from './ProjectBasedTemplate';
import DataScienceTemplate from './DataScienceTemplate';
import DeveloperTemplate from './DeveloperTemplate';
import BusinessAnalystTemplate from './BusinessAnalystTemplate';
import DesignerTemplate from './DesignerTemplate';
import SeniorProfessionalTemplate from './SeniorProfessionalTemplate';

const templates = {
  'classic': ClassicTemplate,
  'minimal-jake': MinimalJakeTemplate,
  'techy-modern': TechyModernTemplate,
  'student-fresher': StudentFresherTemplate,
  'project-based': ProjectBasedTemplate,
  'data-science': DataScienceTemplate,
  'developer': DeveloperTemplate,
  'business-analyst': BusinessAnalystTemplate,
  'designer': DesignerTemplate,
  'senior-professional': SeniorProfessionalTemplate,
};

export const getTemplateComponent = (templateId) => {
  return templates[templateId] || ClassicTemplate;
};

export default templates;
