import spacy
from typing import Dict, List, Any
import re

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

class NERResumeParser:
    """
    Advanced NER-based resume parser
    Extracts: Names, Organizations, Dates, Locations, Skills
    """
    
    def __init__(self):
        self.nlp = nlp
        
    def parse(self, text: str) -> Dict[str, Any]:
        """
        Parse resume using NER model
        """
        doc = self.nlp(text)
        
        entities = {
            'names': [],
            'organizations': [],
            'dates': [],
            'locations': [],
            'emails': [],
            'phones': [],
            'urls': []
        }
        
        # Extract named entities
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                entities['names'].append(ent.text)
            elif ent.label_ == "ORG":
                entities['organizations'].append(ent.text)
            elif ent.label_ == "DATE":
                entities['dates'].append(ent.text)
            elif ent.label_ in ["GPE", "LOC"]:
                entities['locations'].append(ent.text)
        
        # Extract emails using regex
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        entities['emails'] = re.findall(email_pattern, text)
        
        # Extract phone numbers
        phone_pattern = r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]'
        entities['phones'] = re.findall(phone_pattern, text)
        
        # Extract URLs
        url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
        entities['urls'] = re.findall(url_pattern, text)
        
        # Get primary name (usually first person mentioned)
        primary_name = entities['names'][0] if entities['names'] else None
        primary_email = entities['emails'][0] if entities['emails'] else None
        primary_phone = entities['phones'][0] if entities['phones'] else None
        
        # Extract sections
        sections = self._extract_sections(text)
        
        return {
            'primary_info': {
                'name': primary_name,
                'email': primary_email,
                'phone': primary_phone,
                'location': entities['locations'][0] if entities['locations'] else None
            },
            'entities': entities,
            'sections': sections,
            'word_count': len(text.split()),
            'sentence_count': len(list(doc.sents))
        }
    
    def _extract_sections(self, text: str) -> Dict[str, str]:
        """
        Extract different sections from resume
        """
        sections = {}
        
        section_headers = {
            'experience': r'(?i)(work experience|experience|employment|professional experience)',
            'education': r'(?i)(education|academic|qualifications)',
            'skills': r'(?i)(skills|technical skills|competencies)',
            'projects': r'(?i)(projects|portfolio)',
            'certifications': r'(?i)(certifications|certificates|licenses)'
        }
        
        lines = text.split('\n')
        current_section = None
        
        for header, pattern in section_headers.items():
            for i, line in enumerate(lines):
                if re.search(pattern, line):
                    # Found section header
                    section_content = []
                    j = i + 1
                    while j < len(lines):
                        next_line = lines[j]
                        # Check if we hit another section
                        if any(re.search(p, next_line) for p in section_headers.values()):
                            break
                        section_content.append(next_line)
                        j += 1
                    
                    sections[header] = '\n'.join(section_content).strip()
                    break
        
        return sections
