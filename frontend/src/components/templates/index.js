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
import MarketingTemplate from './MarketingTemplate';
import HRTemplate from './HRTemplate';
import SalesTemplate from './SalesTemplate';
import TeachingTemplate from './TeachingTemplate';
import FinanceTemplate from './FinanceTemplate';
import OperationsTemplate from './OperationsTemplate';
import HealthcareTemplate from './HealthcareTemplate';

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
  'marketing': MarketingTemplate,
  'hr': HRTemplate,
  'sales': SalesTemplate,
  'teaching': TeachingTemplate,
  'finance': FinanceTemplate,
  'operations': OperationsTemplate,
  'healthcare': HealthcareTemplate,
};

export const getTemplateComponent = (templateId) => {
  return templates[templateId] || ClassicTemplate;
};

export default templates;
