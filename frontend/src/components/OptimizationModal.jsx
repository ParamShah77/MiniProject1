
// import React, { useState } from 'react';
// import { X, Check, Sparkles, TrendingUp } from 'lucide-react';
// import Card from './common/Card';
// import Button from './common/Button';

// const OptimizationModal = ({ 
//   isOpen, 
//   onClose, 
//   originalData, 
//   optimizedData, 
//   onApply 
// }) => {
//   const [selections, setSelections] = useState({
//     summaryEnabled: true,
//     experienceItems: {},
//     projectItems: {},
//     addSkills: true
//   });

//   if (!isOpen) return null;

//   const mergeSelectedChanges = () => {
//     const merged = { ...originalData };

//     // Merge summary if selected
//     if (selections.summaryEnabled && optimizedData.personalInfo?.summary) {
//       merged.personalInfo = {
//         ...merged.personalInfo,
//         summary: optimizedData.personalInfo.summary
//       };
//     }

//     // Merge experience items
//     if (optimizedData.experience) {
//       merged.experience = optimizedData.experience.map((item, idx) => {
//         return selections.experienceItems[idx] ? item : originalData.experience[idx];
//       });
//     }

//     // Merge project items
//     if (optimizedData.projects) {
//       merged.projects = optimizedData.projects.map((item, idx) => {
//         return selections.projectItems[idx] ? item : originalData.projects[idx];
//       });
//     }

//     // Merge skills
//     if (selections.addSkills && optimizedData.suggestedSkills) {
//       const existingTech = originalData.skills?.technical || [];
//       const newSkills = optimizedData.suggestedSkills.filter(s => !existingTech.includes(s));
      
//       merged.skills = {
//         ...originalData.skills,
//         technical: [...existingTech, ...newSkills]
//       };
//     }

//     onApply(merged);
//     onClose();
//   };

//   const updateSelection = (category, itemIndex = null) => {
//     setSelections(current => {
//       if (itemIndex !== null) {
//         return {
//           ...current,
//           [category]: {
//             ...current[category],
//             [itemIndex]: !current[category][itemIndex]
//           }
//         };
//       }
//       return { ...current, [category]: !current[category] };
//     });
//   };

//   const ComparisonBox = ({ original, enhanced, label }) => (
//     <div className="grid md:grid-cols-2 gap-4">
//       <div className="space-y-2">
//         <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Current</p>
//         <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm">
//           {original || 'Not provided'}
//         </div>
//       </div>
//       <div className="space-y-2">
//         <p className="text-xs font-bold text-green-600 uppercase tracking-wide">Enhanced ✨</p>
//         <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg text-sm">
//           {enhanced}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
//         {/* Header Bar */}
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-white/20 rounded-lg">
//               <Sparkles className="w-6 h-6" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">AI Enhancement Preview</h2>
//               <p className="text-purple-100 text-sm">Review and select improvements</p>
//             </div>
//           </div>
//           <button 
//             onClick={onClose}
//             className="p-2 hover:bg-white/20 rounded-lg transition-all"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
//           {/* Summary Enhancement */}
//           {optimizedData?.personalInfo?.summary && (
//             <Card className="border-l-4 border-l-green-500">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selections.summaryEnabled}
//                     onChange={() => updateSelection('summaryEnabled')}
//                     className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
//                   />
//                   <span className="text-lg font-semibold">Professional Summary</span>
//                 </label>
//                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
//                   ENHANCED
//                 </span>
//               </div>
//               <ComparisonBox
//                 original={originalData?.personalInfo?.summary}
//                 enhanced={optimizedData.personalInfo.summary}
//               />
//             </Card>
//           )}

//           {/* Experience Enhancements */}
//           {optimizedData?.experience?.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5 text-purple-600" />
//                 <h3 className="text-xl font-bold">Experience Improvements</h3>
//               </div>

//               {optimizedData.experience.map((exp, idx) => (
//                 <Card key={idx} className="border-l-4 border-l-blue-500">
//                   <div className="flex items-center justify-between mb-4">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selections.experienceItems[idx]}
//                         onChange={() => updateSelection('experienceItems', idx)}
//                         className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
//                       />
//                       <div>
//                         <h4 className="font-semibold">{exp.position}</h4>
//                         <p className="text-sm text-gray-500">{exp.company}</p>
//                       </div>
//                     </label>
//                     <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
//                       OPTIMIZED
//                     </span>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs font-bold text-gray-500 uppercase mb-2">Original</p>
//                       <ul className="space-y-1 text-sm">
//                         {originalData?.experience?.[idx]?.description?.map((d, i) => (
//                           <li key={i} className="pl-4 border-l-2 border-gray-300">• {d}</li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div>
//                       <p className="text-xs font-bold text-blue-600 uppercase mb-2">Enhanced</p>
//                       <ul className="space-y-1 text-sm">
//                         {exp.description?.map((d, i) => (
//                           <li key={i} className="pl-4 border-l-2 border-blue-500 font-medium">• {d}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}

//           {/* Project Enhancements */}
//           {optimizedData?.projects?.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-purple-600" />
//                 <h3 className="text-xl font-bold">Project Refinements</h3>
//               </div>

//               {optimizedData.projects.map((proj, idx) => {
//                 const hasChange = originalData?.projects?.[idx]?.description !== proj.description;
//                 if (!hasChange) return null;

//                 return (
//                   <Card key={idx} className="border-l-4 border-l-purple-500">
//                     <div className="flex items-center justify-between mb-4">
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selections.projectItems[idx]}
//                           onChange={() => updateSelection('projectItems', idx)}
//                           className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
//                         />
//                         <h4 className="font-semibold">{proj.name}</h4>
//                       </label>
//                       <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
//                         REFINED
//                       </span>
//                     </div>
//                     <ComparisonBox
//                       original={originalData?.projects?.[idx]?.description}
//                       enhanced={proj.description}
//                     />
//                   </Card>
//                 );
//               })}
//             </div>
//           )}

//           {/* Skill Suggestions */}
//           {optimizedData?.suggestedSkills?.length > 0 && (
//             <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
//               <div className="flex items-center justify-between mb-4">
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selections.addSkills}
//                     onChange={() => updateSelection('addSkills')}
//                     className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold">Recommended Skills</h3>
//                     <p className="text-sm text-gray-600">Boost your ATS compatibility</p>
//                   </div>
//                 </label>
//                 <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
//                   TRENDING
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {optimizedData.suggestedSkills.map((skill, idx) => (
//                   <span 
//                     key={idx}
//                     className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-yellow-400 dark:border-yellow-600 rounded-full text-sm font-semibold shadow-sm"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </Card>
//           )}
//         </div>

//         {/* Footer Actions */}
//         <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-between">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Choose which enhancements to apply
//           </p>
//           <div className="flex gap-3">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button 
//               variant="primary"
//               onClick={mergeSelectedChanges}
//               icon={Check}
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//             >
//               Apply Changes
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OptimizationModal;

import React, { useState } from 'react';
import { X, Check, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';

const OptimizationModal = ({ 
  isOpen, 
  onClose, 
  originalData, 
  optimizedData, 
  onApply 
}) => {
  const [selectedChanges, setSelectedChanges] = useState({
    summary: true,
    experience: {},
    projects: {},
    skills: true
  });

  if (!isOpen) return null;

  const handleApplyChanges = () => {
    const updatedData = { ...originalData };

    // Apply summary
    if (selectedChanges.summary && optimizedData.personalInfo?.summary) {
      updatedData.personalInfo.summary = optimizedData.personalInfo.summary;
    }

    // Apply experience
    if (optimizedData.experience) {
      updatedData.experience = optimizedData.experience.map((exp, index) => {
        if (selectedChanges.experience[index]) {
          return exp;
        }
        return originalData.experience[index];
      });
    }

    // Apply projects
    if (optimizedData.projects) {
      updatedData.projects = optimizedData.projects.map((proj, index) => {
        if (selectedChanges.projects[index]) {
          return proj;
        }
        return originalData.projects[index];
      });
    }

    // Apply suggested skills
    if (selectedChanges.skills && optimizedData.suggestedSkills) {
      updatedData.skills = {
        ...originalData.skills,
        technical: [
          ...(originalData.skills?.technical || []),
          ...optimizedData.suggestedSkills.filter(
            skill => !originalData.skills?.technical?.includes(skill)
          )
        ]
      };
    }

    onApply(updatedData);
    onClose();
  };

  const toggleChange = (section, index = null) => {
    setSelectedChanges(prev => {
      if (index !== null) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [index]: !prev[section][index]
          }
        };
      }
      return {
        ...prev,
        [section]: !prev[section]
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <h2 className="text-2xl font-bold">AI Optimization Results</h2>
              <p className="text-primary-100 text-sm">Review and apply suggested improvements</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary Section */}
          {optimizedData?.personalInfo?.summary && (
            <Card className="border-2 border-primary-200 dark:border-primary-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedChanges.summary}
                    onChange={() => toggleChange('summary')}
                    className="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Professional Summary
                  </h3>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  IMPROVED
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <AlertCircle className="w-4 h-4" />
                    Original
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm leading-relaxed">
                    {originalData?.personalInfo?.summary || 'No summary'}
                  </div>
                </div>

                {/* Optimized */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                    AI Optimized
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg text-sm leading-relaxed">
                    {optimizedData.personalInfo.summary}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Experience Section */}
          {optimizedData?.experience && optimizedData.experience.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                Work Experience Improvements
              </h3>

              {optimizedData.experience.map((exp, index) => (
                <Card key={index} className="border-2 border-primary-200 dark:border-primary-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedChanges.experience[index]}
                        onChange={() => toggleChange('experience', index)}
                        className="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                      />
                      <div>
                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {exp.position}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      ENHANCED
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Original */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Before
                      </div>
                      <ul className="space-y-2">
                        {originalData?.experience?.[index]?.description?.map((desc, i) => (
                          <li key={i} className="text-sm text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-gray-300">
                            • {desc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optimized */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">
                        After (AI Enhanced)
                      </div>
                      <ul className="space-y-2">
                        {exp.description?.map((desc, i) => (
                          <li key={i} className="text-sm text-green-700 dark:text-green-300 pl-4 border-l-2 border-green-500 font-medium">
                            • {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {optimizedData?.projects && optimizedData.projects.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                Project Descriptions Enhanced
              </h3>

              {optimizedData.projects.map((proj, index) => (
                originalData?.projects?.[index]?.description !== proj.description && (
                  <Card key={index} className="border-2 border-primary-200 dark:border-primary-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedChanges.projects[index]}
                          onChange={() => toggleChange('projects', index)}
                          className="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                        />
                        <h4 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {proj.name}
                        </h4>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        REFINED
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                          Original Description
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-900 rounded">
                          {originalData?.projects?.[index]?.description || 'No description'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">
                          AI Enhanced Description
                        </div>
                        <p className="text-sm text-purple-700 dark:text-purple-300 p-3 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded font-medium">
                          {proj.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          )}

          {/* Suggested Skills */}
          {optimizedData?.suggestedSkills && optimizedData.suggestedSkills.length > 0 && (
            <Card className="border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedChanges.skills}
                    onChange={() => toggleChange('skills')}
                    className="w-5 h-5 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                      Suggested Skills to Add
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      These trending skills will boost your ATS score
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                  RECOMMENDED
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {optimizedData.suggestedSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-primary-300 dark:border-primary-700 rounded-full text-sm font-semibold text-primary-700 dark:text-primary-300 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-6 rounded-b-xl border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Select the improvements you want to apply
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={handleApplyChanges}
              icon={Check}
            >
              Apply Selected Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationModal;
