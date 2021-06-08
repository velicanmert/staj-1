export const checkTotalValidityEnTr = (entityForm, projects) => {
  console.log('VALIDATION INSIDE VIEW');
  const keys = Object.keys(projects);
  if (!projects || keys.length === 0) {
    return 'Must have at least 1 Project';
  }

  for (let key of keys) {
    const project = projects[key];

    if (!project.enValue || project.enValue.lenght === 0) {
      return `Project ${project.projectId} must have an English value!`;
    }
    if (!project.trValue || project.trValue.lenght === 0) {
      return `Project ${project.projectId} must have a Turkish value!`;
    }
  }

  for (let inputIdentifierKey in entityForm) {
    if (!entityForm[inputIdentifierKey].valid) {
      return `Error on ${entityForm[inputIdentifierKey].label}!`;
    }
  }

  return null;
};
